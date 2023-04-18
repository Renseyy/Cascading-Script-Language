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
    
}function cutFragment(text){
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