"use client"

//import OzViewer from "@/components/OzViewer"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import { Permission } from "@/app/(types)/Permission"
import { FindPermission, uniqueValue } from "@/app/(utilities)/ArrayUtilities"
import { timeStampToDayjs } from "@/app/(utilities)/TimeStampToDayjs"
import { ContextTemplate } from "@/components/context/context"
import { Form, message } from "antd"
import axios from "axios"
import dayjs from "dayjs"
import tz from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import delay from "delay"
import { useSession } from "next-auth/react"
import { useCookies } from "next-client-cookies"
import { useEnvContext } from "next-runtime-env"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { BUTTON_TYPE } from "../../_types/ButtonType"
import { TreeDataType } from "../../_types/TreeDataType"
import { OptionProps } from "../[id]/page"
import TemplateForm from "../new/TemplateForm"
import TransferTemplate from "../new/TransferTemplate"
import CustomButtonGroup from "./CustomButtonGroup"

dayjs.extend(utc)
dayjs.extend(tz)

const OzViewer = dynamic(() => import("@/components/OzViewer"), {
    loading: () => <>Loading eform...</>,
    ssr: false
})

const TemplateWrapper = ({
    id,
    data,
    listLeft,
    treeData
}: {
    id?: string
    data: EformTemplate[]
    listLeft: OptionProps[]
    treeData: TreeDataType[]
}) => {
    const { data: session } = useSession()
    const permission = session!.user.userInfo.permission as Permission[]
    const router = useRouter()
    const [form] = Form.useForm()
    const cookies = useCookies()
    const { NEXT_PUBLIC_EFORM_VERIFY_TEMPLATE } = useEnvContext()

    const [messageApi, contextHolder] = message.useMessage()
    const {
        setFormData,
        setChoosenBlock,
        setListLeft,
        listRight,
        setListRight,
        setSubmitType,
        isInsert,
        setIsInsert,
        setIsDisabled
    } = useContext(ContextTemplate)
    const [viewerKey, setViewerKey] = useState<number>(0)

    useEffect(() => {
        setIsDisabled(false)
        if (data.length > 0) {
            setIsInsert(false)
            setChoosenBlock({
                choosenBlock: data[0].block ? data[0].block : [],
                changeBlock: 0
            })

            const _listRight: OptionProps[] = []
            if (data[0].block) {
                data[0].block.forEach((element) => {
                    _listRight.push({
                        id: element.ozrRepository + "/" + element.name!,
                        name: element.name!,
                        checkBox: false,
                        type: element.ozrRepository!
                    })
                })
                setListRight(_listRight)
            }
            //console.log("List result", UniqueValue(listLeft, _listRight))
            if (listLeft.length > 0) {
                setListLeft(uniqueValue(listLeft, _listRight))
            }

            form.setFieldsValue({
                formName: data[0].name,
                formCode: data[0].code,
                description: data[0].description,
                validFrom: timeStampToDayjs(
                    new Date(data[0].validFrom as string).getTime()
                ),
                validTo: timeStampToDayjs(
                    new Date(data[0].validTo as string).getTime()
                )
            })
        } else {
            setListLeft(listLeft)
            setIsInsert(true)
            setChoosenBlock({
                choosenBlock: [],
                changeBlock: 0
            })
            form.setFieldsValue({
                formName: "",
                formCode: "",
                description: "",
                validFrom: null,
                validTo: null
            })
        }

        setFormData(data)
        setViewerKey(Math.random())
    }, [])

    const resetEForm = () => {
        setViewerKey(Math.random())
    }

    const HandlerVerify = async (buttonType: string) => {
        setIsDisabled(true)
        try {
            await axios.post(
                NEXT_PUBLIC_EFORM_VERIFY_TEMPLATE!,
                {
                    id: id,
                    button: buttonType
                },
                {
                    headers: {
                        Authorization: "Bearer " + cookies.get("token"),
                        Session: cookies.get("session")
                    }
                }
            )
            messageApi.success("Thao tác thành công")

            setTimeout(() => {
                router.push("/bu/mywork")
                router.refresh()
            }, 1000)
        } catch (error) {
            console.log(error)
            messageApi.error("Thao tác thất bại. Xin hãy thử lại sau")
            setIsDisabled(false)
        }
    }

    const onPreview = async () => {
        setIsDisabled(true)
        if (listRight.length > 0) {
            resetEForm()
            //resetEForm()
            await delay(2000)
            const choosenBlock: {
                name: string
                location: string
                ozrRepository: string
            }[] = []

            listRight.forEach((element) => {
                let count = 0
                choosenBlock.push({
                    name: element.name,
                    location: count.toString(),
                    ozrRepository: element.type
                })
            })

            setChoosenBlock({
                choosenBlock: choosenBlock,
                changeBlock: 0
            })
        } else {
            messageApi.error("Please choose at least 1 block")
        }
        setIsDisabled(false)
    }

    const onSubmit = () => {
        setIsDisabled(true)
        setSubmitType("SUBMIT")
        form.submit()
    }
    const onSave = () => {
        setIsDisabled(true)
        setSubmitType("SAVE")
        form.submit()
    }

    const onNeedCorrecion = async () => {
        HandlerVerify(BUTTON_TYPE.NEED_CORRECTION)
    }

    const onCancel = () => {
        if (!isInsert) {
            setIsDisabled(true)
            setSubmitType("CANCEL")
            form.submit()
        } else {
            router.push("/bu/mywork")
            router.refresh()
        }
    }

    const onVerify = async () => {
        HandlerVerify(BUTTON_TYPE.SUBMIT)
    }

    const onBack = () => {
        router.push("/bu/mywork")
        router.refresh()
    }

    const onReject = async () => {
        HandlerVerify(BUTTON_TYPE.REJECT)
    }

    return (
        <div>
            {contextHolder}
            <TemplateForm
                disabled={
                    !FindPermission(permission, "children", "VisibleFormInput")
                }
                id={id}
                form={form}
            />
            {FindPermission(permission, "children", "VisibleFormInput") ? (
                <TransferTemplate treeData={treeData} />
            ) : (
                <></>
            )}
            <CustomButtonGroup
                //status={data[0].status!.code}
                permission={permission}
                onPreview={onPreview}
                onSubmit={onSubmit}
                onSave={onSave}
                onCancel={onCancel}
                onVerify={onVerify}
                onBack={onBack}
                onReject={onReject}
                onNeedCorrection={onNeedCorrecion}
            />
            <OzViewer viewerKey={viewerKey} />
        </div>
    )
}

export default TemplateWrapper
