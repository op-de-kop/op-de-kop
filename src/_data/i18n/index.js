const nl = require("./nl");
const en = require("./en");

/*
A language file looks like this:

module.exports = {
    terms_and_conditions: "terms and conditions",
    question: "vraag"
};

We merge to create a datastructure like this:

{
    download_terms_and_conditions: {
        "nl-NL": "download lesvoorwaarden",
        "en-US": "download the terms and conditions",
    },
}
*/
const merge = languages => {
    const mergedWords = {};

    // We assume that translation files have the same words, and there's a default
    // fallback.
    // TODO: This can be done more nicely.
    Object.keys(languages[0]).forEach(word => {
        if (word == "language_code") return;

        const mergedWord = {};
        languages.forEach(lang => (mergedWord[lang.language_code] = lang[word]));
        mergedWords[word] = mergedWord;
    });
    // console.log("All i18n", mergedWords);
    return mergedWords;
};

module.exports = merge([nl, en]);