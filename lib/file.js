const { promises } = require('fs');
class Line{
    #content = null
    #previous = null
    #next = null
    #index = null
    constructor(manager){
        this.#symbol = new Symbol();
        this.#manager = manager
    }
    _setIndex(index){
        this.#index;
    }
    _setNext(line){
        this.#next = line
    }
    _setPrevious(line){
        this.#previous = line
    }
    get index(){
        return this.#index
    }
    set content(value){
        this.#content = value
    }
    get content(){
        return this.#content
    }

    previous(){
        return this.#previous
    }
    next(){
        return this.#next
    }
    isLast(){
        return this.#next === null;
    }
    isEmpty(){
        return this.#content === '' || this.#content === null
    }

}

class LinesManager{
    #startLine = null;
    constructor(content){
        const linesContent = content.split('\n');
        linesContent.forEach(lineContent => {
            let line = new Line(this);
            line.setContent = lineContent
            this.#addLine(line);
        });
    }
    #getLastLine(){
        if(this.#startLine === null) 
            return null;
        let line = this.#startLine;
        while(line.next() !== null){
            line = line.next();
        }
        return line;
    }
    #addLine(line){
        let lastLine = this.#getLastLine();
        if(lastLine === null){
            line.index = 0;
            this.#startLine = line;
            return line;
        }
        line._setIndex(lastLine.index + 1);
        line._setPrevious(lastLine);
        lastLine._setNext(line);
        return line;
    }
}
class File{
    #content = null
    #path = null
    #lines = []
    constructor(){
        this.#symbol = new Symbol();
    }
    #syncContent(){
        // Set content based on lines content
        this.#content = this.#lines.reduce((prev,curr)=>`${prev}\n${curr.content}`);
    }
    async #save(path){
        this.#syncContent()
        promises.writeFile(path, content);
    }
    async open(path, raw = false){
        this.#path = path;
        this.#raw = raw;
        const data = await promises.readFile(path);
        this.#content = data.toString();
        // Jeżeli plik nie jest oznaczony jako raw ( nie do analizy ), potnij go na linie
        if(!raw){
            this.#linesManager = new LinesManager(this.#content)
        }
    }
    async save(){
        await this.#save(this.#path);
    }
    async saveAs(path){
        await this.#save(path);
    }

}
module.exports = { File, Line, LinesManager }