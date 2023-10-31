import _ from "lodash"
import { Permission } from "../(types)/Permission"

export function getUnique(array: any[], key: any) {
    if (typeof key !== "function") {
        const property = key
        key = function (item: any) {
            return item[property]
        }
    }
    return Array.from(
        array
            .reduce(function (map, item) {
                const k = key(item)
                if (!map.has(k)) map.set(k, item)
                return map
            }, new Map())
            .values()
    )
}

export function uniqueValue(a: any[], b: any[]) {
    const isSameUser = (a: any, b: any) => a.id === b.id
    // Get items that only occur in the left array,
    // using the compareFunction to determine equality.
    const onlyInLeft = (left: any, right: any, compareFunction: any) =>
        left.filter(
            (leftValue: any) =>
                !right.some((rightValue: any) =>
                    compareFunction(leftValue, rightValue)
                )
        )

    const onlyInA = onlyInLeft(a, b, isSameUser)
    const onlyInB = onlyInLeft(b, a, isSameUser)

    const result = [...onlyInA, ...onlyInB]

    return result
}

export const FlattenItems = (items: any[], key: string): any[] => {
    return items.reduce((flattenedItems: any[], item: any) => {
        flattenedItems.push(item)

        if (Array.isArray(item[key])) {
            flattenedItems = flattenedItems.concat(FlattenItems(item[key], key))
        }

        return flattenedItems
    }, [])
}

export const FindPermission = (
    items: any[],
    key: string,
    searchKey: string
): boolean => {
    try {
        const data = FlattenItems(items, key)

        console.log("Data", data)
        console.log("Key", searchKey)

        const findValue = _.find(data, ["name", searchKey]) as Permission

        console.log("FindValue", findValue)
        return findValue.value!
    } catch {
        return false
    }
}
