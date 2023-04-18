function cutColor(text){
    const notAllowed = "(){}[];:.,?!@#%^*&+=~`'\"<> \n\t\r"
    if(text[0]!='#') return null;  //Var must start with $
    const HEX = "0123456789abcdef"
    let name = '';
    let rest = '';
    let i = 1;
    let value = {};
    while(true){
        if(notAllowed.includes(text[i])) break;
        if(i>= text.length) break;
        if(!HEX.includes(text[i].toLowerCase())) throw new Error('CutColor: Podana litera ('+text[i]+') jest za duża by być hexem');
        name+=text[i];
        i++;
    }
    name = name.toLowerCase();
    if(name.length == 3){
        value = {
            hasAlphaChannel: false,
            hex: `${name[0]}${name[0]}${name[1]}${name[1]}${name[2]}${name[2]}`,
            baseHex: `${name[0]}${name[0]}${name[1]}${name[1]}${name[2]}${name[2]}`,
            alphaHex: `${name[0]}${name[0]}${name[1]}${name[1]}${name[2]}${name[2]}ff`,
            red: parseInt(`${name[0]}${name[0]}`, 16),
            green: parseInt(`${name[1]}${name[1]}`, 16),
            blue: parseInt(`${name[2]}${name[2]}`, 16),
        }
    }else if(name.length == 4){
        value = {
            hasAlphaChannel: true,
            hex: `${name[0]}${name[0]}${name[1]}${name[1]}${name[2]}${name[2]}`,
            baseHex: `${name[0]}${name[0]}${name[1]}${name[1]}${name[2]}${name[2]}`,
            alphaHex: `${name[0]}${name[0]}${name[1]}${name[1]}${name[2]}${name[2]}${name[3]}${name[3]}`,
            red: parseInt(`${name[0]}${name[0]}`, 16),
            green: parseInt(`${name[1]}${name[1]}`, 16),
            blue: parseInt(`${name[2]}${name[2]}`, 16),
            alpha: parseInt(`${name[3]}${name[3]}`, 16), 
        }
    }else if(name.length == 6){
        value = {
            hasAlphaChannel: false,
            hex: `${name}`,
            baseHex: `${name}`,
            alphaHex: `${name}ff`,
            red: parseInt(name.substring(0,2), 16),
            green: parseInt(name.substring(2,4), 16),
            blue: parseInt(name.substring(4,6), 16) 
        }
    }
    else if(name.length == 8){
        value = {
            hasAlphaChannel: true,
            hex: `${name}`,
            baseHex: `${name.substring(0,6)}`,
            alphaHex: `${name}`,
            red: parseInt(name.substring(0,2), 16),
            green: parseInt(name.substring(2,4), 16),
            blue: parseInt(name.substring(4,6), 16),
            alpha: parseInt(name.substring(6,8), 16)
        }
    }else if(name.length == 0){
        return null;
    }else{
        throw new Error("CutColor: Błąd liczba ma złą długość dobre to [3,4,6,8] znaków")
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return {nodes:[{type:'Constant',dataType:'<color>',value, raw: name}],rest}
}
module.exports = cutColor;