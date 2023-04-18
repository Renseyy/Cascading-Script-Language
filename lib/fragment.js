/**
* ? Leksuje fragment, chyba że coś wyraźnie nie jest fragmentem, w przypadku sukcesu zwraca 
* & {
* &    context: 'Selector',
* &    subtree: [...],
* &    rest: '...'
* & }
*
*/


const NUMBERS = "0123456789"
const LETTERS = "abcdefghijklmnopqrstuvwxyz"
const NOT_ALLOWED_IN_NAMES = "(){}[];:.,$?!@#%^*&+=~`'\"<> \n\t\r"
const STRING_START = "\"'`"

function parseGeneralSelector(t){
   if(t[0] != '*') return null;
   else return {nodes:[{type:'GeneralSelector',group:'Selectors'}],rest:t.substring(1)}
}
function parseClassName(text){
   if(text[0] !== '.') return null
   if(NUMBERS.includes(text[1])) return null;
   const notAllowed = "(){}[];:.,$?!@#%^*&+=~`'\"<> \n\t\r"
   let name = '';
   let rest = '';
   let i = 1;
   let nodes = [];
   while(true){
       if(notAllowed.includes(text[i])) break;
       if(i>= text.length) break;
       name+=text[i];
       i++;
   }
   nodes.push({
       type:'ClassName',
       value:name,
       group:'Selectors',
       real:`.${name}`
   })
   for(;i<text.length;i++){
       rest+=text[i];
   }
   return {nodes:nodes,rest}
}
function parseWorkSpaceName(text){
   //console.log(text[0],text[0] != '\\')
   if(text[0] != '\\') return null;
   if(NUMBERS.includes(text[1])) return null;
   const notAllowed = "(){}[];:.,$?!@#%^*&+=~`'\"<> \n\t\r"
   let name = '';
   let rest = '';
   let i = 1;
   let nodes = [];
   while(true){
       if(notAllowed.includes(text[i])) break;
       if(i>= text.length) break;
       name+=text[i];
       i++;
   }
   nodes.push({
       type:'Workspace',
       value:name,
       group:'Selectors',
       real:`\\${name}`
   })
   for(;i<text.length;i++){
       rest+=text[i];
   }
   return {nodes:nodes,rest}
}
function parseID(text){
   if(text[0] !== '#') return null
   if(NUMBERS.includes(text[1])) return null;
   const notAllowed = "(){}[];:.,$?!@#%^*&+=~`'\"<> \n\t\r"
   let name = '';
   let rest = '';
   let i = 1;
   let nodes = [];
   while(true){
       if(notAllowed.includes(text[i])) break;
       if(i>= text.length) break;
       name+=text[i];
       i++;
   }
   nodes.push({
       type:'ID',
       value:name
   })
   for(;i<text.length;i++){
       rest+=text[i];
   }
   return {nodes:nodes,rest}
}
function parseStateSelector(text){
   if(text[0]!=':') return null;
   
   if(text[1]==':') return parsePseudoElementSelector(text);
   const notAllowed = "(){}[];:.,?!@#%^*&+=~`'\"<> \n\t\r"
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
   
   return {nodes:[{type:'Listener',group:'Selectors',real:`:${name}`,name}],rest}
}
function parsePseudoElementSelector(text){
   if(text[1]!=':') return null;
   const notAllowed = "(){}[];:.,?!@#%^*&+=~`'\"<> \n\t\r"
   let name = '';
   let rest = '';
   let i = 2;
   while(true){
       if(notAllowed.includes(text[i])) break;
       if(i>= text.length) break;
       name+=text[i];
       i++;
   }
   for(;i<text.length;i++){
       rest+=text[i];
   }
   return {nodes:[{type:'PseudoElement',group:'Selectors',real:`::${name}`,name}],rest}
}
function parseVariable(text,options){ //* DONE
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
   return {nodes:[{type:'Variable',group:'LRValue',name}],rest}
}
function parseScheme(text){ //* DONE
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
   return {nodes:[{type:'Scheme',group:'LRValue',name}],rest}
}
function parseAttributeSelector(text){
   /**
    * ! Możemy otrzymać:
    * @ [width] zawiera argument width                 ex. [width], [height]
    * @ [width <smt> RValue] width coś z RValue        ex.
    */
   const notAllowed = " \n\t\r"
   if(text[0]!='[') return null;  //Var must start with SelectorLogic must startWith
   let name = text[0];
   let rest = '';
   let i = 1;
   while(true){
       if(notAllowed.includes(text[i])) break;
       if(text[0] == ']'){
           i++;
           break;
       };
       if(i>= text.length) break;
       name+=text[i];
       i++;
   }
   for(;i<text.length;i++){
       rest+=text[i];
   }
   return {nodes:[{type:'variable',name}],rest}
  
}
function parseCombinators(t){
   if(t[0] == '>' || t[0] == '/'){
       return {
           nodes:[
               {
                   type: 'ChildCombinator',
                   group: 'Combinators',
                   symbol: '/'
               }
           ],
           rest:t.substring(1)
       }
   }else if(t[0] == '+'){
       return {
           nodes:[
               {
                   type:'NextSiblingCombinator',
                   group:'Combinators',
                   symbol: '+'
               }
           ],
           rest:t.substring(1)
       }
   }else if(t[0] == '~'){
       return {
           nodes:[
               {
                   type:'SubsequentSiblingCombinator',
                   group:'Combinators',
                   symbol: '~'
               }
           ],
           rest:t.substring(1)
       }
   }else{
       return null;
   }
}

function parseBaseClass(text){
   const notAllowed = "(){}[];:.,?!@#%^*&+=~`/'\"<> \n\t\r"
   let name = '';
   let rest = '';
   let i = 0;
   while(true){
       //console.log(text)
       if(notAllowed.includes(text[i])) break;
       if(i>= text.length) break;
       name+=text[i];
       i++;
   }
   for(;i<text.length;i++){
       rest+=text[i];
   }
   return {nodes:[{type:'BaseClass',group:'Selectors',real:name,name}],rest}
}


//! Main functions
function simplifySelector(subtree){

   //* [v] Space relation || relation space -> relation
   //* [v] Space to Child
   //* [x] &BaseClass => Error 
   //* [x] .class.class => class with class [itp]
   let newSubtree = [];
   for(let i=0; i<subtree.length; i++){
       let n = subtree[i]
       if(n.type == 'Space'){
           if( i == 0) continue;
           if( subtree[i+1].group == 'Combinators'){
               newSubtree.push(subtree[i+1]);
               i++;
               continue;
           }
           if( subtree[i-1].group == 'Combinators') continue;
           
           newSubtree.push({
               type: 'DescendantCombinator',
               group: 'Combinators',
               symbol: ' '
           });
           continue
       }else if(n.group == 'Selectors'){
           if( i> 0 && subtree[i-1].group == 'Selectors'){
               newSubtree.push({
                   type: 'WithRelation',
                   group: 'Relations'
               });
           }
       }
       newSubtree.push(n)
   }
   return newSubtree;
}
function selectorLexer(text, context){

    /**
     * ! Selektor składać się może z dwóch lub jednego elementu:
     * ścieżki i selektora własiwego
     * ?-> Working on:
     * * Add realtions
     * TODO:
     * * Dodać obsługę zmiennych
     * * Dodać obsługę referencji
     * * Dodać obsługę schematów
     */
    const GOOD_END = "{("
    const BAD_END = "\n";
    const CAN_START_WITH='.#$:*&\\['
    const WHITE_SPACES = "\t \r";
    // Sprawdź czy może się wogółe tak rozpoczynać
    if(!CAN_START_WITH.includes(text[0]) && !LETTERS.includes(text[0].toLowerCase())) return null;
    let subtree = [];
    let rest = '';
    let t = text;
    let wasThisSelector = false;
    while(true){
         if(!t) break;
         if(BAD_END.includes(t[0])) return null;
         if(GOOD_END.includes(t[0])) break;
         if(text.length == 0) return null;
         if(WHITE_SPACES.includes(t[0])){    // Zmieniane przez symplifier na 
            let real = t[0];
            t = t.substring(1);
            while(WHITE_SPACES.includes(t[0])){
                real+= t[0];
                t = t.substring(1); 
            }
            subtree.push({type:'Space',real});
            continue;
         }
         if(t[0] == '&'){    //Move to own funtion
            if(wasThisSelector) throw new Error(`You can't use two "&" in one selector`)
            subtree.push({
                type:'ThisSelector',
                group:'Selectors',
                real:'&'
            });
            t = t.substring(1)
            wasThisSelector = true;
            continue;
            
         }
         let n = 
         parseGeneralSelector(t) ||
         parseClassName(t) ||
         parseWorkSpaceName(t) || 
         parseID(t) ||
         parseStateSelector(t) ||
         parseVariable(t) || 
         parseScheme(t)  ||                   // Nie wiem co zrobić
         parseAttributeSelector(t) ||        // []
         parseCombinators(t) ||
         parseBaseClass(t) 
         if(!n) throw new Error(t)
         t = n.rest;
         subtree.push(...n.nodes);
     }
     for(let i =0; i<t.length;i++){
         rest+=t[i];
     }
     const simplyfiedSelector = simplifySelector(subtree);
     context.registerSelector(simplyfiedSelector);
     console.log(context.resolveSelector(simplyfiedSelector))
     return {
         context:'Selector',
         subtree: simplyfiedSelector,
         rest
     }
}
function pathLexer(text, context){
    let rest = '';
    let t = text;
    let startingDir = null;
    // check starting point
    if(t[0] == '/'){
        startingPoint = 'RootDir'
        t = t.substring(1);
    }else if(t[1] == '/'){
        if(t[0] == '~'){
            startingPoint = 'HomeDir'
        }else if(t[0] == '%'){
            startingPoint = 'ProjectDir'
        }else if(t[0] == '.'){
            startingPoint = 'ActualDir'
        }else{
            return null;
        }
        t = t.substring(2);
    }else {
        return null;
    }
    if(t[0] == '/') throw new Error('Nie można używać podwójnego znaku `/` - powoduje to błąd pustej ścieżki');
    let fileNodes = [];
    
    let actualNode = '';
    while(true){
        if(t[0] == '/'){
            fileNodes.push(actualNode);
            continue;
        }
        if(t[0] == '$'){

        }
        if(NOT_ALLOWED.includet[0]){

        }
    }
    for(let i =0; i<t.length;i++){
        rest+=t[i];
    }
    const simplyfiedSelector = simplifySelector(subtree);
    context.registerSelector(simplyfiedSelector);
    console.log(context.resolveSelector(simplyfiedSelector))
    return {
        context:'Selector',
        subtree: simplyfiedSelector,
        rest
    }
}
function queryLexer(dataText, content){
    //
    /**
    * ! Selektor składać się może z dwóch lub jednego elementu:
    * ścieżki i selektora własiwego
    * ?-> Working on:
    * * Add realtions
    * TODO:
    * * Dodać obsługę zmiennych
    * * Dodać obsługę referencji
    * Jeżeli trafiamy na referencję, tekst bądź zmienną
    */
    let path = pathLexer(dataText, content);
    return {
        context:'Query',
        selector: simplyfiedSelector,
        rest
    }
}
function lexSelector(dataText){
    
    
}
function blockLexer(dataText, content){
    /**
     * Możemy zacząć od '{' ale nie musimy
     */
    
}
function fragmentLexer(context){
    context.startWork(null, 'fragment');
    context.startWork('test');
   context.reportError(context.i, 'SyntaxError', 'Niespodziewany znak t');
}

module.exports = fragmentLexer;