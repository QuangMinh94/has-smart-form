import React, { memo, useState, useCallback } from "react"
import { useContextProfile } from "@/components/cusTomHook/useContext"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormEditUser from "./FormEditUser"
import { typeUpdate } from "./FormEditUser"
import { Modal } from "antd"
type Propsescriptor = {
    label: string
    content: string
    isEdit: boolean
    type?: typeUpdate
}
const CustomDescriptor: React.FC<Propsescriptor> = ({
    label,
    content,
    isEdit,
    type
}) => {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const Cancel = useCallback(() => {
        setShowEdit(false)
    }, [])
    const ShowEdit = () => {
        setShowEdit(true)
    }

    const Form = <FormEditUser cancel={Cancel} typeUpdate={type ?? "email"} />
    return (
        <div className="flex text-slate-950 items-center my-[2vh]">
            <div className="font-medium min-w-[10vw]">{label}:</div>
            {showEdit && isEdit && !(type === "password") ? (
                Form
            ) : (
                <div className="mr-[1vw]">{content}</div>
            )}

            {((isEdit && !showEdit) || type === "password") && (
                <>
                    <div
                        className="cursor-pointer hover:opacity-75"
                        onClick={ShowEdit}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </div>

                    <Modal
                        title={"Đổi mật khẩu"}
                        open={showEdit}
                        onCancel={Cancel}
                        destroyOnClose={true}
                        footer={null}
                        width={600}
                    >
                        {Form}
                    </Modal>
                </>
            )}
        </div>
    )
}
const InfoUser: React.FC = () => {
    const { User } = useContextProfile()
    return (
        <>
            <div>
                <CustomDescriptor
                    label="Họ tên"
                    content={`${User.firstName} ${User.lastName}`}
                    isEdit={true}
                    type="name"
                />
            </div>
            <div>
                <CustomDescriptor
                    label="Tên đăng nhập"
                    content={`${User?.userName}`}
                    isEdit={false}
                />
            </div>
            <div>
                <CustomDescriptor
                    label="Mật khẩu"
                    content="******************"
                    isEdit={true}
                    type="password"
                />
            </div>
            <div>
                <CustomDescriptor
                    label="Email"
                    content={`${User?.mail}`}
                    isEdit={true}
                    type="email"
                />
            </div>
            <div>
                <CustomDescriptor
                    label="Số điện thoại"
                    content={`${User?.phone}`}
                    isEdit={true}
                    type="phone"
                />
            </div>
            <div>
                <CustomDescriptor
                    label="Chức vụ"
                    content={`${User?.defaultGroup?.name}`}
                    isEdit={false}
                />
            </div>
            <div>
                <CustomDescriptor
                    label="Đơn vị"
                    content={`${User?.department?.name}`}
                    isEdit={false}
                />
            </div>
        </>
    )
}
export default memo(InfoUser)
