function lexString(context){
    const JOIN_NAME = "stringJoin"
    let previousStruct = context.getPreviousStruct()
    let startChar = null
    if (previousStruct && previousStruct.join == JOIN_NAME){
        // TZW wymuszenie stringa - 
        startChar = previousStruct.options.startChar;
    }
    // if(context.getPreviousStruct())
    // const code = contex.getCode()
    // let i = context.i

    // const char = context.getCode()[context.i] 
    // if(ALLOWED.includes(char)){
    //     return [{
    //         type: 'symbol',
    //         value: char
    //     }]
    // }
    return null
}
module.exports = lexString;