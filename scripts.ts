const GermanWords: Array<string> = [];
const SpanWords: Array<string> = [];
const EngWords: Array<string> = [];
const FrenWords: Array<string> = [];

let compareWords = (wordstoCompare: Array<string>, word: string):boolean => {
    
    for (let i = 0;i < 25; i++)
    {
        if (word == wordstoCompare[i])
        {
            return true;
        }
    }

    return false;
}

class InputTracker {
    position: number;
    word: string;

    constructor(){
        this.position = 0;
        this.word = "";
    }
    //attempt to make a determination of for the language of the paragraph
    process(text: string, key: number):void {
        this.word = text.substring(this.position);
        if(key == 32)
        {
            this.position = text.length;
            //from here process the word to see if it's language can be found
            let g = compareWords(GermanWords, this.word);
            let f = compareWords(FrenWords, this.word);
            let e = compareWords(EngWords, this.word);
            let s = compareWords(SpanWords, this.word);

            if(g)
            {
                alert("German");
                return;
            }
            else if(f)
            {
                alert("French");
                return;
            }
            else if (e)
            {
                alert("English");
                return;
            }
            else if (s)
            {
                alert("Spanish");
                return;
            }
        }
        else{
            return;
        }
    }
}

let tracker = null;
window.onload = ()=>{
    let box = document.getElementById("text");
    box.onkeyup = (event)=>{ //loadup changes in the textarea to trigger determinations
        let key = event.keyCode;
        checkInput(key);
    }
    //instantiate the tracker object
    tracker = new InputTracker();
}

function checkInput(code:number){
    let textBox = <HTMLInputElement>document.getElementById("text");
    tracker.process(textBox.value, code);
}

