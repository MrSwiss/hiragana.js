# Hiragana.js

This is a simple Javascript library that provides an IME for text boxes on your websites.

[Live Demo](http://sircmpwn.github.io/hiragana.js)

## Usage

Using hiragana.js is simple:

1. Add `data-ime="hiragana"` to any element you want the IME to be enabled on.
2. Run `ime.enable()` from Javascript after the DOM is loaded.

Make sure that you set your character encoding problem on your page! Add this as the first
thing in your `<head>`:

    <meta charset="UTF-8" />

**Before**

    <input type="text" />
    <textarea></textarea>

**After**

    <input type="text" data-ime="hiragana" />
    <textarea data-ime="hiragana"></textarea>
    <script type="text/javascript">ime.enable();</script>

Hiragana.js has no dependencies, and should be able to easily integrate into your website.

## Contributing

I'm pretty new to Japanese, so it's possible that I haven't quite got this right. Please, feel
free to submit your suggestions. I'd also like to eventually support katakana and kanji, but
I do not have the requisite knowledge. Support for additional languages may also be desirable.

To contribute, fork the repository and submit your changes as pull requests. Make sure you update
`hirigana.min.js` with your changes, and stick to the existing coding style.
