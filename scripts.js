var GermanWords = ["das", "ist", "du", "ich", "nicht", "die", "es", "und", "Sie", "der", "was", "wir", "zu", "ein", "in", "sie", "mir", "mit", "ja", "wie", "den", "auf", "mich", "dass"];
var SpanWords = ["vez", "año", "tiempo", "dia", "cosa", "ser", "haber", "estar", "tener", "hacer", "su", "lo", "todo", "más", "este", "ya", "muy", "también", "así", "sí", "que", "y", "como", "pero", "o"];
var EngWords = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from"];
var FrenWords = ["Le", "De", "Un", "À", "Être", "Et", "En", "Avoir", "Que", "Pour", "Dans", "Ce", "Il", "Qui", "Ne", "Sur", "Se", "Pas", "Plus", "Pouvoir", "Par", "Je", "Avec", "Tout", "Faire"];
var compareWords = function (wordstoCompare, word) {
    for (var i = 0; i < 25; i++) {
        if (word == wordstoCompare[i]) {
            return true;
        }
    }
    return false;
};
var InputTracker = /** @class */ (function () {
    function InputTracker() {
        this.position = 0;
        this.word = "";
    }
    //attempt to make a determination of for the language of the paragraph
    InputTracker.prototype.process = function (text, key) {
        this.word = text.substring(this.position, text.length - 1);
        if (key == 32) {
            this.position = text.length;
            //from here process the word to see if it's language can be found
            var g = compareWords(GermanWords, this.word);
            var f = compareWords(FrenWords, this.word);
            var e = compareWords(EngWords, this.word);
            var s = compareWords(SpanWords, this.word);
            if (g) {
                alert("German");
                return;
            }
            else if (f) {
                alert("French");
                return;
            }
            else if (e) {
                alert("English");
                return;
            }
            else if (s) {
                alert("Spanish");
                return;
            }
        }
        else {
            return;
        }
    };
    return InputTracker;
}());
var tracker = null;
window.onload = function () {
    var box = document.getElementById("text");
    box.onkeyup = function (event) {
        var key = event.keyCode;
        checkInput(key);
    };
    //instantiate the tracker object
    tracker = new InputTracker();
};
function checkInput(code) {
    var textBox = document.getElementById("text");
    tracker.process(textBox.value, code);
}
