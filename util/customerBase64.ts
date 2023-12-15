export const CustomGetBase64 = ({
    type,
    data
}: {
    type: string
    data: string
}) => (type && data ? `data:${type};base64,${data}` : "")

export const CustomeBase64 = (url: string) =>
    url.substring(url.indexOf(",") + 1)
