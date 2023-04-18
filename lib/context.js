const { promises } = require('fs');

module.exports = class Context{
    #stack = [];
    #tree = [];
    #files = [];
    #actualFile = null;
    #options = {}
    constructor(preloadData, options = {
        loaders: [],
    }){
        this.#options = options;
        //TODO: dodać wczytywanie już gotowych danych
    }
    async load(path){
        await this.#loadFile(path);
    }
    run(index = null){
        for(const file of this.#files){
            this.#actualFile = file;
            this.#runFile(file);
        }
        return this.#tree;
    }
    get #code(){
        return this.#actualFile.code;
    }
    get #actualIndex(){
        return this.#actualFile.index;
    }
    set #actualIndex(value){
        this.#actualFile.index = value;
    }
    /**
     * Zwraca aktualny tekst do przetworzenia
     * @param ?int index
     * @returns string
     */
    getText(index = null){
        
        return this.#code.substring(index ? index : this.#actualIndex);
    }
    /**
     * Zwraca pozycję jako obiekt:
     * {
     *  col: 
     *  row: 
     * }
     * @param ?int index 
     */
    getPosition(index = null){
        return this.#calcPosition(this.#code, index? index: this.#actualIndex);
    }

    startWork(name, type = 'function'){
        let symbol = Symbol(name);
        this.#stack.push({
            time: Date.now(),
            type: type,
            postion: this.getPosition(),
            name: name,
            deep: this.#stack.length,
            symbol: symbol,
            file: this.#actualFile
        })
        return symbol
    }
    stopWork(symbol){
        let stackLevel = this.#stack.pop();
        if(stackLevel.id !== symbol) throw new Error('Kolejność kończenia pracy w stosie jest nieprawidłowa');
        return true;
    }
    reportError(index, type, message){
        const MARGIN =`\t`;
        let position = this.getPosition(index);
        console.error(`\x1b[37;1m${this.#actualFile.path}\x1b[0m:\x1b[34;1m${position.row}\x1b[0m:\x1b[34;1m${position.col}\x1b[0m`);
        console.error(`${MARGIN}${this.#getLine(this.#code, position.row)}`)
        console.error(`${MARGIN}\x1b[35;1m${this.#getIndicator(position.col)}\x1b[0m`)
        console.error(``);
        console.error(`\x1b[31;1m${type}\x1b[0m: \x1b[36;1m${message}\x1b[0m`);
        this.#printStack('\t');
        console.error();
        process.exit(1);
    }
    reportWarning(index, type, message){
        const MARGIN =`\t`;
        let position = this.getPosition(index);
        console.warn(`\x1b[37;1m${this.#actualFile.path}\x1b[0m:\x1b[34;1m${position.row}\x1b[0m:\x1b[34;1m${position.col}\x1b[0m`);
        console.warn(`${MARGIN}${this.#getLine(this.#code, position.row)}`)
        console.warn(`${MARGIN}\x1b[35;1m${this.#getIndicator(position.col)}\x1b[0m`)
        console.warn(``);
        console.warn(`\x1b[35;1m${type}\x1b[0m: \x1b[36;1m${message}\x1b[0m`);
        this.#printStack('\t');
        console.warn();
    }
    getCode(){
        return this.#code;
    }
    set i(value){
        this.#actualIndex = value;
    }
    get i(){
        return this.#actualIndex;
    }

    #calcPosition(code, index){
        let row = 1
        let col = 1
        for(let i = 0; i<index; i++){
            let char = code[i];
            if(char == `\n`){
                col == 1;
                row++;
            }else{
                col++;
            }
        }
        return {
            col,
            row,
            file: this.#actualFile
        }
    }
    #getLine(code, exRow){
        let row = 1
        let text = ''
        for(let i = 0; i<code.length; i++){
            let char = code[i];
            if(char == `\n`){
                if(row == exRow) return text;
                text = ''
                row++;
            }else{
                text+=char;
            }
        }
        return text
    }
    #getIndicator(col){
        let text = ''
        for(let i = 0; i<col - 1; i++){
            text+=' '
        }
        text+='^'
        return text
    }
    async #loadFile(path){
        for(const file in this.#files){
            if(file.path == path) throw new Error('File already loaded')
        }
        const data = await promises.readFile(path);
        let code = data.toString();
        this.#files.push({
            path: path,
            index: 0,
            tree: [],
            code: code,
            indexed: false,
            loadTime: Date.now()
        })
        return this.#files.length - 1;
    }
    #runFile(file){
        
        while(true){
            for(const loader of this.#options.loaders){
                console.log(loader(this));
            }
            if(!(this.#actualIndex > this.#code.length)) break;
        }
    }
    #printStack(MARGIN){
        for(const stack of this.#stack){
            console.log(`${MARGIN}at \x1b[32m${stack.type}\x1b[0m ${(stack.name? stack.name+" ": "")}(\x1b[38;5;240m${stack.file.path}:\x1b[0m${stack.postion.row}\x1b[38;5;240m:\x1b[0m${stack.postion.col})`)
        }
        
    }
    
}