function generateSentenceElement(sentence) {
    const sentenceElement = document.createElement("span");

    const regex = /<b>(.*?)<\/b>/g; // Regex to match content within <b> tags
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(sentence)) !== null) {
        const before = sentence.substring(lastIndex, match.index);
        const boldContent = match[1]; // Content within <b> tags

        if (before) {
            const span = document.createElement("span");
            span.textContent = before;
            sentenceElement.appendChild(span);
        }

        const boldSpan = document.createElement("span");
        boldSpan.textContent = boldContent;
        boldSpan.classList.add("special-word"); // Add a class for the special word's style
        sentenceElement.appendChild(boldSpan);

        lastIndex = regex.lastIndex;
    }

    const after = sentence.substring(lastIndex);
    if (after) {
        const span = document.createElement("span");
        span.textContent = after;
        sentenceElement.appendChild(span);
    }
    sentenceElement.classList.add("value"); // Add a class for styling if needed

    return sentenceElement;

}
document.addEventListener("DOMContentLoaded", function () {
    const wordList = document.getElementById("word-list");

    // Fetch words from the text file
    fetch("/data/words.txt")
        .then(response => response.text())
        .then(text => {
            const lines = text.split("\n");

            // Display words in the list
            lines.forEach((line,index) => {
                // Splitting the line into word and sentence using regex and split()
                // march "ABC/DEF:GHI";
                const match = line.match(/^(?:([^\/]+)\/)?([^:]+):([^:]+)/);
                if (!match) {
                    return;
                }
                const [, translation, word, sentence] = match;

                const pairContainer = document.createElement("div");
                pairContainer.classList.add("pair-container"); // Add a class for styling if needed

                const idElement = document.createElement("span");
                idElement.textContent = `${index + 1}.`;
                idElement.classList.add("id"); // Add a class for styling if needed

                const translationElement = document.createElement("span");
                translationElement.textContent = translation;
                translationElement.classList.add("translation"); // Add a class for styling if needed

                const wordElement = document.createElement("span");
                wordElement.textContent = word.trim();
                wordElement.classList.add("key"); // Add a class for styling if needed
                if(!word.trim().includes(" ")) {
                    console.log(word.trim());
                }
                const sentenceElement = generateSentenceElement(sentence);
                pairContainer.appendChild(idElement);
                pairContainer.appendChild(wordElement);
                pairContainer.appendChild(translationElement);
                pairContainer.appendChild(sentenceElement);
                wordList.appendChild(pairContainer);
            });
        })
        .catch(error => {
            console.log("Error fetching the file:", error);
        });
});
