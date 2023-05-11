const _number = require('./tokens/number');
const _string = require('./tokens/string')
const _sieve = require('./tokens/sieve');
const _symbol = require('./tokens/symbol');
const _space = require('./tokens/space');
const _variable = require('./tokens/variable');
const _callable = require('./tokens/callable');
const _reference = require('./tokens/reference');
const tokens = [
    _string,
    _variable,
    _callable,
    _sieve,
    _reference,
    _number,
    _symbol,
    _space,
]
// Uruchamiamy parse line przekazując Tokenizer. Jeżeli linia wywoła 'openToken' a w nim contiuesly to następną linię rozpoczynamy w konteście poprzedniej i ustawiamy linkedUp na true
class LinesDescriptor{
    #descriptions = new WeakMap()
    #emptyDescriptor = {
        tokens: [],
        continues: null,
        upLinked: null
    }
    getLineDescription(line){
        return this.#descriptions.get(line) 
    }
}

module.exports = class Tokenizer{
    #tokenStack = []
    #cache = {
        /** @var Map<Symbol, File> files */
        files: new Map()
    }
    constructor(context){
        this.#context = context
        this.#symbol = new Symbol()
    }
    /**
     * Dodaje plik do naszego wewnętrznego cache. Dzięki temu możemy z nim powiązać chodźby tokenStack
     * @param {*} file 
     * @returns ?true
     */
    #addFile(file){
        let symbol = file.symbol;
        if(this.#cache.files.has(symbol))
            return null
        this.#cache.files.set(symbol, {
            file: file,
            workStack: [],
            linesDescriptor: new LinesDescriptor()
        })
        return true
    }
    /**
     * Parses line based on tokenStack
     * 
     * @param {Line} line
    */
    parseLine(line){
        let file = line.file
        this.#addFile(file);
        let cache = this.#cache.files.get(file.symbol);
        let lineDescriptor = cache.linesDescriptor(line);

    }
}
