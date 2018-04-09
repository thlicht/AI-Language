const GermanWords: Array<string> = ["das","ist","du","ich", "nicht","die","es","und","Sie","der","was","wir","zu","ein","in","sie","mir","mit","ja","wie","den","auf","mich","dass"];
const SpanWords: Array<string> = ["vez", "año", "tiempo", "dia", "cosa" ,"ser","haber", "estar","tener","hacer","su", "lo", "todo","más", "este", "ya","muy","también", "así", "sí", "que", "y","como","pero","o"];
const EngWords: Array<string> = ["the","be","to","of","and","a","in","that","have","I","it","for","not","on","with","he","as","you","do","at","this","but","his","by","from"];
const FrenWords: Array<string> = ["Le","De","Un","À","Être","Et","En","Avoir","Que","Pour","Dans","Ce","Il","Qui","Ne","Sur","Se","Pas","Plus","Pouvoir","Par","Je","Avec","Tout","Faire"];

interface LetterToFreq {
    [letter:string] : number;
}

const GerFreq:LetterToFreq = { "a" : 1, "b" : 2, "c": 3, "d" : 4, "e":5, "f":6, "g":7, "h":8, "i":9 ,"j":10, "k":11, "l":12, "m":13,"n":14,"o":15,"p":16, "q":17, "r":18, "s":19, "t":20, "u":21, "v":22, "w":23, "x":24, "y":25, "z":26};
const EngFreq:LetterToFreq = { "a" : 1, "b" : 2, "c": 3, "d" : 4, "e":5, "f":6, "g":7, "h":8, "i":9 ,"j":10, "k":11, "l":12, "m":13,"n":14,"o":15,"p":16, "q":17, "r":18, "s":19, "t":20, "u":21, "v":22, "w":23, "x":24, "y":25, "z":26};
const FrenFreq:LetterToFreq = { "a" : 1, "b" : 2, "c": 3, "d" : 4, "e":5, "f":6, "g":7, "h":8, "i":9 ,"j":10, "k":11, "l":12, "m":13,"n":14,"o":15,"p":16, "q":17, "r":18, "s":19, "t":20, "u":21, "v":22, "w":23, "x":24, "y":25, "z":26};
const SpanFreq:LetterToFreq = { "a" : 1, "b" : 2, "c": 3, "d" : 4, "e":5, "f":6, "g":7, "h":8, "i":9 ,"j":10, "k":11, "l":12, "m":13,"n":14,"o":15,"p":16, "q":17, "r":18, "s":19, "t":20, "u":21, "v":22, "w":23, "x":24, "y":25, "z":26};


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

    heuristic(word: string){
        let GerPercent = 0;
        let EngPercent = 0;
        let SpanPercent = 0;
        let FrenPrecent = 0;
        word = word.toLocaleLowerCase();
        for (let i = 0; i < word.length; i++)
        {
            if (i == 0)
            {
                alert(GerFreq["c"]);
            }    
        }
    }

    //attempt to make a determination of for the language of the paragraph
    process(text: string, key: number):void {
        this.word = text.substring(this.position,text.length-1);
        if(key == 32)
        {
            this.position = text.length;
            //from here process the word to see if it's language can be found
            let g = compareWords(GermanWords, this.word);
            let f = compareWords(FrenWords, this.word);
            let e = compareWords(EngWords, this.word);
            let s = compareWords(SpanWords, this.word);
            this.heuristic(text);


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

