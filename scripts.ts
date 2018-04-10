const GermanWords: Array<string> = ["das","ist","du","ich", "nicht","die","es","und","Sie","der","was","wir","zu","ein","in","sie","mir","mit","ja","wie","den","auf","mich","dass"];
const SpanWords: Array<string> = ["vez", "año", "tiempo", "dia", "cosa" ,"ser","haber", "estar","tener","hacer","su", "lo", "todo","más", "este", "ya","muy","también", "así", "sí", "que", "y","como","pero","o"];
const EngWords: Array<string> = ["the","be","to","of","and","a","in","that","have","I","it","for","not","on","with","he","as","you","do","at","this","but","his","by","from"];
const FrenWords: Array<string> = ["Le","De","Un","À","Être","Et","En","Avoir","Que","Pour","Dans","Ce","Il","Qui","Ne","Sur","Se","Pas","Plus","Pouvoir","Par","Je","Avec","Tout","Faire"];

interface LetterToFreq {
    [letter:string] : number;
}

const GerFreq:LetterToFreq = { "a" : 5.58, "b" : 1.96, "c": 3.16, "d" : 4.98, "e":16.93, "f":1.49, "g":3.02, "h":4.98, "i":8.02 ,"j":0.24, "k":1.32, "l":3.60, "m":2.55,"n":10.53,"o":2.24,"p": 0.67, "q": .02, "r": 6.89, "s":6.42, "t":5.79, "u":3.83, "v": .84, "w":1.78, "x": .05, "y": .05, "z": 1.21, "Ä" : 0.54, "Ö" : .30, "Ü": .65, "ß" : .37};
const EngFreq:LetterToFreq = { "a" : 8.34, "b" : 1.54, "c": 2.73, "d" : 4.14, "e":12.60, "f":2.03, "g":1.92, "h":6.11, "i":6.71 ,"j":0.23, "k":0.87, "l":4.24, "m":2.53,"n":6.80,"o":7.70,"p":1.66, "q":0.09, "r":5.68, "s":6.11, "t":9.37, "u":2.85, "v":1.06, "w":2.34, "x":0.20, "y":2.04, "z":0.06};
const FrenFreq:LetterToFreq = { "a" : 8.13, "b" : .93, "c": 3.15, "d" : 3.55, "e":15.10, "f":.96, "g":.97, "h":1.08, "i":6.94 ,"j":.71, "k":.16, "l":5.68, "m":3.23,"n":6.42,"o":5.27,"p":3.03, "q":.89, "r":6.43, "s":7.91, "t":7.11, "u":6.05, "v":1.83, "w":.04, "x":.42, "y":.19, "z":.21, "Œ":.01, "À":.54, "Â":.03, "Ê":0.24, "Ë":0.01, "Î":0.03, "Ô":0.07, "Ù":0.02, "Û":0.05, "Ü":.02};
const SpanFreq:LetterToFreq = { "a" : 11.72, "b" : 1.49, "c": 3.87, "d" : 4.67, "e":13.72, "f":.69, "g":1, "h":1.18, "i":5.28 ,"j":.52, "k":.11, "l":5.24, "m":3.08,"n":6.83,"o":8.44,"p":2.89, "q":1.11, "r":6.41, "s":7.20, "t":4.60, "u":4.55, "v":1.05, "w":.04, "x":.14, "y":1.09, "z":.47, "Á":0.44, "É":0.36, "Í":0.70, "Ñ":0.17, "Ó":0.76, "Ú":0.12, "Ü":0.02};


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

