
const ADD_EOR = true;   //D: true
const ADD_VAL = false;  //D: false
const ADD_WIT = true;   //D: true
const NUMBERS = "0123456789"


function scientificNotationToString(num){
    // From https://stackoverflow.com/a/61281355/19331211
    return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
        function(a,b,c,d,e) {
        return e < 0
            ? b + '0.' + Array(1-e-c.length).join(0) + c + d
            : b + c + d + Array(e-d.length+1).join(0);
        });
}
function cutFragment(text){
    if(text[0]!='{') return null;
    let c = 1;
    let i = 1;
    let value = ''
    let rest = ''
    let subtree = null;
    while(true){
        if(i>= text.length) throw new Error('Bład ze znakami {}, czy zamknięto?')
        if(text[i] == '{') c++;
        if(text[i] == '}'){
            c--;
            if(c == 0){
                //lex subtree
                subtree = lexFragment(value);
                i++;
                break;
            }else if(c<0) throw new Error('Błąd ze znakami {}');
        }
        value += text[i];
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    if(ADD_VAL) return {nodes:[{type:'Fragment',subtree,value}],rest}
    return {nodes:[{type:'Fragment',subtree}],rest}
    
}
function cutSpace(text){
    // TAB SPACE 
    let WHITE_CHARS='\t ';
    if(!WHITE_CHARS.includes(text[0])) return null;
    let i = 1;
    let rest = ''
    while(WHITE_CHARS.includes(text[i])){
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    if(ADD_WIT) return {nodes:[{type:'Space'}],rest}
    return {nodes:[],rest}
    
}
function cutIgnored(text){
    // TAB SPACE 
    let INGORED_CHARS='\r ';
    if(!INGORED_CHARS.includes(text[0])) return null;
    let i = 1;
    let rest = ''
    while(INGORED_CHARS.includes(text[i])){
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return {nodes:[],rest}
    
}
function cutParenthesFragment(text){
    if(text[0]!='(') return null;
    let c = 1;
    let i = 1;
    let value = ''
    let rest = ''
    let subtree = null;
    while(true){
        if(i>= text.length) throw new Error('ParenthesFragment: Bład ze znakami (), czy zamknięto?')
        if(text[i] == '(') c++;
        if(text[i] == ')'){
            c--;
            if(c == 0){
                //lex subtree
                subtree = lexFragment(value);
                i++;
                break;
            }else if(c<0) throw new Error('ParenthesFragment: Błąd ze znakami ()');
        }
        value += text[i];
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    if(ADD_VAL) return {nodes:[{type:'ParenthesFragment',subtree,value}],rest}
    return {nodes:[{type:'ParenthesFragment',subtree}],rest}
    
}
function cutBracketFragment(text){
    if(text[0]!='[') return null;
    let c = 1;
    let i = 1;
    let value = ''
    let rest = ''
    let subtree = null;
    while(true){
        if(i>= text.length) throw new Error('cutBracketFragment: Bład ze znakami (), czy zamknięto?')
        if(text[i] == '[') c++;
        if(text[i] == ']'){
            c--;
            if(c == 0){
                //lex subtree
                subtree = lexFragment(value);
                i++;
                break;
            }else if(c<0) throw new Error('BracketFragment: Błąd ze znakami ()');
        }
        value += text[i];
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    if(ADD_VAL) return {nodes:[{type:'BracketFragment',subtree,value}],rest}
    return {nodes:[{type:'BracketFragment',subtree}],rest}
    
}
function cutFunctionName(text){
    const notAllowed = "(){}[];:.,?!$@#%^*&+=~`'\"<> \n\t\r"
    if(text[0]!='@') return null;  //Function must start with @
    let name = '';
    let rest = '';
    let i = 1;
    while(true){
        if(notAllowed.includes(text[i])) break;
        if(i>= text.length) break;
        name+=text[i];
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return {nodes:[{type:'functionName',name}],rest}
}
function cutStringSimple(text){    //* DONE
    if(text[0]!="'") return null;  // assigment is always '
    let rest = '';
    let i = 1;
    let value = ''
    while(true){
        if(text[i] == "'"){i++;break;}
        if(i>= text.length) throw new Error('Nieoczekiwanie zakończono `ProstyText`');
        if(text[i] == '\\'){
            i++;
        }
        value+=text[i];
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return {nodes:[{type:'Constant',dataType:'<string>',value}],rest}
}
function lexNumber(text){     //* DONE 
    const notAllowed = "(){}[];:?!$@#^&+-=/~,\"<> \n\t\r"
    const LETTERS = "abcdefghijklmnopqrstuvwxyz"
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
        }else if(text[i] == '*'){ //1.2**34
            if(!text[i+1] == '*') throw new Error('Błąd czytania notacji naukowej: pojedyńczy znak `*`');
            text+1;
            scientificNotation = '';
            if(text[i+1] == '-' || text[i+1] =="+"){
                i++;
                if(text[i] == '-') scientificNotation = '-';
            }
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
function cutStringAdvance(text,separator){    //* DONE 
    if(text[0]!=separator) return null;  // assigment is always " or `
    let rest = '';
    let i = 1;
    let value = ''
    let nodes = []
    while(true){
        if(text[i] == separator){
            i++;
            if(nodes.length>0 == "Fragment"){
                nodes.push({type:'Concatenation'})
            }
            nodes.push({type:'Constant',dataType:'<string>',value});
            break;
        }
        if(i>= text.length) throw new Error('Nieoczekiwanie zakończono `Zaawansowany tekst`');
        if(text[i] == '{'){
            let t = text.substring(i);
            //Cut fragment
            let v = cutFragment(t);
            nodes.push({type:'Constant',dataType:'<string>',value});
            nodes.push({type:'Concatenation'})
            nodes.push(...v.nodes);
            text = v.rest;
            value = ''
            i = 0;
        }else{
            if(text[i] == '\\'){
                i++;
            }
            value+=text[i];
            i++;
        }
        
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    //[{type:'simpleTextValue',value}]
    return {nodes,rest}
}
function cutVariable(text){ //* DONE
    const notAllowed = "(){}[];:.,?!@#%^*&+=~`'\"<> \n\t\r"
    if(text[0]!='$') return null;  //Var must start with $
    let name = '';
    let rest = '';
    let i = 1;
    while(true){
        if(notAllowed.includes(text[i])) break;
        if(i>= text.length) break;
        name+=text[i];
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return {nodes:[{type:'variable',name}],rest}
}
function cutAssignment(text){ //?TMP
    if(text[0]!=':') return null;  // assigment is always :
    let rest = text.substring(1) || "";
    return {nodes:[{type:'assignment'}],rest}
}
function cutEndOfCommandRow(text){ //?TMP
    if(text[0]!='\n') return null;
    let rest = text.substring(1) || "";
    return ADD_EOR?{nodes:[{type:'EOR',special:'EOLX'}],rest} :{nodes:[],rest};
}
function cutSeparator(text){ //?TMP
    if(text[0]!=';') return null;
    let rest = text.substring(1) || "";
    return ADD_EOR?{nodes:[{type:'Separator',special:'EOLX'}],rest} :{nodes:[],rest};
}
function lexClassName(text){
    if(text[0] !== '.') return null
    if(NUMBERS.includes(text[1])) return null;
    const notAllowed = "(){}[];:,$?!@#%^*&+=~`'\"<> \n\t\r"
    let name = '';
    let rest = '';
    let i = 1;
    let nodes = [];
    while(true){
        if(notAllowed.includes(text[i])) break;
        if(text[i] == '.'){ //Natafiliśmy na nową klasę
            if(name == '.') throw new Error(`Nie można używać dwóch kropek w nazwie klasy ${text}`)
            nodes.push({
                type:'ClassName',
                value:name
            })
            nodes.push({
                type:'With'
            })
            i++
            if(NUMBERS.includes(text[i])  || notAllowed.includes(text[i]) ) throw new Error(`Nazwa klasy nie może zaczynać się od liczby lub znaku specjalnego ${text}`)
            name = ''
        }
        if(i>= text.length) break;
        name+=text[i];
        i++;
    }
    nodes.push({
        type:'ClassName',
        value:name
    })
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return {nodes:nodes,rest}
}
function lexCalcSymbol(text){
    /** lexCalcSymbol - parsowanie Symboli matematycznych
     * Funkcja pobiera tekst i sprawdza czy operacja jest operacją jedną z poniższej listy:
     * * Operacje PRZYPISANIA [DONE]
     * & Wszystkie przypisania są rozwiązywane na etapie parsowania a nie lekserowania
     * ! Podane nazwy funkcji mogą się zmienić
     * ? [ : ]  Przypisanie             Assignment  <all>       <all>           (a:b)
     * ? [ :+ ] Dopisanie                           <container> <all>           (a:+b) => (@push(a,b) | a.push(b))
     * ? [ :- ] Odpisanie                           <container> <all>           (a:-b) => (@remove(a,b) | a.remove(b))
     * ? [ :*- ] Odpisanie Wszystkich               <container> <all>           (a:*-b) => (@removeAll(a,b) | a.removeAll(b))
     * ? [ :* ] Zmultiplikowanie                    <container> <all>           (a:*b) 
     * ? [ :+ ] Dodanie                             <number>
     * ? [ :- ] Odjęcie                             <number>
     * ? [ :* ] Mnożenie                            <number>
     * ? [ :/ ] Dzielenie                           <number>
     * ? [ :% ] Reszta z dzielenia                  <number>                    ( a %: b) => (a: a % b)
     * ? [ :. ] Dopisanie tekstu                                                (a:.b) => (a: a.b)
     * ? [ :# ] Dopisanie kontenera                                             (a:#b) => (a: a#b)
     * 
     * * OPERACJE ARYTMETYCZNE [DONE]
     * & Operacje oznaczone {P} są rozwiązywane na etapie parsowania a nie lekserowania
     * ? [ + ]  Dodawanie                       Addition        (a + b) JS,PHP
     * ? [ - ]  Odejmowanie                     Subtraction     (a - b) JS,PHP
     * ? [ / | ÷ ]  Dzielenie                   Division        (a / b) JS,PHP
     * ? [ * | x | x | · | ⋅ ]  Mnożenie         Multiplication  (a * b) JS,PHP             
     * ? [ % ]  Reszta z dzielenia całkowitego  Modulus         (a % b) JS,PHP
     * ? [ ++ ] Zwiększenie o jeden (Pre)       Increment       (++a )  PHP     {P}
     * ? [ -- ] Zmniejszenie o jeden (Pre)      Decrement       (--a )  PHP     {P}
     * ? [ ++ ] Zwiększenie o jeden             Increment       (a++ )  JS,PHP  {P}
     * ? [ -- ] Zmniejszenie o jeden            Decrement       (a-- )  JS,PHP  {P}
     * ? [ ** ] Podniesienie do potęgi          Exponentiation  (a**2 ) JS
     * ? [ // ] Pierwiastek                     RootExtraction  (a//2 ) ------
     * 
     * * Operacje na tekstach [DONE]
     * ? [ + ] [ . ] Dopisanie tekstu               Addition | Concatenation       (a+b | a.b)   ["Abc"+"Def" | "Abc"."Def"]
     *
     * & Użycie [ + ] jest niejednoznaczne, więc może zwracać nieoczekiwane wartości przy konwertowaniu typów
     * 
     * * Operacje na kontenerach  [DONE]
     * ? [ + ] [ # ] Dopisanie treści kontenera     Addition | Join     (a+b | a#b) [[1,2,3]+[4,5,6] | [1,2,3]#[4,5,6]]
     * 
     * & Użycie [ + ]  jest niejednoznaczne, więc może zwracać nieoczekiwane wartości przy konwertowaniu typów
     * 
     * * Operatory logiczne
     * & Zamiast operatora [ == ] można używać [ = ], gdyż nigdy w programie nie jest on używany jako przypisanie
     * & Należy pamiętać, że w operatorach tak jak we wszystkich stałych językowych nie liczy się wielkość liter
     * & Operatory  [ AND | OR | XOR | EOR | ~ | NOT] Są używane także przy operacjach bitowych. 
     * &   Ich interpretacja domyślna jest bitowa, jednak zmienia się na logiczną, jeżeli operatory nie są typu <integer>, bądź jeżeli oznaczymy operatory jako logiczne
     * ? [ && | AND | ∧ ]                    Logiczne i                             LogicAnd | And      (a && b | a AND b | a ∧ b )
     * ? [ || | OR | ∨ | v ]                 Logiczne lub                           LogicOr | Or        (a || b | a OR b | a ∨ b)    
     * ? [ ⊻ | XOR | EOR | <> | != ]           Logiczne XOR | Logiczna nierówność     Inequality | Xor    (a ⊻ b | a XOR b | a <> b | a != b)
     * ? [ ! | ¬ | NOT]                  Logiczne zaprzeczenie                  LogicNot | Not       
     * ? [ = | == | ⇔ ]                     Logiczna równość                       Equality
     * ? [ === | ≡ ]                         Logiczna równość i identyczność typów  Identity
     * ? [ !== ]                       Nie identyczność                       NonIdentity
     * ? [ -> | ⇒ | → | TO ]                 Logiczna implikacja                    Implication
     * ? [ > ]                               Większy niż                            Greater
     * ? [ < ]                               Mniejszy niż                           Less
     * ? [ >= | => | ≥ | ⩾ ]                         Większy, bądz równy                    GreaterOrEqual
     * ? [ <= | =< | ≤ | ⩽ ]                         Mniejszy, bądz równy                   LessOrEqual
     * 
     * * Operatory Bitowe
     * & Należy pamiętać, że w operatorach tak jak we wszystkich stałych językowych nie liczy się wielkość liter
     * & Operatory  [ AND | OR | XOR | EOR | ~ | NOT] Są używane także przy operacjach logicznych. Jendak zachowanie Bitowe jest domyślne
     * ? [ & | AND ]        Bitowe i  (a & b | a AND b )                            ByteAnd | And         
     * ? [ | | OR ]         Bitowe lub (a | b | a OR b )                            ByteOr | Or
     * ? [ XOR | EOR | ^ ]  Bitowe XOR                                              Xor
     * ? [ ~ | NOT ]        Bitowe Nie                                                  
     * ? [ << ]             Przesunięcie w lewo                                     LeftShift
     * ? [ >> ]             Przesunięcie w prawo                                    RightShift
     * 
     * * Operatory strumieni danych
     * ? [ >>> ]            Przesłanie strumienia do        StreamFrom
     * ? [ <<< ]            Przesłanie strumienia z         StreamTo
    */
    let rest = '';
    let type = null;
    let i = 0;
    if(!text) return null;
    
    let l = text[i];
    // * Operacje PRZYPISANIA
    if(l == ':'){
        type = 'Assignment'
    }else 
    // * Operacje na tekstach
    if(l == '.'){
        type = 'Concatenation'
    }else 
    // * Operacje na kontenerach
    if(l == '#'){
        type = 'Join'
    }else
    // * OPERACJE ARYTMETYCZNE
    if(l == '+'){
        if(text[i+1] == '+'){
            type = 'Increment'
            i++;
        }else{
            type = 'Addition'
        }
    }else if(l == '-'){
        if(text[i+1] == '-'){
            type = 'Decrement'
            i++;
        }else if(text[i+1] == '>'){
            type = 'Implication'
            i++;
        }else{
            type = 'Subtraction'
        }
        
    }else if(l == '*'){
        if(text[i+1] == '*'){
            type = 'Exponentiation'
            i++;
        }else{
            type = 'Multiplication'
        }
    }else if("x·⋅×X✕".includes(l)){
        type = 'MathMultiplication'
    }else if(l == '/'){
        if(text[i+1] == '/'){
            type = 'RootExtraction'
            i++;
        }else{
            type = 'Division'
        }
    }else if(l == '÷'){
        type = 'MathDivision'
    }else if(l == '%'){
        type = 'Modulus'
    }else if(l == '&'){
        if(text[i+1] == '&'){
            type = 'LogicAnd'
            i++;
        }else{
            type = 'ByteAnd'
        }
    }else if(l == '∧'){
        type = 'LogicAnd'
    }else if(l == '|'){
        if(text[i+1] == '|'){
            type = 'LogicOr'
            i++;
        }else{
            type = 'ByteOr'
        }
    }else if(l == '|'){
        if(text[i+1] == '|'){
            type = 'LogicOr'
            i++;
        }else{
            type = 'ByteOr'
        }
    }else if(l == '∨' || l.toLowerCase() == 'v'){
        type = 'LogicOr'
    }else if(l == '~'){
        type = 'ByteNot'
    }else if(l == '!'){
        if(text[i+1] == '='){
            if(text[i+2] == '='){
                type = 'NonIdentity'
                i=i+2;
            }else{
                type = 'Inequality'
                i++;
            }
        }else{
            type = 'LogicNot'
        }
        
    }else if(l == '⊻'){
        type = 'Inequality' 
    }else if(l == '¬'){
        type = 'LogicNot' 
    }else if(l == '='){
        if(text[i+1] == '='){
            if(text[i+2] == '='){
                type = 'Identity'
                i=i+2;
            }else{
                type = 'Equality'
                i++;
            }
        }else if(text[i+1] == '<'){
            type = 'LessOrEqual'
            i++;
        }else if(text[i+1] == '>'){
            type = 'GreaterOrEqual'
            i++;
        }else{
            type = 'Equality'
        }
        
    }else if(l == '⇔'){
        type = 'Equality' 
    }else if(l == '≡'){
        type = 'Identity' 
    }else if(l == '⇒' || l == '→'){
        type = 'Implication'
    }else if(l == '≥' || l == '⩾'){
        type = 'GreaterOrEqual'
    }else if(l == '≤' || l == '⩽'){
        type = 'LessOrEqual'
    }else if(l == '>'){
        if(text[i+1] == '='){
            type = 'GreaterOrEqual'
            i++;
        }else if(text[i+1] == '>'){
            if(text[i+2] == '>'){
                type = 'StreamFrom'
                i=i+2;
            }else{
                type = 'RightShift'
                i++;
            }
        }else{
            type = 'Greater'
        }
        
    }else if(l == '<'){
        if(text[i+1] == '='){
            type = 'LessOrEqual'
            i++;
        }else if(text[i+1] == '<'){
            if(text[i+2] == '<'){
                type = 'StreamTo'
                i=i+2;
            }else{
                type = 'RightShift'
                i++;
            }
        }else if(text[i+1] == '>'){
            type = 'Inequality'
            i++;
        }else{
            type = 'Less'
        }
        
    }else if(l == ','){
        type = "Comma"
        
    }
    //Logiczne i Binarne
    i++;
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return type?{nodes:[{type}],rest}:null;
}
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
    }else{
        throw new Error("CutColor: Błąd liczba ma złą długość dobre to [3,4,6,8] znaków")
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return {nodes:[{type:'Constant',dataType:'<color>',value}],rest}
}
function lexLogicSelector(text){

}
function cutStaticNode(text){
    const notAllowed = "(){}[];:.,?!@#%^*&+=~`'\"<> \n\t\r"
    let name = text[0];
    let rest = '';
    let i = 1;
    while(true){
        if(notAllowed.includes(text[i])) break;
        if(i>= text.length) break;
        name+=text[i];
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return {nodes:[{type:'StaticNode',name}],rest}
}
function lexComment(text){
    const notAllowed = "\n"
    if(text.substring(0,3) != '///') return null;
    let name = text[0];
    let rest = '';
    let i = 1;
    while(true){
        if(notAllowed.includes(text[i])) break;
        if(i>= text.length) break;
        name+=text[i];
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return {nodes:[{type:'comment',name}],rest}
}
function lexQuerySelector(text){
    const notAllowed = "(){}[];:.,?!@#%^*&+=~`'\"<> \n\t\r"
    if(text[0]!='$') return null;  //Var must start with $
    let name = text[0];
    let rest = '';
    let i = 1;
    while(true){
        if(notAllowed.includes(text[i])) break;
        if(i>= text.length) break;
        name+=text[i];
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return {nodes:[{type:'variable',name}],rest}
}
function lexDataType(text){
    const notAllowed = "(){}[];:.,?!@#%^*&+=~`'\"<> \n\t\r"
    if(text[0]!='<') return null;  //Var must start with $
    let name = text[0];
    let rest = '';
    let i = 1;
    while(true){
        if(notAllowed.includes(text[i])) break;
        if(i>= text.length) break;
        name+=text[i];
        i++;
    }
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return {nodes:[{type:'variable',name}],rest}
}
function lexFragment(text){
    /** Parsowanie elementów spornych:
     * elementy sporne, takie jak np +,- czy słowa są parsowane w kolejności
     * dla +,- :
     *  - liczba 
     *  - operacja na tablicy
     *  - działania matematyczne
     * 
     *  ? Kożystamy w tym miejscu z własności, że jezeli nie jest coś zgodne, to funkcja zwraca null
     */
    
    let nodeTree = [];
    let work = true;
    const lexTable = {
        '$':t=>{return cutVariable(t)},         //? Variables
        '#':t=>{return cutColor(t)},         //? Id and Routes
        '@':t=>{return cutFunctionName(t)},     //? functions
        ';':t=>{return cutSeparator(t)},  //? endOfCommandRow
        '\n':t=>{return cutEndOfCommandRow(t)},  //? ==||==
        "'":t=>{return cutStringSimple(t)},
        '"':t=>{return cutStringAdvance(t,'"')},
        '`':t=>{return cutStringAdvance(t,'`')},
        '{':t=>{return cutFragment(t)},
        '(':t=>{return cutParenthesFragment(t)},
        '[':t=>{return cutBracketFragment(t)}
    }
    while(work){
        if(text.length == 0) break;
        let v = null;
        if(!lexTable[text[0]] && !v){
            //Może to liczba?
            v = 
            cutIgnored(text) ||
            cutSpace(text) || 
            lexComment(text) || 
            lexNumber(text) ||
            lexClassName(text) || 
            lexCalcSymbol(text) || 
            cutStaticNode(text)
        }else if(lexTable[text[0]]){
            v = lexTable[text[0]](text);
        }
        text = v.rest
        nodeTree.push(...v.nodes);
    }
    return nodeTree;
}
module.exports = {lexFragment};

