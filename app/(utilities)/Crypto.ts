import Cryptr from "cryptr"
const cryptr = new Cryptr("L4iR*Ijg3PW#YkMl", {
    encoding: "base64",
    pbkdf2Iterations: 10000,
    saltLength: 10
})

export const EncryptedString = (input: string) => {
    return cryptr.encrypt(input)
}
export const DecryptedString = (encryptedString: string) => {
    return cryptr.decrypt(encryptedString)
}
