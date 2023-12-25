import { TreeDataType } from "@/app/(types)/TreeDataType"
import { CheckExtension } from "@/app/(utilities)/CheckFileExtension"
import { InboxOutlined } from "@ant-design/icons"
import {
    Button,
    Flex,
    Form,
    Input,
    TreeSelect,
    Upload,
    UploadProps
} from "antd"
import useMessage from "antd/es/message/useMessage"
import axios from "axios"
import { useCookies } from "next-client-cookies"
import { useEnvContext } from "next-runtime-env"
import { useRouter } from "next/navigation"
import { useContext } from "react"
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
    const { setOpen } = useContext(ContextFormManagement)
    const { NEXT_PUBLIC_ADD_FILES } = useEnvContext()
    const cookie = useCookies()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = useMessage()
    const onFinish = async (e: any) => {
        console.log("EGREH", e)
        let bodyFormData = new FormData()
        bodyFormData.append("fileName", e.uploadedFile.file.name)
        bodyFormData.append("folderId", e.location)
        bodyFormData.append("file", e.uploadedFile.file)

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
        } catch (error: any) {
            console.log("Error", error)
        }
    }

    const clearData = () => {
        form.setFieldsValue({
            location: "",
            name: "",
            description: "",
            uploadedFile: {}
        })
    }

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
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
                messageApi.error("File type not allowed")
                return Upload.LIST_IGNORE
            }

            if (e.size > 5242880) {
                messageApi.error("File size cannot exceed 5MB")
                return Upload.LIST_IGNORE
            }
            return false
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
                    <Dragger {...props}>
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
            </Form>
        </>
    )
}
