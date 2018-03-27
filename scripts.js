var InputTracker = /** @class */ (function () {
    function InputTracker() {
        this.position = 0;
        this.word = "";
    }
    //attempt to make a determination of for the language of the paragraph
    InputTracker.prototype.process = function (text, key) {
        this.word = text.substring(this.position);
        if (key == 32) {
            this.position = text.length;
            prompt(this.word);
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
