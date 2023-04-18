const path = require('path');


const Context = require('./lib/context')
const _number = require('./lib/number');
const _fragment = require('./lib/fragment');

/**
 * CSL parser - v0.3.0
 * Napisany od zera, a nie przepisywany co chwilę
 * Nie ma zasadniczo podziału na parsowanie tworzy od razu kontekst
 * W tej już fazie wykrywane są błędy typó itp
 * W tej fazie zachodzi także preinterpretacja
 * I tutaj uruchamiane są niektóre `funkcje`
 * 
 * 
 * ! ustanone nazewnictwo rejestracji
 ** \workspace
 **  - object               @class oraz @new
 **   - właściwości         
 **   - zmienne
 **   - referencje
 **   - typy
 **   
 */

/**
 * MAIN
 */
(async function(){
    let argument = process.argv[2];
    if(!argument){
        console.error('Użycie: cls <filePath>');
        return;
    }
    let file = path.resolve(argument);
    const context = new Context({},{
        loaders: [
            _number
        ]
    });
    await context.load(file);
    context.run();
})()

function afterStart(programText, context){
    // na początku programu możemy się spodziewać: 
    console.log(_number(programText, context));
}