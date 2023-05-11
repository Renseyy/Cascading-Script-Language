function lexSymbol(context){
    const ALLOWED = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    const char = context.getCode()[context.i] 
    if(ALLOWED.includes(char)){
        return [{
            type: 'symbol',
            value: char
        }]
    }
    return null
}
module.exports = lexSymbol;