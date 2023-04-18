/**
 * Rewritten for context Update
 */
const NUMBERS = "0123456789"
const notAllowed = "(){}[];:*?!$@#^&+-=/~,\"<> \n\t\r"
function scientificNotationToString(num){
    // From https://stackoverflow.com/a/61281355/19331211
    return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
        function(a,b,c,d,e) {
        return e < 0
            ? b + '0.' + Array(1-e-c.length).join(0) + c + d
            : b + c + d + Array(e-d.length+1).join(0);
        });
}

function lexNumber(text){     //* DONE 
    // Add Exponetnials
    /** We support:
     * 100 -> int
     * 100'000 | 100_000-> 100000
     * 100.001 -> 100.001
     * 0b1001 | 0B1001 -> 9
     */
    /**
     * ? 0. is valid but returned as <number> not <int>
     * 
     * ? .1 is valid
     */
    /** Basic number types:
     * <integer> <int> <unsigned integer>
     * <number> ex 213.34234 or 2344234,23434 big numbers can be writen with _ or '
     * <dimension> <dim>
     * <percentage> <%>
     * !<ratio>
     *  */
     
    let hasDot = false;
    let unit = '';
    let hasPercentSign = false;
    let rest = '';
    let i = 0;
    let value = ''
    let base = 10;
    let unitTime = false;
    let scientificNotation = null;
    let raw = ""
    let rawery = [];
    //! Sign
    if(text[0] == '-'){
        value = '-';
        text = text.substring(1);
    }else if(text[0] == '+'){
        value = ''
        text = text.substring(1);
    }
    //! Dot
    if(text[0] == '.'){
        hasDot = true;
        value = '0.'
        text = text.substring(1)
    }
    if(!NUMBERS.includes(text[i])) return null; //Pusta liczba lub operatory dodawania
    //Check base for = 0b, 0B, 0o, 0O
    if(text[i] == 0 && !notAllowed.includes(text[i]) && text.length>=3){
        if(text[i+1].toLowerCase() == 'b'){
            base = 2;
        }else if(text[i+1].toLowerCase() == 'o'){
            base = 8;
        }else if(text[i+1].toLowerCase() == 'x'){
            base = 16;
        }else if(text[i+1].toLowerCase() == 'f'){
            base = 36;
        }
        if(base != 10 ){
            if(hasDot) throw new Error('Liczby zapisane za pomocą podstawy muszą być typu <integer>')
            text = text.substring(2);
        }
    }
    while(true){
        if(notAllowed.includes(text[i]) || i>= text.length) break;
        if(NUMBERS.includes(text[i])){
            if(unit || hasPercentSign || unitTime) throw new Error('Miszmasz liczby: Nie można pisać cyfr po znaku procenta (%), jednostce lub znaku początku jednostki (`)')
            if(scientificNotation !== null) scientificNotation+=text[i];
            else value+=text[i];
            
        }else if(text[i] == '.'){
            if(hasDot) 
                throw new Error('Number cannot have double dot');
            hasDot = true;
            value+='.'
        }else if(text[i] == "'" || text[i] == '_'){
            //Do nothing xD
        }else if(text[i] == "`"){ //unit separator
            if(unit ||hasPercentSign || unitTime) throw new Error('Miszmasz liczby: znak ` (początek jednostki) może znajdować się w liczbie tylko jeden raz')
            unitTime = true;
        }else if(text[i] == "%"){
            if(hasPercentSign) throw new Error('Już posiadamy znak %, nie można używać dwóch znaków % w jednej liczbie')
            if(unit) throw new Error('Nie można używać jednocześnie % i jednostki')
            hasPercentSign = true;
        // }else if(text[i] == '*'){ //1.2**34
        //     if(!text[i+1] == '*') throw new Error('Błąd czytania notacji naukowej: pojedyńczy znak `*`');
        //     text+1;
        //     scientificNotation = '';
        //     if(text[i+1] == '-' || text[i+1] =="+"){
        //         i++;
        //         if(text[i] == '-') scientificNotation = '-';
        //     }
        }else if(text[i].toLowerCase() == 'e'){ // 1.0e34
            //Jeżeli nie jesteśmy już w trakcie czy tania jednostek
            if(unit === ''){
                if(!NUMBERS.includes(text[i+1]) && text[i+1] != '-' && text[i+1] != '+') throw new Error('Błąd czytania notacji naukowej: za literą `e` nie znajduje się liczba ani znaki + - '+`${value} ${unit}`);
                scientificNotation = '';
                if(text[i+1] == '-' || text[i+1] =="+"){
                    i++;
                    if(text[i] == '-') scientificNotation = '-';
                }
            }
        }else{
            if(base > 10){
                //meybe different base value
                if(unitTime) unit += text[i].toLowerCase()
                else value+= text[i].toLowerCase()
            }else{
                unit += text[i].toLowerCase() //units are case insensitive
            }
            
        }
        i++;
    }
    // Jeżeli ostatni był przecinek
    for(;i<text.length;i++){
        rest+=text[i];
    }
    // Change number to decimal
    if(base != 10){
        if(hasDot) throw new Error('Liczby zapisane za pomocą podstawy muszą być typu <integer>')
        value = lexInt(value,base).toString(10);
    }
    if(scientificNotation!== null) value = scientificNotationToString(value+'e'+scientificNotation);
    // Dedukcja typu
    if(unit){
        if(hasDot){
            return {nodes:[{type:'Constant',dataType:'<dimension>',value,unit}],rest} 
        }
        return {nodes:[{type:'Constant',dataType:'<integer_dimension>',value,unit}],rest} 
    }else if(hasPercentSign){
        return {nodes:[{type:'Constant',dataType:'<percentage>',value,unit:'%'}],rest} 
    }else if(hasDot){
        if(value[value.length-1] == '.') value = value.substring(0,value.length-1);
        return {nodes:[{type:'Constant',dataType:'<number>',value}],rest} 
    }
    return {nodes:[{type:'Constant',dataType:'<integer>',value}],rest}
}
module.exports = lexNumber;