import React, { useState, memo, useEffect } from "react"

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
    image?: {
        data: string
        type: string
    }
}
const App: React.FC<Props> = ({ onChange, image }) => {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState("")

    const [fileList, setFileList] = useState<any[]>(
        image
            ? [
                  {
                      thumbUrl: `data:${image.type};base64,${image.data}`,
                      status: "done",
                      type: "image/jpeg"
                  }
              ]
            : []
    )

    const handleCancel = () => {
        setPreviewOpen(false)
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview && file.originFileObj) {
            file.preview = await getBase64(file.originFileObj as RcFile)
        }

        const url = file.preview ? file?.preview : file?.thumbUrl
        setPreviewImage(`${url}`)
        setPreviewOpen(true)
    }

    const handleChange: UploadProps["onChange"] = async (info) => {
        let thumbUrl = ""

        info.file.status = "done"
        const file = info?.fileList[0]
        if (file?.originFileObj) {
            thumbUrl = await getBase64(file?.originFileObj as RcFile)
        }

        // setTimeout(() => {
        if (file?.thumbUrl) {
            thumbUrl = file?.thumbUrl?.substring(
                file?.thumbUrl.indexOf(",") + 1
            )
        } else {
            thumbUrl = thumbUrl.substring(thumbUrl.indexOf(",") + 1)
        }

        onChange({ thumbUrl, type: file?.type ?? "" })
        // }, 500)

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
                title={"Hình ảnh"}
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
