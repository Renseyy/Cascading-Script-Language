
function parseElement(elements,context,thisContext){

}
function parseFragment(nodeList,context){
    /** MAKOUS 2022
     * Parser Języka Cascading Script Language
     * 
     * ? nodeLis - drzewo nodów, składające się z 
     *  */  
    let nodeTree = [];
    for(let i = 0;i<nodeList.length;i++){
        let node = nodeList[i];
        if(node.type == 'StaticNode'){
            /**
             * We have 3 options:
             * - class modification ~ with sate staticNode|Fragment lub staticNode|assigment|staticNode|Fragment lub staticNode|assigment|assigment|staticNode|fragment  
             * ?                                redeclareClass          redeclareState                                redeclareVarNode
             * - constuctor ~ type constructor staticNode|ParenthesFragment | staticNode|ParenthesFragment|Fragment
             * ?                                constructor(empty Fragment)                     constructor
             * - attribute change
             */
            //! Na początku sprawdzamy czy to słowo nie zostało zdefiniowane w kontekście jako słowo kluczowe
            if(context.staticNodes[node.name]){
                i--;
                continue;
            }
            //Warto zauważyć, ze parsujemy to jakby od początku lini
            //! Sprawdź czy w obecnym objekcie mamy zadeklarowaną już taką wartość
            if(nodeList[i+1].type == 'Assignment'){
                if(nodeList[i+2].type == 'Assignment'){
                    if(nodeList[i+3].type == 'StaticNode'){
                        if(nodeList[i+4].type == 'Fragment'){
                            
                            nodeTree.push({
                                action:'modifyVarNodeAttributes',
                                thisNode:node.name,
                                args:{
                                    propertyName:nodeList[i+3].name,
                                    fragment:parseFragment(nodeList[i+4].subtree,context).nodeTree
                                }
                            })
                            i+=4;
                            continue;
                        }
                    }
                }else if(nodeList[i+2].type == 'StaticNode'){
                    if(nodeList[i+3].type == 'Fragment'){
                        
                        nodeTree.push({
                            action:'modifyNodeStateAttributes',
                            thisNode:node.name,
                            args:{
                                stateName:nodeList[i+2].name,
                                fragment:parseFragment(nodeList[i+3].subtree,context).nodeTree
                            }
                        })
                        i+=3;
                        continue;
                    }
                }else{
                    //Czytamy aż do końca lini znakowej
                    nodeTree.push({
                        action:'setAttribute',
                        thisNode:context.this,
                        args:{
                            attribute:node.name,
                            value:parseElement(nodeList[i+3].subtree,context,{})
                        }
                    })
                    i+=3; 
                }
            }else if(nodeList[i+1].type == 'ParenthesFragment'){
                //Konstruktor
                if(nodeList[i+2].type == 'Fragment'){ 
                    nodeTree.push({
                        action:'addNewNodeToContent',
                        thisNode:node.name,
                        args:{
                            constructorAttributes:nodeList[i+2].name,
                            fragment:parseFragment(nodeList[i+3].subtree,context).nodeTree
                        }
                    })
                    i+=3;
                    continue;
                }
            }
        }
    }
    return {nodeTree:nodeTree,context:context}
}
function preparseFragment(nodeTree,context){
    // Changes all StaticNodes (if can) to coresponding values
    const newNodeTree = [];
    for(const node of nodeTree){
        if(node.type == 'StaticNode'){
            newNodeTree.push(context.staticNodes[node.name] || node);
        }else if(node.subtree){
            node.subtree = preparseFragment(node.subtree,context);
            newNodeTree.push(node);
        }else{
            newNodeTree.push(node); 
        }
    }
    return {nodeTree:newNodeTree}
}
module.exports = {parseFragment,preparseFragment}