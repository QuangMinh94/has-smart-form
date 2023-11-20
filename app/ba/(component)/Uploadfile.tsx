import React, { useState, memo } from "react"

import { Modal, Upload, Button } from "antd"
import type { RcFile, UploadProps } from "antd/es/upload"
import type { UploadFile, UploadChangeParam } from "antd/es/upload/interface"
import { UploadOutlined } from "@ant-design/icons"

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })

type Props = {
    onChange: (data: { thumbUrl: string; type: string }) => void
}
const App: React.FC<Props> = ({ onChange }) => {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [previewTitle, setPreviewTitle] = useState("")
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const handleCancel = () => {
        setPreviewOpen(false)
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile)
        }

        setPreviewImage(file.url || (file.preview as string))
        setPreviewOpen(true)
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
        )
    }

    const handleChange: UploadProps["onChange"] = async (info) => {
        let thumbUrl = ""
        info.file.status = "done"
        const file = info?.fileList[0]
        if (file?.originFileObj) {
            thumbUrl = await getBase64(file?.originFileObj as RcFile)
        }
        thumbUrl = thumbUrl.substring(thumbUrl.indexOf(",") + 1)

        onChange({ thumbUrl, type: file?.type ?? "" })

        setFileList(info.fileList)
    }

    return (
        <>
            <Upload
                customRequest={() => {}}
                listType="picture"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
            >
                <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <picture>
                    <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                    />
                </picture>
            </Modal>
        </>
    )
}

export default memo(App)
