
const ADD_EOR = true;   //D: true
const ADD_VAL = false;  //D: false
const ADD_WIT = true;   //D: true
const NUMBERS = "0123456789"
const LETTERS = "abcdefghijklmnopqrstuvwxyz"
const COMMENTS_TREE = {
    '/':{
        '/':{
            _:{
                name:'JS_COMMENT',
                type:'ONE_LINE',
                end:['\n']
            },
            '/':{
                _:{
                    name:'EXPENDED_COMMENT',
                    type:'ONE_LINE',
                    end:['\n']
                } 
            }
        },
        '*':{
            _:{
                name:'JS_MULTILINE_COMMENT',
                type:'MULTI_LINE',
                end:['*/']
            } 
        },
        '[':{
            _:{
                name:'ATTRIBUTE_COMMENT',
                type:'MULTI_LINE',
                end:[']']
            }
        }
    }
}
/** 
 * ! SZYBKA DOKUMENTACJA
 * ? Rodzaje komentarzy:
 * &    Jedno linijkowe:
 * *        // - nie można umieszczać w ()
 * *        /// - można umieszczać wszędzie
 * *        -- 
 * &    Wielolinijkowe
 * *        / *  * /    (ale bez spacji xD) takie jak w js liczy ilość otwarć i zamknięć, przez co można je zagnieżdzać, ale jednocześnie trzeba na to uważać 
 * *        /[]         Zapis a'la atrybutowy nie liczy liczby nawiasów, ale można napisać \] i wtedy nie zamknie nawiasu
 */

function lexComment(text){
    return cutComment(text);
}

function cutComment(text){
    function cut_JS_COMMENT(text){
        
    }
    //Na początku określamy jaki to rodzaj comentarza
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

function cutStringAdvance(text){    //* DONE 
    const separators = `"'`
    if(!separators.includes(text[0])) return null;  // assigment is always " or `
    let separator = text[0];
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
function cutVariable(text,options){ //* DONE
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
    return {nodes:[{type:'Variable',group:'LRValue',name,...options}],rest}
}
function cutScheme(text){ //* DONE
    const notAllowed = "(){}[];:.,?!@#$^*&+=~`'\"<> \n\t\r"
    if(text[0]!='%') return null;  //Var must start with $
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
    return {nodes:[{type:'Scheme',name}],rest}
}
function cutReference(text){ //* DONE
    //Referencja może być w jednej z dwóch postaci
    //Albo sama & wtedy wskazuje na this,
    //Albo popodłączana, wtedy czyta aż do zakońćznia lini bądź niedozwolonego znaku https://www.w3schools.com/cssref/css_selectors.php
    const notAllowed = "(){}[];:.,?!@#%^*$+-=~`'\"<> \n\t\r"
    if(text[0]!='&') return null;  //Var must start with $
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
    //console.log(name, rest)
    return {nodes:[{type:'Reference',name}],rest}
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
     * ?
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

function lexLogicSymbol(text){
    /** lexLogicSymbol - parsowanie Symboli logic
     * Funkcja pobiera tekst i sprawdza czy operacja jest operacją jedną z poniższej listy:
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
     * ?
     * @ From CSS
     * ? [ ~= ]                         Zawiera     ArrayContains
     * ? [ |= ]                         DashListContains
     * ? [ ^= ]                         BeginWith
     * ? [ $= ]                         EndsWith
     * ? [ *= ]                         Contains  
    */
    let rest = '';
    let type = null;
    let i = 0;
    if(!text) return null;
    
    let l = text[i];
    // * Operacje PRZYPISANIA
    
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
    const notAllowed = "(){}[];:.,?!@#%^*&+=~`'\" \n\t\r"
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
function cutRegex(text){
    const notAllowed = "/"
    if(text[0]!='/') return null;  //Var must start with $
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

//! NEW
function parseSelector(text){
    const selectorLexer = require('./lexer/selector')
    let result = selectorLexer(text);
    //console.log(result)
    if(!result) return null;
    let {context,subtree,rest} = result
    return {
        nodes:[{context, subtree}],
        rest
    }
}
function lexAssignmentOperator(text){
    let rest = '';
    let type = null;
    let i = 0;
    let nodes = [];
    if(!text) return null;
    let independent = false;
    let l = text[i]; 
    // * Operacje na tekstach
    if(l == '.'){
        if(text[i+1] == '.'){
            if(text[i+2] == '.'){
                type = 'Destruct'
                i+=2
            }else{
                type = 'Schemize'
                i+=1
            } 
        }else{
            type = 'Concatenation'
        }
       
    }else 
    // * Operacje na kontenerach
    if(l == '#'){
        type = 'Join'
    }else
    // * OPERACJE ARYTMETYCZNE
    if(l == '+'){
        if(text[i+1] == '+'){
            //Niekoniecznie, bo to mogłabybyć liczba, sprawdźmy to 
            let n = lexNumber(text.substring(1));
            if(n){
                return {nodes:[{type:"Addition",independent:false},...n.nodes],rest:n.rest}
            }
            type = 'Increment'
            independent = true;
            i++;
        }else{
            type = 'Addition'
        }
    }else if(l == '-'){
        if(text[i+1] == '-'){
            //Niekoniecznie, bo to mogłabybyć liczba, sprawdźmy to 
            let n = lexNumber(text.substring(1));
            if(n){
                return {nodes:[{type:"Subtraction",independent:false},...n.nodes],rest:n.rest}
            }
            type = 'Decrement'
            independent = true;
            i++;
            
        }else if(text[i+1] == '>'){
            //Niekoniecznie, bo to mogłabybyć liczba, sprawdźmy to 
            type = 'FromTo'
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
        
    }else if(l == ':'){
        if(text[i+1] == ':'){
            type = 'GetProperty'
            i++;
        }else{
            type = 'Stateny'
        }
    }else if(l == '<'){
        if(text[i+1] == '-'){
            type = 'ToFrom'
            i++;
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
            type = 'ChooseAnd'
            i++;
        }
    }else if(l == '|'){
        if(text[i+1] == '|'){
            type = 'ChooseOr'
            i++;
        }
    }else if(l == '~'){
        type = 'RemoveAll'
   
    }else if(l == ','){
        type = "Comma"
        
    }
    //Logiczne i Binarne
    i++;
    for(;i<text.length;i++){
        rest+=text[i];
    }
    return type?{nodes:[{type,independent}],rest}:null;
}
function lexAttribute(text){
    return cutStaticNode(text);
}
//! LEX CONTEXTS [https://github.com/Renseyy/Cascading-Script-Language/wiki/(Lexer)-Konteksty-leksowania]
function lexFragment(text,outer){
    //  Fragment nie musi sprawdzać czy jest fragmentem, bo jeżeli zaczynało coś się od `{` to na pewno nim jest
    //? Musimy mieć pewność, że coś jest przypisaniem. Jak możemy to osiągnąć, żeby nie pomylić tego ze stanem? 
    if(!outer && text[0]!= '{') return null;
    if(!outer) text = text.substring(1);
    const END_SIGN = "}"
    const WHITE_SPACES = "\t \r";
    let subtree = [];
    let rest = '';
    let t = text.substring(0);
    // Faza pierwsza, czytamy tekst
    /**
     * Schemat jest zawsze ten sam:
     * & [selector][?consturctor][fragment]
     * * albo
     * & [Lvalue][assignContext]    //-> 
     * * albo
     * & [function][arguments]
     * * albo
     * & [comment]
     * * albo 
     * & [reflectionContext]
     * ? - Najłatwiej wykryć komentarze,
     * ? - Poźniej atrybuty, 
     * ? - Następnie funkcie
     * ? - LValue
     * ? - selectory
     */
    while(true){
        if(!t) break;
        if(END_SIGN.includes(t[0])) break; //Kończymy
        if(WHITE_SPACES.includes(t[0])){
            subtree.push({type:'Space'});
            t = t.substring(1);
            while(WHITE_SPACES.includes(t[0])){
                t = t.substring(1);
            }
            continue;
        }
        // Teraz prawdzamy po kolei: 
        //console.log(t)
        let n = 
        lexReflection(t) || 
        parseSelector(t) ||                   // Nie wiem co zrobić
        cutEndOfCommandRow(t) ||
        cutSeparator(t) ||
        lexFragment(t)  ||
        //lexAttribute(t) ||
        lexAssignment(t) ||
        null
        if(!n) throw new Error(`Error parsing ${t}`);
        t = n.rest;
        subtree.push(...n.nodes);
    }
    // Faza druga, przepisujemy resztę
    for(i=1;i<t.length;i++){
        rest+=t[i];
    }
    // Faza trzecia, porządkujemy nody które otrzymaliśmy w faktyczne nody

    // Faza czwarta porządkujemy to co zostało

    // Faza piąta
    return {
        nodes:[{context:'fragment', subtree}],
        rest
    }
}
function lexAssignment(text){
    //console.log('Test')
    //Musimy sprawdzić czy nie pojawia się OD RAZU po naszym : jakaś litera bądź kolejny : w takim przypadku nie jest to przypisanie, ale dalszy kontekst stanu lub pseudo stanu
    //Dostajemy zawsze pierwszy znak dodakowo
    /**  Poprawne przypisania
     * * :123       // Przypisz 123
     * * : 123      // Przypisz 123
     * * : -123     // Przypisz -123
     * * : - 123    // Odpisz 123
     * * :- 123     // Czytelniej to co wyżej
     * * : *123 + 123   // Pomnóż razy 123 i dodaj 123
     * * : 1 2 3    // Tablica 3 liczb 
     * * : 1, 2, 3  // Tak jak wyżej
     */
    const END_SIGN = "\n;"
    const WHITE_SPACES = "\t \r";
    let subtree = [];
    
    if(text[0]!=':') return null;  //Assignment musi zaczynać się od :
    
    let rest = '';
    let t = text.substring(1);
    // Faza pierwsza, czytamy tekst
    while(true){
        if(!t) break;
        if(END_SIGN.includes(t[0])) break; //Kończymy
        if(WHITE_SPACES.includes(t[0])){
            subtree.push({type:'Space'});
            t = t.substring(1);
            while(WHITE_SPACES.includes(t[0])){
                t = t.substring(1);
            }
            continue;
        }

        // Teraz prawdzamy po kolei: 
        let n = 
        lexReflection(t) ||
        cutComment(t) ||            // Zawsze na początku warto sprawdzać czy nie są to komentarze
        cutStringSimple(t) ||       //  Proste teksty
        cutStringAdvance(t) ||      //  Zaawansowane teksty
        cutReference(t) ||
        cutColor(t) ||              // Colory
        cutScheme(t) ||
        lexAssignmentOperator(t) || // Operatory przypisania
        lexNumber(t) ||             // Liczby 
        cutFunctionName(t) ||
        cutVariable(t) ||
        cutStaticNode(t) ||
        null                    // Nie wiem co zrobić
        if(!n) throw new Error(`Error parsing ${t}`);
        t = n.rest;
        subtree.push(...n.nodes);
    }
    // Faza druga, przepisujemy resztę
    for(i=1;i<t.length;i++){
        rest+=t[i];
    }
    // Faza trzecia, porządkujemy nody które otrzymaliśmy w faktyczne nody

    // Faza czwarta porządkujemy to co zostało

    // Faza piąta
    return {
        nodes:[{context:'assignment', subtree}],
        rest
    }
}
function lexGroup(text){
    
}
function lexLogic(text){
    // Tutaj rozpoznajemy co to jest i na podstawie tego podejmujemy dokładną decyzję co do zawartości
    const NOT_ALLOWED = ":;"

}
function lexReflection(text){
    if(text[0]!='#') return null;  //Reflection must start with #[
    if(text[1]!='[') return null;  
    let name = '';
    let rest = '';
    let i = 2;
    while(true){
        if(text[i] == ']')break;
        if(i>= text.length) break;
        name+=text[i];
        i++;
    }
    i++;
    for(;i<text.length;i++){
        rest+=text[i];
    }
    
    return {
        nodes:[{context:'reflection', subtree:[{name}]}],
        rest
    }
}
function lexType(text){
   
}

// function lexFragment(text){
//     /** Parsowanie elementów spornych:
//      * elementy sporne, takie jak np +,- czy słowa są parsowane w kolejności
//      * dla +,- :
//      *  - liczba 
//      *  - operacja na tablicy
//      *  - działania matematyczne
//      * 
//      *  ? Kożystamy w tym miejscu z własności, że jezeli nie jest coś zgodne, to funkcja zwraca null
//      */
    
//     let nodeTree = [];
//     let work = true;
//     const lexTable = {
//         '$':t=>{return cutVariable(t)},         //? Variables
//         '#':t=>{return cutColor(t)},         //? Id and Routes
//         '@':t=>{return cutFunctionName(t)},     //? functions
//         ';':t=>{return cutSeparator(t)},  //? endOfCommandRow
//         '\n':t=>{return cutEndOfCommandRow(t)},  //? ==||==
//         "'":t=>{return cutStringSimple(t)},
//         '"':t=>{return cutStringAdvance(t,'"')},
//         '`':t=>{return cutStringAdvance(t,'`')},
//         '{':t=>{return cutFragment(t)},
//         '(':t=>{return cutParenthesFragment(t)},
//         '[':t=>{return cutBracketFragment(t)}
//     }
//     while(work){
//         if(text.length == 0) break;
//         let v = null;
//         if(!lexTable[text[0]] && !v){
//             //Może to liczba?
//             v = 
//             cutIgnored(text) ||
//             cutSpace(text) || 
//             lexComment(text) || 
//             lexNumber(text) ||
//             lexClassName(text) || 
//             lexCalcSymbol(text) || 
//             cutStaticNode(text)
//         }else if(lexTable[text[0]]){
//             v = lexTable[text[0]](text);
//         }
//         text = v.rest
//         nodeTree.push(...v.nodes);
//     }
//     return nodeTree;
// }
module.exports = {lexFragment};

