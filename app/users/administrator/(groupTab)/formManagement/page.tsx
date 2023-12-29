import { FolderContent, FolderTree } from "@/app/(types)/Folder"
import { TreeDataType } from "@/app/(types)/TreeDataType"
import DateFormatter from "@/app/(utilities)/DateFormatter"
import { SearchParamProvider } from "@/app/users/bu/_context/provider"
import type { DataNode } from "antd/es/tree"
import axios from "axios"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { RedirectType, redirect } from "next/navigation"
import ManagementPage, { FormTableType } from "./managementPage"
import { FormManagementProvider } from "./provider"

const FileManagementPage = async ({
    searchParams
}: {
    searchParams: { folderId: string; name: string }
}) => {
    const { folderId, name } = searchParams
    let request: { id: string | undefined; name: string | undefined } = {
        id: undefined,
        name: undefined
    }

    console.log("SAJDASJKLJSDJADL", folderId, name)
    const session = await getServerSession()
    if (!session) {
        redirect("/auth/signin", RedirectType.replace)
    }

    const treeData = await fetchFolderTree()
    //map treeData to Antd Tree Items format
    const treeDataView: DataNode[] = MappingChildren(treeData)

    /* if (folderId && name) {
        request.id = folderId
        request.name = name
    } else {
        if (!folderId && name) {
            request.id = undefined
            request.name = name
        }
        if (!name && folderId) {
            request.id = folderId
            request.name = undefined
        }
    } */

    //fetch folder content
    const tableData = await fetchFolderContent(folderId)
    //map tableData
    const _tableData: FormTableType[] = []
    if (tableData) {
        if (Object.keys(tableData).length !== 0) {
            tableData.folder.forEach((childEle) => {
                _tableData.push({
                    key: childEle._id,
                    name: childEle.name,
                    size: "-",
                    creator: childEle.creator
                        ? childEle.creator.lastName +
                          " " +
                          childEle.creator.firstName
                        : "",
                    createdDate: DateFormatter(childEle.createdDate.toString()),
                    type: "FOLDER"
                })
            })
            tableData.file.forEach((childEle) => {
                _tableData.push({
                    key: childEle._id,
                    name: childEle.name,
                    size: "-",
                    physicalFileName: childEle.physicalFileName,
                    physicalFilePath: childEle.physicalFilePath,
                    type: "FILE",
                    creator: childEle.creator
                        ? childEle.creator.lastName +
                          " " +
                          childEle.creator.firstName
                        : "",
                    createdDate: DateFormatter(childEle.createdDate.toString())
                })
            })
        }
    }

    //map treeSelect data to use in antd TreeSelect
    const _treeSelectData: TreeDataType[] = []
    treeData.forEach((element) => {
        _treeSelectData.push({
            value: element._id,
            title: element.name,
            children:
                element.children.length !== 0
                    ? MappingChildrenTreeSelect(element.children)
                    : []
        })
    })

    return (
        <SearchParamProvider>
            <FormManagementProvider>
                <ManagementPage
                    treeSelectData={_treeSelectData}
                    treeData={treeDataView}
                    contentData={_tableData}
                />
            </FormManagementProvider>
        </SearchParamProvider>
    )
}

const fetchFolderContent = async (
    folderId: string
): Promise<FolderContent | undefined> => {
    try {
        if (folderId) {
            const cookie = cookies()
            const res = await axios.post(
                process.env.FOLDER_CONTENT!,
                { id: folderId },
                {
                    headers: {
                        Authorization: "Bearer " + cookie.get("token")?.value,
                        Session: cookie.get("session")?.value
                    }
                }
            )
            return res.data
        }
        return undefined
    } catch (error) {
        //console.log("error", error)
        return undefined
    }
}

const fetchFolderTree = async (): Promise<FolderTree[]> => {
    try {
        const cookie = cookies()
        const res = await axios.post(
            process.env.FOLDER_TREE_VIEW!,
            { active: true },
            {
                headers: {
                    Authorization: "Bearer " + cookie.get("token")?.value,
                    Session: cookie.get("session")?.value
                }
            }
        )
        return res.data
    } catch (error) {
        console.log("error", error)
        return []
    }
}

const MappingChildren = (folders: FolderTree[]) => {
    if (folders.length === 0) return []

    const childrenView: DataNode[] = []
    folders.forEach((element) => {
        childrenView.push({
            key: element._id,
            title: element.name,
            children:
                element.children.length !== 0
                    ? MappingChildren(element.children)
                    : []
        })
    })
    return childrenView
}

const MappingChildrenTreeSelect = (product: FolderTree[]) => {
    if (product.length === 0) return []

    const childrenView: TreeDataType[] = []
    product.forEach((element) => {
        childrenView.push({
            value: element._id,
            title: element.name,
            children:
                element.children.length !== 0
                    ? MappingChildrenTreeSelect(element.children)
                    : []
        })
    })
    return childrenView
}

export default FileManagementPage
