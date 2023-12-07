"use client"
import { useContext } from "react"
import {
    contextMyworkDetail,
    typeContextMyworkDetail
} from "../../app/teller/(components)/context"

import { typeContextTranfer, contextTranfer } from "../context/context"
import { typeContextBa, contextBa } from "@/app/ba/(component)/content"
import contentAdmin, {
    typeContextAdmin
} from "@/app/administrator/(component)/content/contentAdmin"
import contentUser, {
    typeContextUser
} from "@/app/administrator/(component)/content/contentUser"
import {
    typeContextTree,
    contextTreeView
} from "@/app/administrator/(component)/content/contentTreeView"
import {
    typeContextTransfer,
    contextTransfer
} from "@/app/administrator/(component)/content/contentTransfer"
function useContextMyWorkDetail(): typeContextMyworkDetail {
    const provider = useContext(contextMyworkDetail)
    return {
        setListLeft: provider.setListLeft,
        setListRight: provider.setListRight,
        listLeft: provider.listLeft,
        listRight: provider.listRight,
        setChangeListFilter: provider.setChangeListFilter,
        ChangeListFilter: provider.ChangeListFilter,
        setDataGlobal: provider.setDataGlobal,
        dataGlobal: provider.dataGlobal,
        setChoosenBlock: provider.setChoosenBlock,
        choosenBlock: provider.choosenBlock,
        setLoading: provider.setLoading,
        loading: provider.loading
    }
}
function useContextTranfer(): typeContextTranfer {
    const provider = useContext(contextTranfer)
    return {
        setListLeft: provider.setListLeft,
        setListRight: provider.setListRight,
        listLeft: provider.listLeft,
        listRight: provider.listRight,
        setChangeListFilter: provider.setChangeListFilter,
        ChangeListFilter: provider.ChangeListFilter,
        setLoading: provider.setLoading,
        loading: provider.loading
    }
}
function useContextBa(): typeContextBa {
    const provider = useContext(contextBa)
    return {
        setDataGlobal: provider.setDataGlobal,
        dataGlobal: provider.dataGlobal,
        messageApi: provider.messageApi,
        setTreeFilter: provider.setTreeFilter,
        treeFilter: provider.treeFilter
    }
}
function useContextAdmin(): typeContextAdmin {
    const provider = useContext(contentAdmin)
    return {
        messageApi: provider.messageApi
    }
}
function useContextAdminUser(): typeContextUser {
    const provider = useContext(contentUser)
    return {
        setDataGlobal: provider.setDataGlobal,
        dataGlobal: provider.dataGlobal
    }
}
function useContextTree(): typeContextTree {
    const provider = useContext(contextTreeView)
    return {
        setDataGlobal: provider.setDataGlobal,
        dataGlobal: provider.dataGlobal,
        treeFilter: provider.treeFilter,
        setTreeFilter: provider.setTreeFilter
    }
}
function useContextTransferANTD(): typeContextTransfer {
    const provider = useContext(contextTransfer)
    return {
        setData: provider.setData,
        setTargetKeys: provider.setTargetKeys,
        Data: provider.Data,
        targetKeys: provider.targetKeys
    }
}
export {
    useContextMyWorkDetail,
    useContextTranfer,
    useContextBa,
    useContextAdmin,
    useContextAdminUser,
    useContextTree,
    useContextTransferANTD
}
