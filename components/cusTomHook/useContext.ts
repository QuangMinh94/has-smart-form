"use client"
import { useContext } from "react"
import {
    contextMyworkDetail,
    typeContextMyworkDetail
} from "../../app/users/teller/(components)/context"

import contentAttachBu, {
    typeContextAttachBu
} from "@/app/users/administrator/(component)/content/connecter/connecterAttachBu"
import contextConnecterManager, {
    typeContextManager
} from "@/app/users/administrator/(component)/content/connecter/connecterManager"
import contentAdmin, {
    typeContextAdmin
} from "@/app/users/administrator/(component)/content/contentAdmin"
import {
    contextTransfer,
    typeContextTransfer
} from "@/app/users/administrator/(component)/content/contentTransfer"
import {
    contextTreeView,
    typeContextTree
} from "@/app/users/administrator/(component)/content/contentTreeView"
import contentUser, {
    typeContextUser
} from "@/app/users/administrator/(component)/content/contentUser"
import { contextBa, typeContextBa } from "@/app/users/ba/(component)/content"
import {
    contextCustomeTheme,
    contextProfile,
    typeContextCustomeTheme,
    typeContextProfile
} from "@/components/context/context"
import { contextTranfer, typeContextTranfer } from "../context/context"
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
        loading: provider.loading,
        setSelectedProduct: provider.setSelectedProduct,
        selectedProduct: provider.selectedProduct
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
function useContextAdminAttachBu(): typeContextAttachBu {
    const provider = useContext(contentAttachBu)
    return {
        setDataGlobal: provider.setDataGlobal,
        dataGlobal: provider.dataGlobal,
        tab: provider.tab,
        setTab: provider.setTab,
        EproductActive: provider.EproductActive,
        setIdEproductActive: provider.setIdEproductActive
    }
}

function useContextAdminconnectManager(): typeContextManager {
    const provider = useContext(contextConnecterManager)
    return {
        setDataForm: provider.setDataForm,
        DataForm: provider.DataForm
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
function useContextThemeConfig(): typeContextCustomeTheme {
    const provider = useContext(contextCustomeTheme)
    return {
        setPrimaryColor: provider.setPrimaryColor,
        primaryColor: provider.primaryColor,
        setLogo: provider.setLogo,
        logo: provider.logo
    }
}
function useContextProfile(): typeContextProfile {
    const provider = useContext(contextProfile)
    return {
        User: provider.User,
        setUser: provider.setUser
    }
}
export {
    useContextAdmin,
    useContextAdminAttachBu,
    useContextAdminUser,
    useContextAdminconnectManager,
    useContextBa,
    useContextMyWorkDetail,
    useContextProfile,
    useContextThemeConfig,
    useContextTranfer,
    useContextTransferANTD,
    useContextTree
}
