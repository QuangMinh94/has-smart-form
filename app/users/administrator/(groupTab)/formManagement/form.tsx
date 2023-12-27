import { TreeDataType } from "@/app/(types)/TreeDataType"
import { CheckExtension } from "@/app/(utilities)/CheckFileExtension"
import DateFormatter from "@/app/(utilities)/DateFormatter"
import { InboxOutlined } from "@ant-design/icons"
import {
    Button,
    Flex,
    Form,
    Input,
    Spin,
    TreeSelect,
    Upload,
    UploadProps
} from "antd"
import useMessage from "antd/es/message/useMessage"
import axios from "axios"
import { useCookies } from "next-client-cookies"
import { useEnvContext } from "next-runtime-env"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { ContextFormManagement } from "./context"

const { TextArea } = Input
const { Dragger } = Upload

export const CreationForm = ({
    treeSelectData
}: {
    treeSelectData: TreeDataType[]
}) => {
    const cookie = useCookies()
    const router = useRouter()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = useMessage()
    const { setOpen } = useContext(ContextFormManagement)
    const { NEXT_PUBLIC_ADD_FOLDERS } = useEnvContext()
    const onFinish = async (e: any) => {
        try {
            await axios.post(
                NEXT_PUBLIC_ADD_FOLDERS!,
                {
                    name: e.name,
                    active: true,
                    parent: e.location
                },
                {
                    headers: {
                        Authorization: "Bearer " + cookie.get("token"),
                        Session: cookie.get("session")
                    }
                }
            )
            messageApi.success("Tạo thư mục thành công")
            setOpen(false)
            router.refresh()
        } catch (error: any) {
            messageApi.error("Lỗi tạo thư mục.Xin thử lại sau")
        }
    }
    type FieldType = {
        location?: string
        name?: string
    }

    const onSelect = (selectedKeys: any, info: any) => {
        console.log("selected", selectedKeys, info)
    }
    return (
        <>
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={(e) => console.log("Failed", e)}
            >
                <Form.Item<FieldType>
                    label="Vị trí"
                    name="location"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!"
                        }
                    ]}
                >
                    <TreeSelect
                        showSearch
                        treeNodeFilterProp="title"
                        allowClear
                        treeDefaultExpandAll
                        treeData={treeSelectData}
                        onSelect={onSelect}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Flex className="mt-4" justify="flex-end" gap={10}>
                    <Button
                        type="primary"
                        danger
                        onClick={() => setOpen(false)}
                    >
                        Hủy
                    </Button>
                    <Button type="primary" onClick={() => form.submit()}>
                        Xác nhận
                    </Button>
                </Flex>
            </Form>
        </>
    )
}

export const UploadFileForm = ({
    treeSelectData
}: {
    treeSelectData: TreeDataType[]
}) => {
    type FieldType = {
        location?: string
        name?: string
        description: string
        uploadedFile: any
    }
    const cookie = useCookies()
    const router = useRouter()
    const [form] = Form.useForm()
    const { setOpen } = useContext(ContextFormManagement)
    const [draggerKey, setDraggerKey] = useState<number>(0)
    const { NEXT_PUBLIC_ADD_FILES } = useEnvContext()
    const [messageApi, contextHolder] = useMessage()
    const [loading, setLoading] = useState(false)

    const onFinish = async (e: any) => {
        setLoading(true)
        console.log("EGREH", e)
        let bodyFormData = new FormData()
        bodyFormData.append("fileName", form.getFieldValue("name"))
        bodyFormData.append("folderId", e.location)
        bodyFormData.append("file", e.uploadedFile[0].originFileObj)

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Session: cookie.get("session"),
                Authorization: "Bearer " + cookie.get("token")
            }
        }
        //call axios to upload
        try {
            await axios.post(NEXT_PUBLIC_ADD_FILES!, bodyFormData, config)
            messageApi.success("Tải tệp lên thành công")
            setLoading(false)
            clearData()
            setOpen(false)
            router.refresh()
        } catch (error: any) {
            console.log("Error", error)
            messageApi.error("Tải tệp lên thất bại")
            setLoading(false)
        }
    }

    const clearData = () => {
        form.setFieldsValue({
            location: "",
            name: "",
            description: "",
            uploadedFile: undefined
        })
        setDraggerKey(Math.random())
    }

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    }

    const customRequest = (options: any) => {
        setTimeout(() => {
            options.onSuccess("ok")
        }, 0)
    }

    const props: UploadProps = {
        //name: "file",
        //multiple: true,
        //action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        onChange(info) {
            const { status } = info.file
            if (status !== "uploading") {
                console.log(info.file, info.fileList)
            }
            if (status === "done") {
                messageApi.success(
                    `${info.file.name} file uploaded successfully.`
                )
            } else if (status === "error") {
                messageApi.error(`${info.file.name} file upload failed.`)
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files)
        },
        beforeUpload(e) {
            const fileType = e.name.substring(
                e.name.lastIndexOf(".") + 1,
                e.name.length
            )

            if (!CheckExtension(fileType)) {
                messageApi.error("Chỉ được upload file ozr,ozd hoặc pdf")
                return Upload.LIST_IGNORE
            }

            if (e.size > 5242880) {
                messageApi.error("File size cannot exceed 5MB")
                return Upload.LIST_IGNORE
            }
            //return false
        }
    }

    const onSelect = (selectedKeys: any, info: any) => {
        console.log("selected", selectedKeys, info)
    }

    return (
        <>
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={(e) => console.log("Failed", e)}
            >
                <Form.Item<FieldType>
                    label="Vị trí"
                    name="location"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn thư mục để upload file"
                        }
                    ]}
                >
                    <TreeSelect
                        showSearch
                        allowClear
                        treeNodeFilterProp="title"
                        treeDefaultExpandAll
                        treeData={treeSelectData}
                        onSelect={onSelect}
                        disabled={loading}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên file"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                >
                    <TextArea
                        style={{ minWidth: "20vw", height: "10vw" }}
                        disabled={loading}
                        //value={valueText}
                        //onChange={(e) => setValueText(e.target.value)}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    //label="Mô tả"
                    name="uploadedFile"
                    getValueFromEvent={normFile}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn file cần upload"
                        }
                    ]}
                >
                    <Dragger
                        key={draggerKey}
                        customRequest={customRequest}
                        disabled={loading}
                        {...props}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly
                            prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                </Form.Item>
                {!loading ? (
                    <Flex className="mt-4" justify="flex-end" gap={10}>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                clearData()
                                setOpen(false)
                            }}
                        >
                            Hủy
                        </Button>
                        <Button type="primary" onClick={() => form.submit()}>
                            Xác nhận
                        </Button>
                    </Flex>
                ) : (
                    <Flex className="mt-4" justify="flex-end">
                        <Spin />
                    </Flex>
                )}
            </Form>
        </>
    )
}

export const DetailsForm = ({
    location,
    name,
    creator,
    createdDate,
    ozrId
}: {
    location: string
    name: string
    creator: string
    createdDate: Date | undefined
    ozrId: string
}) => {
    return (
        <Flex vertical gap={10}>
            <b>Vị trí</b>
            <Input disabled={true} defaultValue={location} />
            <b>Tên</b>
            <Input disabled={true} defaultValue={name} />
            <Flex>
                <b>Người tạo : </b>
                <p>{creator}</p>
            </Flex>
            <Flex>
                <b>Ngày tạo : </b>
                <p>
                    {createdDate ? DateFormatter(createdDate.toString()) : ""}
                </p>
            </Flex>
            <Flex>
                <b>OZR ID : </b>
                <p>{ozrId}</p>
            </Flex>
        </Flex>
    )
}
