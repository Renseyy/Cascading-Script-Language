
function cleanTree(nodeTree){
    let newNodeTree = [];
    //Usuwamy wszystkie niepotrzebne znaki nowej lini
    let f = 0;
    for(const n of nodeTree){
        if(n.special != 'EOLX'){
            f = 0;
            if(n.subtree){
                n.subtree = cleanTree(n.subtree);
            }
        }else{
            if(n.type == "Separator"){
                f = 2;
                console.log()
            }
            if(n.type == "EOR"){
                f += 1;
                if(f>=2) continue;
                
            }
        }
        newNodeTree.push(n);
    }
    return newNodeTree;
}
const GENERAL_TO_LOGIC = {
    
}
function processTree(nodeTree,context){
    //Te regóły mają za zadanie zwrócić juz jednoznacznie znaki. Dalej część rzeczy jest zakładana (StaticNody, bo do tego potrzebujemy kontekstu)


    let newNodeTree = [];
    //Usuwamy wszystkie niepotrzebne znaki nowej lini
    let f = 0;
    for(let n of nodeTree){
        //Zamieniamy staticNody, jeżeli są zdefiniowane
        if(n.type == 'StaticNode'){
            n = context.staticNodes[n.name] || n;
        }else if(n.subtree){
            n.subtree = processTree(n.subtree,context);
        }

        if(n.special != 'EOLX'){
            f = 0;
            if(n.subtree){
                n.subtree = cleanTree(n.subtree);
            }
        }else{
            if(n.type == "Separator"){
                f = 2;
                console.log()
            }
            if(n.type == "EOR"){
                f += 1;
                if(f>=2) continue;
                
            }
        }
        newNodeTree.push(n);
    }
    return newNodeTree;
}
function prepareTree(nodeTree,context){
    let stepOne = processTree(nodeTree,context);
    let stepTwo = cleanTree(stepOne);
    return stepTwo;
}
module.exports = {prepareTree}