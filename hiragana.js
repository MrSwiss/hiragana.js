var ime = {
    enable: function(settings) {
        // Mapping provider
        var createMapper = function() {
            var keys = [];
            var values = [];
            this.map = function(key, value) {
                keys.push(key.toLowerCase());
                values.push(value);
            };
            this.match = function(value) {
                value = value.toLowerCase();
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i] == value)
                        return values[i];
                }
                return null;
            };
            return this;
        };

        var mapper = createMapper();
        var letters = "abcdefghijklmnopqrstuvwxyz";
        var consonants = "bcdfghjklmnpqrstvwxyz";
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
            var match = mapper.match(target.dataset.next);
            if (match != null) {
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

        var handlePaste = function(e) {
            var text = undefined;
            if (window.clipboardData && window.clipboardData.getData) { // IE
                text = window.clipboardData.getData('Text');
            }
            else if (e.clipboardData && e.clipboardData.getData) {
                text = e.clipboardData.getData('text/plain');
            }
            e.preventDefault();
            // Translate pasted text
            var working = '';
            for (var i = 0; i < text.length; i++) {
                if (text.charAt(i) == ' ') {
                    if (wideSpaces) {
                        insertAtCursor(e.target, '　');
                    }
                    else {
                        insertAtCursor(e.target, ' ');
                    }
                    working = '';
                }
                else {
                    working += text.charAt(i);
                    var match = mapper.match(working);
                    if (match != null) {
                        insertAtCursor(e.target, match);
                        working = '';
                    }
                }
            }
            if (working != '') {
                insertAtCursor(e.target, working);
            }
            return false;
        };
        
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
        mapper.map('a', 'あ');
        mapper.map('i', 'い');
        mapper.map('u', 'う');
        mapper.map('e', 'え');
        mapper.map('o', 'お');
        mapper.map('ka', 'か');
        mapper.map('ki', 'き');
        mapper.map('ku', 'く');
        mapper.map('ke', 'け');
        mapper.map('ko', 'こ');
        mapper.map('sa', 'さ');
        mapper.map('shi', 'し');
        mapper.map('su', 'す');
        mapper.map('se', 'せ');
        mapper.map('so', 'そ');
        mapper.map('ta', 'た');
        mapper.map('chi', 'ち');
        mapper.map('tsu', 'つ');
        mapper.map('te', 'て');
        mapper.map('to', 'と');
        mapper.map('na', 'な');
        mapper.map('ni', 'に');
        mapper.map('nu', 'ぬ');
        mapper.map('ne', 'ね');
        mapper.map('no', 'の');
        mapper.map('ha', 'は');
        mapper.map('hi', 'ひ');
        mapper.map('fu', 'ふ');
        mapper.map('he', 'へ');
        mapper.map('ho', 'ほ');
        mapper.map('ma', 'ま');
        mapper.map('mi', 'み');
        mapper.map('mu', 'む');
        mapper.map('me', 'め');
        mapper.map('mo', 'も');
        mapper.map('ya', 'や');
        mapper.map('yu', 'ゆ');
        mapper.map('yo', 'よ');
        mapper.map('ra', 'ら');
        mapper.map('ri', 'り');
        mapper.map('ru', 'る');
        mapper.map('re', 'れ');
        mapper.map('ro', 'ろ');
        mapper.map('wa', 'わ');
        mapper.map('wo', 'を');
        mapper.map('ga', 'が');
        mapper.map('gi', 'ぎ');
        mapper.map('gu', 'ぐ');
        mapper.map('ge', 'げ');
        mapper.map('go', 'ご');
        mapper.map('za', 'ざ');
        mapper.map('ji', 'じ');
        mapper.map('zu', 'ず');
        mapper.map('ze', 'ぜ');
        mapper.map('zo', 'ぞ');
        mapper.map('da', 'だ');
        mapper.map('de', 'で');
        mapper.map('do', 'ど');
        mapper.map('ba', 'ば');
        mapper.map('bi', 'び');
        mapper.map('bu', 'ぶ');
        mapper.map('be', 'べ');
        mapper.map('bo', 'ぼ');
        mapper.map('pa', 'ぱ');
        mapper.map('pi', 'ぴ');
        mapper.map('pu', 'ぷ');
        mapper.map('pe', 'ぺ');
        mapper.map('po', 'ぽ');
        mapper.map('hu', 'ふ');
        mapper.map('tu', 'つ');
        mapper.map('si', 'し');
        mapper.map('ti', 'ち');
        mapper.map('kya', 'きゃ');
        mapper.map('kyu', 'きゅ');
        mapper.map('kyo', 'きょ');
        mapper.map('sha', 'しゃ');
        mapper.map('shu', 'しゅ');
        mapper.map('sho', 'しょ');
        mapper.map('cha', 'ちゃ');
        mapper.map('chu', 'ちゅ');
        mapper.map('cho', 'ちょ');
        mapper.map('nya', 'にゃ');
        mapper.map('nyu', 'にゅ');
        mapper.map('nyo', 'にょ');
        mapper.map('hya', 'ひゃ');
        mapper.map('hyu', 'ひゅ');
        mapper.map('hyo', 'ひょ');
        mapper.map('mya', 'みゃ');
        mapper.map('myu', 'みゅ');
        mapper.map('myo', 'みょ');
        mapper.map('rya', 'りゃ');
        mapper.map('ryu', 'りゅ');
        mapper.map('ryo', 'りょ');
        mapper.map('gya', 'ぎゃ');
        mapper.map('gyu', 'ぎゅ');
        mapper.map('gyo', 'ぎょ');
        mapper.map('ja', 'じゃ');
        mapper.map('ju', 'じゅ');
        mapper.map('jo', 'じょ');
        mapper.map('bya', 'びゃ');
        mapper.map('byu', 'びゅ');
        mapper.map('byo', 'びょ');
        mapper.map('pya', 'ぴゃ');
        mapper.map('pyu', 'ぴゅ');
        mapper.map('pyo', 'ぴょ');
        mapper.map('xyu', 'っ');
        mapper.map('rr', 'っr');
        mapper.map('tt', 'っt');
        mapper.map('kk', 'っk');
        mapper.map('cc', 'っc');
        mapper.map('pp', 'っp');
        mapper.map('ss', 'っs');
        mapper.map('ww', 'っw');
        mapper.map('ss', 'っy');
        mapper.map('dd', 'っd');
        mapper.map('ff', 'っf');
        mapper.map('gg', 'っg');
        mapper.map('hh', 'っh');
        mapper.map('jj', 'っj');
        mapper.map('zz', 'っz');
        mapper.map('xx', 'っx');
        mapper.map('vv', 'っv');
        mapper.map('bb', 'っb');
        mapper.map('mm', 'っm');
        mapper.map('nn', 'ん');
        for (var i = 0; i < consonants.length; i++) {
            mapper.map('n' + consonants.charAt(i), 'ん' + consonants.charAt(i));
        }

        var elements = getAllElementsWithAttribute("data-ime");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].dataset.ime == 'hiragana')
                elements[i].addEventListener('keypress', handleInput, false);
                elements[i].addEventListener('keyup', handleKeyUp, false);
                elements[i].addEventListener('paste', handlePaste, false);
        }
    }
}
