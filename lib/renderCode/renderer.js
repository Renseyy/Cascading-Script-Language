const motive = require('./consoleMotive')
module.exports = class Renderer{
    render(lines){
        for(const line of lines){
            let text = '';
            text+= `${this.#color(null,'ROW_NUM')}${this.#alignRight(line.number + 1, 1)} ${this.#color(null,'RESET')}`
            for(const struct of line.structure){
                text+= `${this.#color(struct.type)}${struct.value}`
            }
            text+= `${this.#color(null, 'RESET')}`;
            console.log(text)
        }
    }
    #color(name, specialName = null){
        return `${motive.ESC_START}${(name?motive.COLORS[name] || '0' : motive[specialName] || '0')}${motive.ESC_END}`;
    }
    #alignRight(text, space){
        text+=''
        let end = ''; 
        for(let i = 0; i<space - text.length; i++){
            end+= ' ';
        }
        end+= text
        return end
    }
}