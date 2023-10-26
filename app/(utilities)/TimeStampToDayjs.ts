import dayjs from "dayjs"

export const timeStampToDayjsForRangePicker = (input: [any, any]) => {
    if (input) {
        if (input[0] !== null && input[1] !== null) {
            return [dayjs(input[0]) as any, dayjs(input[1]) as any]
        } else {
            return [null, null]
        }
    } else {
        return [null, null]
    }
}

export const timeStampToDayjs = (input: any) => {
    if (input) {
        return dayjs(input) as any
    } else {
        return null
    }
}
