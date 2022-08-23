const {DECRYPTION_ARG, ENCRYPTION_ARG, ParseArgs} = require("./args")
const {DecryptorOfCrypty, EncryptorOfCrypty} = require("./cryptography")

let rawArgs = process.argv
let argValues = ParseArgs(rawArgs)

let action = argValues.action
let img = argValues.img
let out = argValues.out


if (action === ENCRYPTION_ARG){
  let encryptor = new EncryptorOfCrypty(img, out)
  encryptor.EncryptImg()
} else if(action === DECRYPTION_ARG){
  let decryptor = new DecryptorOfCrypty(img, out)
  decryptor.DecryptImg()
}
