/**
 * Rewritten for context Update
 */
const NUMBERS = "0123456789"
const ALLOWED = {
    2: '01',
    8: '01234567',
    10: '0123456789',
    16: '0123456789abcdef',
    36: '0123456789abcdefghijklmnopqrstuvwxyz'
}
const NOT_ALLOWED = "(){}[];:*?!$@#^&+-=/~,\"<> \n\t\r";

// function lexNumber(context){     //* DONE
//     const number = {
//         xType: 'number',
//         raw: null,
//         structure: [],
//         value: null,
//         isFloat: false,
//         isDimension: false,
//         isPercentage: false,
//         signState: null,
//         unit: null,
//         base: 10,
//         index: context.i,
//         position: context.getPosition(this.index),
//         scientificNotation: null
//     }
//     let i = number.index
//     let text = context.getCode();
//     let value = '';
//     let unitSignEnabled = false;

//     const processValue = () => {
//         if(value){
//             number.structure.push(
//                 {
//                     type: 'number',
//                     value: value
//                 }
//             )
//             number.value ??= '';
//             number.value += value;
//             value = ''
//         }
//     }
//     //! Sign
//     if(text[i] == '-'){
//         number.structure.push(
//             {
//                 type: 'numberSign',
//                 value: '-'
//             }
//         )
//         number.value = '-';
//         i++
//     }else if(text[i] == '+'){
//         number.structure.push(
//             {
//                 type: 'numberSign',
//                 value: '+'
//             }
//         )
//         value = ''
//         i++
//     }
//     if(text[i] == '.'){
//         number.isFloat = true;
//         number.structure.push(
//             {
//                 type: 'numberDot',
//                 value: '.'
//             }
//         )
//         value = '0.'
//         i++
//     }
//     // if(!(ALLOWED[number.base]+'.').includes(text[i])) return null; //Pusta liczba lub operatory dodawania
//     //Check base for = 0b, 0B, 0o, 0O
//     if(text[i] == 0 && text.length>=3 && 'bodxf'.includes(text[i+1].toLowerCase())){
//         //Nie możemy mieś zmiennoprzecinkowców
//         if(number.isFloat && text[i+1].toLowerCase() != 'd') context.reportError(i,'SyntaxError','Liczba o bazie innej niż 10 nie może być zmiennoprzecinkowa')
//         if(text[i+1].toLowerCase() == 'b'){
//             number.base = 2;
//         }else if(text[i+1].toLowerCase() == 'o'){
//             number.base = 8;
//         }else if(text[i+1].toLowerCase() == 'd'){
//             number.base = 10;
//         }else if(text[i+1].toLowerCase() == 'x'){
//             number.base = 16;
//         }else{
//             number.base = 36;
//         }
//         number.structure.push(
//             {
//                 type: 'numberBasePrefix',
//                 value: `0${text[i+1]}`
//             }
//         )
//         i+=2;
//     }
//     for(;i< text.length; i++){
//         if(NOT_ALLOWED.includes(text[i])) break;
//         if(text[i] == "'" || text[i] == '_'){
//             processValue()
//             number.structure.push(
//                 {
//                     type: 'numberSeparator',
//                     value: text[i]
//                 }
//             )
//             continue;
//         }
//         if(ALLOWED[number.base].includes(text[i])){
//             //Poprawna liczba, sprawdź czy może tutaj być
            
//             if( number.unit != null ) context.reportError(i,'SyntaxError','Nie można umieszczać cyfr po jednostce');
//             if( number.isPercentage ) context.reportError(i,'SyntaxError','Nie można umieszczać cyfr po znaku procenta');
//             if( unitSignEnabled && NUMBERS.includes(text[i])) context.reportError(i,'SyntaxError','Nie można umieszczać cyfr po znaku rozpoczęcia jednostki ( ` )');
            
//             if(!unitSignEnabled){
//                 value += text[i]
//             }
//         }else if(text[i] == '.'){
//             // Jeżeli są to dwie kropki po sobie, to znaczy, że rozważamy to jako zasięg a nie jako liczbę
//             if( number.unit != null || unitSignEnabled ) context.reportError(i,'SyntaxError','Nie można używać kropek wewnątrz jednostki');
//             if(number.isFloat){
//                 context.reportError(i,'SyntaxError','Nie można użyć dwóch kropek w jednej liczbie');
//             }else{
//                 if(text[i+1] == "."){
//                     // Tak, więc nie jest to już liczba
//                     break;
//                 }
//                 if(number.base != 10) context.reportError(i,'SyntaxError','Liczba o bazie innej niż 10 nie może być zmiennoprzecinkowa')
//                 processValue();
//                 number.structure.push(
//                     {
//                         type: 'numberDot',
//                         value: '.'
//                     }
//                 )
//                 number.value += '.'
//                 number.isFloat = true
//             } 
//         }else if(text[i] == "`"){ //unit separator
//             if( number.unit != null ) context.reportError(i,'SyntaxError','Ta liczba zawiera już jednostkę');
//             if( number.isPercentage ) context.reportError(i,'SyntaxError','Ta liczba jest już procentem');
//             if( unitSignEnabled ) context.reportError(i,'SyntaxError','Nie można umieszczać wielu znaków rozpoczęcia jednostki "`"');
//             processValue();
//             number.structure.push(
//                 {
//                     type: 'numberUnitsign',
//                     value: '`'
//                 }
//             )
//             unitSignEnabled = true;
//         }else if(text[i] == "%"){
//             if(number.isPercentage) context.reportError(i,'SyntaxError','Nie można używać dwóch znaków % w jednej liczbie')
//             if(number.unit != null ) context.reportError(i,'SyntaxError','Nie można używać jednocześnie % i jednostki')
//             if( unitSignEnabled ) context.reportWarning(i - 1,'SyntaxWarning','Nie powinno się umieszczać znaku rozpoczęcia jednostki ( ` ) przed procentem. Procent nie jest jednostką');
//             processValue();
//             number.structure.push(
//                 {
//                     type: 'numberPercentage',
//                     value: '%'
//                 }
//             )
//             number.isPercentage = true;
//         }else if(
//             text[i].toLowerCase() == 'e' && 
//             !number.unit && 
//             !unitSignEnabled && 
//             !number.isPercentage && 
//                 (
//                     NUMBERS.includes(text[i+1]) || 
//                     text[i+1] == '-' || 
//                     text[i+1] == '+'
//                 )
//             ){

//             processValue();
//             number.structure.push(
//                 {
//                     type: 'numberScientificNotation',
//                     value: text[i]
//                 }
//             )
//             number.scientificNotation = '';
//             sign = null;
//             i++;
//             if(text[i] == '-'){
//                 number.structure.push(
//                     {
//                         type: 'numberScientificNotationSign',
//                         value: '-'
//                     }
//                 )
//                 sign = '-'
//                 i++;
//             }else{
//                 if(text[i] == '+'){
//                     number.structure.push(
//                         {
//                             type: 'numberScientificNotationSign',
//                             value: '+'
//                         }
//                     )
//                     i++;
//                 }
//                 sign = ''
//             }
//             for(; i<text.length; i++){
//                 if(NUMBERS.includes(text[i])){
//                     number.scientificNotation+=text[i];
//                 }else{
//                     if('-+'.includes(text[i])){
//                         context.reportError(i,'SyntaxError',`Niespodziewany znak ( ${text[i]} )`);
//                     }else{
//                         i--;
//                         break;
//                     }
//                 } 
//             }
//             number.structure.push(
//                 {
//                     type: 'numberScientificNotationNumber',
//                     value: number.scientificNotation
//                 }
//             )

//             if (sign) number.scientificNotation = sign+number.scientificNotation;
//         }else{
//             if(number.isPercentage) context.reportError(i,'SyntaxError','Nie można podać jednocześnie procentu i jednostki')
//             number.unit ??= ''
//             number.unit += text[i];
//         }
//     }
//     processValue();
//     if(number.unit){
//         number.structure.push(
//             {
//                 type: 'numberUnit',
//                 value: number.unit
//             }
//         )
//         //! Case insensitive
//         number.unit = number.unit.toLowerCase();
//     }
//     //? copyRaw;
//     number.raw = text.substring(number.index, i);
//     //? Post analisys
//     number.isPositive = number.value[0] !== '-';
//     number.isZero = number.value == 0;
//     number.isNegative = number.value[0] == '-';
    
//     //-1 if negative 0 if zero 1 if positive
//     number.signState = number.isPositive ? 1 : ( number.isZero ? 0 : ( number.isNegative ? -1 : null ))
//     if(number.signState == null ) context.reportError(number.index,'FatalError','Nie można określić znaku dla wyrażenia')
//     number.isDimension = number.unit !== null;
//     context.i = i;
//     return {
//         xType: 'Const',
//         value: number
//     }
// }

//Zwraca tablicę struktury bo to na razie lexowanie
function lexNumber(context){     //* DONE
    const NOT_ALLOWED = "(){}[];:*?!$@#^&+-=/~,.%\"<> \n\t\r";
    /**
     *! Analizuje jedynie czy coś jest [basePrefix, number, numberScientificNotation, numberSeparator, unitsign]
     ** Maksymalnie analizowana struktura może wyglądać np:
     *? 0xeeffee`
     *? 0b01_01_00_01
     *? 123e
     ** Łącznie liczb zmienno przecinkowej następuje w trakcie analizy lini. Wynika to z tego, że ta faza nie może zwracać błędów
     */
    let structure = [];
    let i = context.i
    let text = context.getCode();
    let value = '';
    let base = 10
    if(NOT_ALLOWED.includes(text[i]))return null
    const processValue = () => {
        if(value){
            structure.push(
                {
                    type: 'number',
                    value: value
                }
            )
        }else return null
    }
    
    //? Check base for = 0b, 0B, 0o, 0O
    if(text[i] == 0 && text.length>=3 && 'bodxf'.includes(text[i+1].toLowerCase())){
        if(text[i+1].toLowerCase() == 'b'){
            base = 2;
        }else if(text[i+1].toLowerCase() == 'o'){
            base = 8;
        }else if(text[i+1].toLowerCase() == 'd'){
            base = 10;
        }else if(text[i+1].toLowerCase() == 'x'){
            base = 16;
        }else{
            base = 36;
        }
        structure.push(
            {
                type: 'numberBasePrefix',
                value: `0${text[i+1]}`
            }
        )
        i+=2;
    }
    for(;i< text.length; i++){
        if(NOT_ALLOWED.includes(text[i])) break;
        if(text[i] == "'" || text[i] == '_'){
            processValue()
            structure.push(
                {
                    type: 'numberSeparator',
                    value: text[i]
                }
            )
            continue;
        }
        if(ALLOWED[base].includes(text[i])){
            value += text[i]
        }else if(text[i] == "`"){ //unit separator
            processValue();
            structure.push(
                {
                    type: 'numberUnitsign',
                    value: '`'
                }
            )
            return structure;
        }else if(text[i].toLowerCase() == 'e'){
            processValue();
            structure.push(
                {
                    type: 'numberScientificNotation',
                    value: text[i]
                }
            )
            return structure;
        }else{
            break
        }
    }
    processValue();
    return structure
}
module.exports = lexNumber;