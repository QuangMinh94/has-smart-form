import dayjs from "dayjs"

export interface DateString {
    dateString: Date | string
    isDateNull?: boolean
}

const FormatSmallNum = (value: string) => {
    if (value.length < 2) {
        const valueNum: number = +value
        if (valueNum < 10 && valueNum > 0) {
            value = "0" + value
        }

        if (value === "0") {
            value = "00"
        }
    }
    return value
}

const FormatDateNum = (value: string) => {
    const valueNum: number = +value
    if (valueNum < 10) {
        value = "0" + value
    }

    if (value === "0") {
        value = "00"
    }

    return value
}

const DateFormatter = (dateString: string): string => {
    const noTimeZoneDate = new Date(new Date(dateString).getTime())
    let da = noTimeZoneDate.toLocaleString("en-GB", { day: "numeric" })
    let mo = noTimeZoneDate.toLocaleString("en-GB", { month: "numeric" })
    let ye = noTimeZoneDate.toLocaleString("en-GB", { year: "2-digit" })
    let ho = noTimeZoneDate.toLocaleString("en-GB", { hour: "2-digit" })
    let mi = noTimeZoneDate.toLocaleString("en-GB", { minute: "2-digit" })
    let se = noTimeZoneDate.toLocaleString("en-GB", { second: "2-digit" })
    da = FormatDateNum(da)
    mo = FormatDateNum(mo)
    ye = FormatDateNum(ye)
    ho = FormatSmallNum(ho)
    mi = FormatSmallNum(mi)
    se = FormatSmallNum(se)
    let output = ""
    if (ho === "23" && mi === "59" && se === "59") {
        output = da + "/" + mo + "/" + ye
    } else {
        output = da + "/" + mo + "/" + ye + " , " + ho + ":" + mi
    }
    return output
}

export const dateTimeFormat = ({ dateString }: DateString): any => {
    let noTimeZoneDate = new Date(new Date(dateString).getTime())
    let da = noTimeZoneDate.toLocaleString("en-GB", { day: "numeric" })
    let mo = noTimeZoneDate.toLocaleString("en-GB", { month: "numeric" })
    let ye = noTimeZoneDate.toLocaleString("en-GB", { year: "2-digit" })
    da = FormatDateNum(da)
    mo = FormatDateNum(mo)
    ye = FormatDateNum(ye)
    const output = da + "/" + mo + "/" + ye

    return output
}
export const dateTimeFullYearFormat = (dateString: string) => {
    //* dateString with "yyyy-mm-ddThh:mm:ss.sssZ"
    if (
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(
            dateString as string
        )
    ) {
        const inputDate = new Date(dateString)
        const day = inputDate.getUTCDate()
        const month = inputDate.getUTCMonth() + 1 //* Month is a 0-based number so it needs +1
        const year = inputDate.getUTCFullYear()
        return `${month.toString().padStart(2, "0")}/${day
            .toString()
            .padStart(2, "0")}/${year}`
    }
    //* dateString with format "dd/mm/yyyy"
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString as string)) {
        return dateString
    }
    return
}
export const getDateTimeCurrent = () => {
    const currentDate = new Date()
    const day = String(currentDate.getDate()).padStart(2, "0")
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const year = String(currentDate.getFullYear()).slice(-2)
    const hours = String(currentDate.getHours()).padStart(2, "0")
    const minutes = String(currentDate.getMinutes()).padStart(2, "0")
    const second = String(currentDate.getSeconds()).padStart(2, "0")
    const dateTimeCurrent = `${day}${month}${year}_${hours}${minutes}${second}`
    return dateTimeCurrent
}

export const StartDateFormat = (dateTime: dayjs.Dayjs) => {
    return dateTime.set("hour", 0).set("minute", 0).set("second", 0).toDate()
}

export const EndDateFormat = (dateTime: dayjs.Dayjs) => {
    return dateTime.set("hour", 23).set("minute", 59).set("second", 59).toDate()
}

export const dateFormatList = ["DD/MM/YYYY"] //optional: 'MM/DD/YYYY', 'DD/MM/YY', 'DD-MM-YY',

export default DateFormatter
