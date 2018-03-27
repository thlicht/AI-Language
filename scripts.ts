class InputTracker {
    position: number;
    word: string;

    constructor(){
        this.position = 0;
        this.word = "";
    }
    //attempt to make a determination of for the language of the paragraph
    process(text: string, key: number) {
        this.word = text.substring(this.position);
        if(key == 32)
        {
            this.position = text.length;
            //from here process the word to see if it's language can be found
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

