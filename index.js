const path = require('path');


const Context = require('./lib/context')
const _number = require('./lib/number');
const _string = require('./lib/string')
const _fragment = require('./lib/fragment');
const _sieve = require('./lib/sieve');
const _symbol = require('./lib/symbol');
const _space = require('./lib/space');
const _variable = require('./lib/variable');
const _callable = require('./lib/callable');
const _reference = require('./lib/reference');
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
            _string,
            _variable,
            _callable,
            _sieve,
            _reference,
            _number,
            _symbol,
            _space,
            
        ]
    });
    await context.load(file);
    context.run();
})()

function afterStart(programText, context){
    // na początku programu możemy się spodziewać: 
    console.log(_number(programText, context));
}