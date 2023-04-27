function lexSpace(context){
    const ALLOWED = " \t";
    let i = context.i
    let text = context.getCode();
    let value = ''
    for(;i < text.length; i++){
        if(!ALLOWED.includes(text[i])){
            break;
        }
        value += `${text[i]}`;
    }
    if( value.length > 0){
        return [{
            type: 'space',
            value: value,
            specialView: value.replaceAll(' ','·').replaceAll('\t','⇥')
        }]
    }
    return null
}
module.exports = lexSpace;