# TranslationDisablerForEbay
Google Chrome extension that disables automatic machine translation in eBay France, Italy and Spain sites, and shows the original titles for items.

## How to install

Install it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/translation-disabler-for/nblmoonpiilkcfcckhhdaijolankohkj)!

## How it works

When an eBay France, Italy or Spain page loads (or its content changes via Ajax), the extension searches for translated content and replaces it with the original data (which is available in a custom attribute in the DOM). This is done via JavaScript manipulations.

It has been tested in the following pages:
* Search results (grid and list types)
* Item detail
* Watch lists

Translations may still be displayed in other places where the item title is shown. I didn't check any other pages because these are the only ones I use. Feel free to check it and report issues if needed.

## Disclaimers

* If the eBay page format changes, the extension may stop working.
* No warranties, if any page breaks just uninstall the extension :D (and report it, please!)
* This extension has nothing to do with the eBay company or its affiliates.
* This extension will not make you toast for breakfast :)

## Contributing & license

Any contribution in order to make this extension better will be welcome!

The code is licensed under the [Apache License 2.0](https://github.com/Ereza/TranslationDisablerForEbay/blob/master/LICENSE).
