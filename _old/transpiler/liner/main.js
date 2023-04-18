function toLines(text){
    // Jak działa ta funkcja?
    /**
     * Bierze znaki, i dzieli tekst na linie. 
     * Każda linia zachowywana jest w strukturze
     * {
     *  base: 'Line',
     *  type: '<linetype>'
     *  raw: '${text}',
     *  content: '${text}
     * }
     *! Wszystkie linie połączone (ich raw), muszą utworzyć spowrotem tekst z pliku
     *? Działa w 
     */

    
    const LINETYPE = {
        OBIECT_CREATE_ADD_AND_SPECIFY,  // [abc](???){ 
        VARIABLE_SET,                   // $[varLike]:*
        FLAG_SET,                       // :[flagLike]:*
        REFERENCE_SET,                  // &[referenceLike]:*
        RUN_METHOD,                     // @[functionName]          
        RUN_SCHEME,                     // @%[schemeName]
        RUN_REFERENCE,                  // @&[referenceName]
        RUN_VARIABLE,                   // @$[variableName]
        OBSERVE,                        // @(){
        QUERY_SPECIFY,                  // {
        METHOD_SET,                     // @[functionName]:*

    }
 }

