const ENCRYPTION_ARG = "encrypt"
const DECRYPTION_ARG = "decrypt"
const IMG_ARG = "img"
const OUTPUT_FILE_ARG = "out"

const _VALUE_POINTER = "="

function makeArgsRecognition(args){
  const successfulValue = 3
  let counter = 0 // should equals to 3: action, img and outPutFile

  for (const arg of args){
    if (arg.startsWith(ENCRYPTION_ARG)){
      counter++
    }else if (arg.startsWith(DECRYPTION_ARG)){
      counter++
    } else if (arg.startsWith(IMG_ARG)){
      counter++
    } else if (arg.startsWith(OUTPUT_FILE_ARG)){
      counter++
    } else{
      throw `Unexpected argument ${arg}`
    }
  }

  if (counter !== successfulValue){
    throw "Invalid argument format: Action(encrypt/decrypt), Img and Output file are required"
  }

}

function validate(args){
  let argsWithExcludedAction = args.filter((value)=>{
    return !(value.startsWith(ENCRYPTION_ARG) || value.startsWith(DECRYPTION_ARG));

  })

  for(const arg of argsWithExcludedAction){
    let numberOfOccurrencesOfValuePointer = arg.split(_VALUE_POINTER).length - 1

    if (numberOfOccurrencesOfValuePointer !== 1){
      throw "Wrong format for setting attribute values"
    }
  }
}

function setValues(args){
  let values = {}

  for (const arg of args){
    if (arg === ENCRYPTION_ARG || arg === DECRYPTION_ARG){
      values.action = arg
    }else{
      let splittedArg = arg.split(_VALUE_POINTER)
      values[splittedArg[0]] = splittedArg[1]
    }

  }
  return values
}

function ParseArgs(argv){
  let cleanArgs = argv.slice(2)

  validate(cleanArgs)
  makeArgsRecognition(cleanArgs)
  return setValues(cleanArgs)
}

module.exports = {
  ENCRYPTION_ARG,
  DECRYPTION_ARG,
  IMG_ARG,
  OUTPUT_FILE_ARG,
  ParseArgs
}
