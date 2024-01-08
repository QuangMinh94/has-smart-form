// dùng để loại bỏ các chi nhánh cha con
export const ObjIdChidrenParentPlat = (rowData: any) => {
    const obj: any = { [`${rowData._id}`]: rowData.name }

    const start = (rowData: any[]) => {
        rowData.forEach((item) => {
            obj[`${item?._id}`] = item.name
            if (item?.children && item?.children?.length > 0) {
                start(item.children)
            }
        })
    }
    start(rowData?.children ?? [])
    return obj
}
