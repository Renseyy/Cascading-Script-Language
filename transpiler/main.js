function loadLibToContext(src,context){
    let lib = require(src);
    return {...context,...lib.context};
}

(async function(){
    var { promises } = require('fs');
    var { lexFragment } = require('./lexer');
    var { prepareTree } = require('./preparer')
    var { parseFragment,preparseFragment } = require('./parser')
    var colors  = require ('colors/safe');
    //load file data
    const data = await promises.readFile( __dirname + '/../test.csl')
    let programText = data.toString();
    
    //!Run from main node
    //? LEXER
    console.log(colors.green('Lexing started'));
    let mainNodeTree = lexFragment(programText);
    console.log(colors.magenta('Lexing finished'));
    //? PostLexer
    

    let startContext = {};
    //? LOAD LIBS
    console.log(colors.green('Loading libs started'));
    startContext = loadLibToContext('../lib/color.js',startContext);
    
    console.log(colors.magenta('Loading libs finished'));

    console.log(colors.green('Preparing started'));
    console.log(mainNodeTree)
    mainNodeTree = prepareTree(mainNodeTree,startContext);
    console.log(colors.magenta('Preparing finished'));
    //? Preparse
    console.log(colors.green('Preparsing started'));
    mainNodeTree = preparseFragment(mainNodeTree,startContext);
    console.log(colors.magenta('Preparsing finished'));
    //? Parser
    console.log(colors.green('Parsing started'));
    console.log(colors.red('Parsing experimental support'));
    //console.dir(mainNodeTree.nodeTree,{ depth: null })
    let {nodeTree,context} = parseFragment(mainNodeTree.nodeTree,startContext);
    //console.log(colors.magenta('Parsing finished'));
    console.dir(mainNodeTree.nodeTree,{ depth: null })
    //console.dir(nodeTree,{ depth: null })
})()