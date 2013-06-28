var ime = {
    enable: function(settings) {
        var hiragana = {};
        var letters = "abcdefghijklmnopqrstuvwxyz";
        var vowels = "aiueo";
        var wideSpaces = true;
        if (typeof settings != 'undefined') {
            if (settings.wideSpaces === false) {
                wideSpaces = settings.wideSpaces;
            }
        }

        var handleKeyUp = function(e) {
            var target = e.target;
            if (e.keyCode == 8) { // Backspace
                if (typeof target.dataset.next == 'undefined' || e.target.selectionStart != e.target.selectionEnd) {
                    target.dataset.next = '';
                }
                else if (target.dataset.next != '') {
                    target.dataset.next = target.dataset.next.substring(0, target.dataset.next.length - 1);
                }
            }
            if (e.keyCode == 46) { // Delete
                target.dataset.next = '';
            }
        }

        var removeBeforeCursor = function(e, v) {
            // TODO: IE Support
            var start = e.selectionStart;
            var end = e.selectionEnd;
            e.value = e.value.substring(0, start - (v.length - 1)) + e.value.substring(end, e.value.length);
            e.selectionStart = start - v.length + 1;
            e.selectionEnd = e.selectionStart;
        }

        var insertAtCursor = function(e, v) {
            // TODO: IE Support
            var start = e.selectionStart;
            var end = e.selectionEnd;
            e.value = e.value.substring(0, start) + v + e.value.substring(end, e.value.length);
            e.selectionStart = start + v.length;
            e.selectionEnd = e.selectionStart;
        }

        var handleInput = function(e) {
            var target = e.target;
            if (target.selectionStart != target.selectionEnd) {
                return;
            }
            var character = String.fromCharCode(e.charCode);
            if (typeof target.dataset.next == 'undefined') {
                target.dataset.next = '';
            }
            if (wideSpaces && character == ' ') {
                e.preventDefault();
                insertAtCursor(target, '　'); // wide space
                target.dataset.next = '';
                return;
            }
            if (letters.indexOf(character.toLowerCase()) == -1) {
                target.dataset.next = '';
                return;
            }
            target.dataset.next += character;
            var match = hiragana[target.dataset.next];
            if (typeof match != 'undefined') {
                e.preventDefault();
                removeBeforeCursor(target, target.dataset.next);
                insertAtCursor(target, match);
                if (letters.indexOf(match.charAt(match.length - 1)) != -1) {
                    // Geminite consonant
                    target.dataset.next = match.charAt(match.length - 1);
                }
                else {
                    target.dataset.next = '';
                }
            }
        }
        
        var getAllElementsWithAttribute = function(attribute) {
          var matchingElements = [];
          var allElements = document.getElementsByTagName('*');
          for (var i = 0; i < allElements.length; i++) {
            if (allElements[i].getAttribute(attribute)) {
              matchingElements.push(allElements[i]);
            }
          }
          return matchingElements;
        }

        // Map characters
        hiragana["a"] = "あ";
        hiragana["i"] = "い";
        hiragana["u"] = "う";
        hiragana["e"] = "え";
        hiragana["o"] = "お";
        hiragana["ka"] = "か";
        hiragana["ki"] = "き";
        hiragana["ku"] = "く";
        hiragana["ke"] = "け";
        hiragana["ko"] = "こ";
        hiragana["sa"] = "さ";
        hiragana["shi"] = "し";
        hiragana["su"] = "す";
        hiragana["se"] = "せ";
        hiragana["so"] = "そ";
        hiragana["ta"] = "た";
        hiragana["chi"] = "ち";
        hiragana["tsu"] = "つ";
        hiragana["te"] = "て";
        hiragana["to"] = "と";
        hiragana["na"] = "な";
        hiragana["ni"] = "に";
        hiragana["nu"] = "ぬ";
        hiragana["ne"] = "ね";
        hiragana["no"] = "の";
        hiragana["ha"] = "は";
        hiragana["hi"] = "ひ";
        hiragana["fu"] = "ふ";
        hiragana["he"] = "へ";
        hiragana["ho"] = "ほ";
        hiragana["ma"] = "ま";
        hiragana["mi"] = "み";
        hiragana["mu"] = "む";
        hiragana["me"] = "め";
        hiragana["mo"] = "も";
        hiragana["ya"] = "や";
        hiragana["yu"] = "ゆ";
        hiragana["yo"] = "よ";
        hiragana["ra"] = "ら";
        hiragana["ri"] = "り";
        hiragana["ru"] = "る";
        hiragana["re"] = "れ";
        hiragana["ro"] = "ろ";
        hiragana["wa"] = "わ";
        hiragana["wo"] = "を";
        hiragana["ga"] = "が";
        hiragana["gi"] = "ぎ";
        hiragana["gu"] = "ぐ";
        hiragana["ge"] = "げ";
        hiragana["go"] = "ご";
        hiragana["za"] = "ざ";
        hiragana["ji"] = "じ";
        hiragana["zu"] = "ず";
        hiragana["ze"] = "ぜ";
        hiragana["zo"] = "ぞ";
        hiragana["da"] = "だ";
        hiragana["de"] = "で";
        hiragana["do"] = "ど";
        hiragana["ba"] = "ば";
        hiragana["bi"] = "び";
        hiragana["bu"] = "ぶ";
        hiragana["be"] = "べ";
        hiragana["bo"] = "ぼ";
        hiragana["pa"] = "ぱ";
        hiragana["pi"] = "ぴ";
        hiragana["pu"] = "ぷ";
        hiragana["pe"] = "ぺ";
        hiragana["po"] = "ぽ";
        hiragana["hu"] = "ふ";
        hiragana["tu"] = "つ";
        hiragana["si"] = "し";
        hiragana["ti"] = "ち";
        hiragana["kya"] = "きゃ";
        hiragana["kyu"] = "きゅ";
        hiragana["kyo"] = "きょ";
        hiragana["sha"] = "しゃ";
        hiragana["shu"] = "しゅ";
        hiragana["sho"] = "しょ";
        hiragana["cha"] = "ちゃ";
        hiragana["chu"] = "ちゅ";
        hiragana["cho"] = "ちょ";
        hiragana["nya"] = "にゃ";
        hiragana["nyu"] = "にゅ";
        hiragana["nyo"] = "にょ";
        hiragana["hya"] = "ひゃ";
        hiragana["hyu"] = "ひゅ";
        hiragana["hyo"] = "ひょ";
        hiragana["mya"] = "みゃ";
        hiragana["myu"] = "みゅ";
        hiragana["myo"] = "みょ";
        hiragana["rya"] = "りゃ";
        hiragana["ryu"] = "りゅ";
        hiragana["ryo"] = "りょ";
        hiragana["gya"] = "ぎゃ";
        hiragana["gyu"] = "ぎゅ";
        hiragana["gyo"] = "ぎょ";
        hiragana["ja"] = "じゃ";
        hiragana["ju"] = "じゅ";
        hiragana["jo"] = "じょ";
        hiragana["bya"] = "びゃ";
        hiragana["byu"] = "びゅ";
        hiragana["byo"] = "びょ";
        hiragana["pya"] = "ぴゃ";
        hiragana["pyu"] = "ぴゅ";
        hiragana["pyo"] = "ぴょ";
        hiragana["xyu"] = "っ";
        hiragana["nn"] = "ん";
        hiragana["rr"] = "っr";
        hiragana["tt"] = "っt";
        hiragana["kk"] = "っk";
        hiragana["cc"] = "っc";
        hiragana["pp"] = "っp";
        hiragana["ss"] = "っs";
        hiragana["ww"] = "っw";
        hiragana["ss"] = "っy";
        hiragana["dd"] = "っd";
        hiragana["ff"] = "っf";
        hiragana["gg"] = "っg";
        hiragana["hh"] = "っh";
        hiragana["jj"] = "っj";
        hiragana["zz"] = "っz";
        hiragana["xx"] = "っx";
        hiragana["vv"] = "っv";
        hiragana["bb"] = "っb";
        hiragana["mm"] = "っm";

        var elements = getAllElementsWithAttribute("data-ime");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].dataset.ime == 'hiragana')
                elements[i].addEventListener('keypress', handleInput, false);
                elements[i].addEventListener('keyup', handleKeyUp, false);
        }
    }
    
}
