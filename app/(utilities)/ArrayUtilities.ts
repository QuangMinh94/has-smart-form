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

export function UniqueValue(a: any[], b: any[]) {
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
