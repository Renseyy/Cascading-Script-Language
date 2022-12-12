(async function(){
    var { promises } = require('fs');
    var { lexFragment } = require('./lexer');
    var { parseFragment } = require('./parser')
    var colors  = require ('colors/safe');
    //load file data
    const data = await promises.readFile( __dirname + '/../test.csl')
    let programText = data.toString();
    
    //!Run from main node
    //? LEXER
    console.log(colors.green('Lexing started'));
    let mainNodeTree = lexFragment(programText);
    console.log(colors.magenta('Lexing finished'));
    
    //? Parser
    console.log(colors.green('Parsing started'));
    console.log(colors.red('Parsing experimental support'));
    let {runtimeTree,context} = parseFragment(programText);
    console.log(colors.magenta('Parsing finished'));
    console.dir(mainNodeTree,{ depth: null })
})()