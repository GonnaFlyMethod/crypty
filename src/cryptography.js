const crypto = require('crypto')
const fs = require('fs')

const ALGO = 'aes-256-cbc'
const SECRET_KEY = Buffer.from(process.env.CRYPTY_SECRET_KEY, "hex")
const INIT_VECTOR = Buffer.from(process.env.CRYPTY_INIT_VECTOR, "hex")

class EncryptorOfCrypty{
  constructor(imgPath,
              encryptedFilePath) {
    this.imgPath = imgPath
    this.encryptedFilePath = encryptedFilePath
  }

  _encrypt(dataToEncrypt) {
    const cipher = crypto.createCipheriv(ALGO, SECRET_KEY, INIT_VECTOR);

    let encryptedData = cipher.update(dataToEncrypt, "base64", "binary");
    encryptedData += cipher.final("binary");

    return encryptedData
  }

  EncryptImg(){
    let bitmap = fs.readFileSync(this.imgPath)
    let base64EncodedFile = Buffer.from(bitmap).toString("base64")
    let encryptedData = this._encrypt(base64EncodedFile)
    fs.writeFileSync(this.encryptedFilePath, encryptedData, "binary")
  }

}

class DecryptorOfCrypty{
  constructor(encryptedFilePath, decryptedImagePath) {
    this.encryptedFilePath = encryptedFilePath
    this.decryptedImagePath = decryptedImagePath
  }

  _decrypt(encryptedData) {
    const decipher = crypto.createDecipheriv(ALGO, SECRET_KEY, INIT_VECTOR);
    let decryptedData = decipher.update(encryptedData, "binary", "base64");
    decryptedData += decipher.final("base64");
    return decryptedData
  }

  DecryptImg(){
    let encryptedFile = fs.readFileSync(this.encryptedFilePath, "binary")
    let decryptedData = this._decrypt(encryptedFile)
    let buff =  Buffer.from(decryptedData, "base64")
    fs.writeFileSync(this.decryptedImagePath, buff)
  }

}

module.exports = {
  EncryptorOfCrypty,
  DecryptorOfCrypty
}

