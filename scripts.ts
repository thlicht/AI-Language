//Begin knowledge base 
const GermanWords: Array<string> = ["das","ist","du","ich", "nicht","die","es","und","Sie","der","was","wir","zu","ein","in","sie","mir","mit","ja","wie","den","auf","mich","dass"];
const SpanWords: Array<string> = ["vez", "año", "tiempo", "dia", "cosa" ,"ser","haber", "estar","tener","hacer","su", "lo", "todo","más", "este", "ya","muy","también", "así", "sí", "que", "y","como","pero","o"];
const EngWords: Array<string> = ["the","be","to","of","and","a","in","that","have","I","it","for","not","on","with","he","as","you","do","at","this","but","his","by","from"];
const FrenWords: Array<string> = ["Le","De","Un","À","Être","Et","En","Avoir","Que","Pour","Dans","Ce","Il","Qui","Ne","Sur","Se","Pas","Plus","Pouvoir","Par","Je","Avec","Tout","Faire"];

interface LetterToFreq {
    [letter:string] : number;
}
        //below is the letter frequency for the supported languages
const GerFreq:LetterToFreq = { "a" : .0558, "b" : .0196, "c": .0316, "d" : .0498, "e":.1693, "f":.0149, "g":.0302, "h":.0498, "i":.0802 ,"j":.0024, "k":1.32, "l":.0360, "m":.0255,"n": .1053,"o": .0224,"p": .0067, "q": .0002, "r": .0689, "s": .0642, "t":.0579, "u": .0383, "v": .0084, "w":.0178, "x": .0005, "y": .0005, "z": .0121, "Ä" : .0054, "Ö" : .0030, "Ü": .0065, "ß" : .0037};
const EngFreq:LetterToFreq = { "a" : .0834, "b" : .0154, "c": .0273, "d" : .0414, "e":.1260, "f":.0203, "g":.0192, "h":.0611, "i":.0671 ,"j":0.0023, "k":0.0087, "l":.0424, "m":.0253,"n":.0680,"o":.0770,"p":.0166, "q":0.0009, "r":.0568, "s":.0611, "t":.0937, "u": .0285, "v": .0106, "w":2.34, "x":0.0020, "y":.0204, "z":.0006};
const FrenFreq:LetterToFreq = { "a" : .0813, "b" : .0093, "c": .0315, "d" : .0355, "e":.1510, "f":.0096, "g":.0097, "h":.0108, "i":.0694 ,"j":.0071, "k":.0016, "l":.0568, "m":.0323,"n":.0642,"o":.0527,"p":.0303, "q":.0089, "r":.0643, "s":.0791, "t":.0711, "u":.0605, "v":.0183, "w":.0004, "x":.0042, "y":.0019, "z":.0021, "Œ":.0001, "À":.0054, "Â":.0003, "Ê":0.0024, "Ë":0.0001, "Î":0.0003, "Ô":0.0007, "Ù":0.0002, "Û":0.0005, "Ü":.0002};
const SpanFreq:LetterToFreq = { "a" : .1172, "b" : .0149, "c": .0387, "d" : .0467, "e":.1372, "f":.0069, "g":.01, "h":.0118, "i":.0528 ,"j":.0052, "k":.0011, "l":.0524, "m":.0308,"n":.0683,"o":.0844,"p":.0289, "q":.0111, "r":.0641, "s":.0720, "t":.0460, "u":.0455, "v":.0105, "w":.0004, "x":.0014, "y":.0109, "z":.0047, "Á":0.0044, "É":0.0036, "Í":0.0070, "Ñ":0.0017, "Ó":0.0076, "Ú":0.0012, "Ü":0.0002};
//end knowledge base

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
    LanguageProbs : LetterToFreq;

    constructor(){
        this.position = 0;
        this.word = "";
        this.LanguageProbs = { "German": 0, "English" : 0, "French" : 0, "Spanish" : 0};
    }

    heuristic(word: string){
        word = word.toLocaleLowerCase();
        word = word.trim();
        for (let i = 0; i < word.length; i++)
        {
            this.LanguageProbs["German"] += GerFreq[word[i]];
            this.LanguageProbs["English"] += EngFreq[word[i]];
            this.LanguageProbs["Spanish"] += SpanFreq[word[i]];
            this.LanguageProbs["French"] += FrenFreq[word[i]];
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
            else if(e)
            {
                alert("English");
                return;
            }
            else if(s)
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

