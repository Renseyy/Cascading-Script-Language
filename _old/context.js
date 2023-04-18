class context{
    constructor(actualSelector){
        this.actualSelector||=actualSelector
    }
    IDs = [];
    programHierarchy = [];
    workspaces = [];
    selectors = {};
    actualSelector = '\\app'

    registerSelector(selector){
        console.info(`Rejestracja selectora: [${selector}]`);
    }
    chaangeActualSelectorTo(selectorText){

    }
    resolveSelector(subtree){
        //creates better selector text from relative selector
        let result = ''
        let working = {
            baseClass: null,
            id: null, 
            classes: [],
            ifes: [], //! DISABLED
            pseudoElement:  null,
            listener: null,
        }
        for(const n of subtree){
            
            if(n.group == 'Selectors'){
                if(n.type == 'ThisSelector'){
                    result += this.actualSelector;
                }else if(n.type == 'Workspace'){
                    result += n.real
                }else if(n.type == 'ID'){
                    working.id = n.value
                }else if(n.type == 'ClassName'){
                    working.classes.push(n.real)
                }else if(n.type == 'BaseClass'){
                    working.baseClass = n.real.toUpperCase();
                }else if(n.type == 'Listener'){
                    working.listener = n.real.toLowerCase();
                }
            }else if(n.group == 'Combinators'){
                result += this._constructSelector(working);
                working = {
                    baseClass: null,
                    id: null, 
                    classes: [],
                    ifes: [], //! DISABLED
                    pseudoElement:  null,
                    listener: null,
                }
                result += n.symbol
            }
        }
        result += this._constructSelector(working);
        return result
    }
    _constructSelector(working){
        console.info(working)
        let selector = ''
        selector += working.baseClass || "";
        selector += working.id || "";
        working.classes.sort();
        for(const c of working.classes){
            selector += c;
        }
        selector += working.listener || ""; 
        return selector;
    }
    _getElementById(id){
        return this.IDs[id] || null;
    }
}
module.exports = context;