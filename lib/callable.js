function lexCallable(context){
    // const SPECIAL_CHARACTERS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    // const ALLOWED = "_-"
    const NOT_ALLOWED = "!\"#$%&'()*+,./:;<=>?@[\\]^`{|}~ "
    const NUMBERS = '01234567890'
    const code = context.getCode();
    let i = context.i;
    let structure = [];
    if(code[i] != '@') return null;
    structure.push({
        type: 'callableSymbol',
        value: '@'
    })
    let text = '';
    i++;
    for(;i < code.length; i++){
        const char = code[i];
        if(NOT_ALLOWED.includes(char)) break;
        text += char
    }
    if(text){
        structure.push({
            type: 'callable',
            value: text
        })
    }
    return structure;
}
module.exports = lexCallable;