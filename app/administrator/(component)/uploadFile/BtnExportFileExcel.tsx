import { Button } from "antd"
import saveAs from "file-saver"
import React, { useContext } from "react"
import { utils, write } from "xlsx"
import { useContextAdmin } from "@/components/cusTomHook/useContext"
import { TemlateExcel } from "@/app/(types)/Users"

export const FILE_XLSX = "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
const TemlateExcel: TemlateExcel[] = [
    {
        FirstName: "name",
        LastName: "test1",
        Group: "Chuyên viên Nghiệp vụ Trung tâm dịch vụ Khách hàng",
        Department: "Trung tâm Công nghệ thông tin",
        UserName: "40AnNV1@hpt.vn",
        Email: "AnNV@hpt.vn",
        PhoneNumber: "987123456",
        AuthenProvider: "local"
    },
    {
        FirstName: "name",
        LastName: "test2",
        Group: "Teller Chi nhánh Hai Bà Trưng",
        Department: "Chi nhánh Hai Bà Trưng",
        UserName: "41AnNV1@hpt.vn",
        Email: "AnNV@hpt.vn",
        PhoneNumber: "",
        AuthenProvider: "local"
    },
    {
        FirstName: "name",
        LastName: "test3",
        Group: "Teller Phòng Khách Hàng Cá Nhân 2 - CN HBT",
        Department: "Phòng Khách Hàng Cá Nhân 2 - CN HBT",
        UserName: "42AnhHCT1@bpm.lab",
        Email: "AnhHCT@gmail.com",
        PhoneNumber: "789123542",
        AuthenProvider: "local"
    },
    {
        FirstName: "name",
        LastName: "test4",
        Group: "Chuyên viên Nghiệp vụ Trung tâm dịch vụ Khách hàng",
        Department: "Trung tâm Công nghệ thông tin",
        UserName: "43PVAnh1@bpm.lab",
        Email: "PVAnh@gmail.com",
        PhoneNumber: "789123542",
        AuthenProvider: "local"
    },
    {
        FirstName: "name",
        LastName: "test5",
        Group: "Teller Phòng Khách Hàng Cá Nhân 2 - CN HBT",
        Department: "Phòng Khách Hàng Cá Nhân 2 - CN HBT",
        UserName: "44LongNT1@bpm.lab",
        Email: "LongNT@bpm.lab",
        PhoneNumber: "789123542",
        AuthenProvider: "local"
    }
]

const ExportFile: React.FC = () => {
    const { messageApi } = useContextAdmin()
    const exportfile = () => {
        const worksheet = utils.json_to_sheet(TemlateExcel)
        const wscols = [
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 }
        ]
        worksheet["!cols"] = wscols // set with
        const workbook = utils.book_new()
        utils.book_append_sheet(workbook, worksheet, "Sheet1")

        // Tạo Blob từ workbook
        const excelBuffer = write(workbook, {
            bookType: "xlsx",
            type: "array"
        })
        const dataBlob = new Blob([excelBuffer], {
            type: `application/${FILE_XLSX}`
        })

        // Lưu tệp Excel bằng file-saver
        saveAs(dataBlob, "TemplateAddUser.xlsx")
        messageApi("success", "successfully downloaded the file template")
    }
    return (
        <Button
            className="button-export-view"
            type="text"
            onClick={exportfile}
            size="middle"
        >
            Template File
        </Button>
    )
}
export default ExportFile
