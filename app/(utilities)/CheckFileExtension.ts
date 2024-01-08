// This function converts the string to lowercase, then perform the conversion
const AllowedExtension = ["pdf", "ozr", "ozd"]

// This function keeps the casing unchanged for str, then perform the conversion
const CheckExtension = (fileExtension: string) => {
    const result = AllowedExtension.filter(
        (element) => element === fileExtension
    )
    if (result.length === 0) {
        return false
    } else {
        return true
    }
}

export { CheckExtension }
