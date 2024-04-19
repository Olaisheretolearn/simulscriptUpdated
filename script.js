// app.js

console.log("Hello, Tailwind CSS!");

function cosineSimilarityFunc(tokens1, tokens2) {
    let count1 = {};
    tokens1.forEach(token => count1[token] = (count1[token] || 0) + 1);
    
    let count2 = {};
    tokens2.forEach(token => count2[token] = (count2[token] || 0) + 1);

    let dotProduct = 0;
    for (let token in count1) {
        if (count2[token]) {
            dotProduct += count1[token] * count2[token];
        }
    }

    const magnitude1 = Math.sqrt(Object.values(count1).reduce((acc, val) => acc + val * val, 0));
    const magnitude2 = Math.sqrt(Object.values(count2).reduce((acc, val) => acc + val * val, 0));
    
    return dotProduct / (magnitude1 * magnitude2);
}

function checkSimilarity() {
    const code1 = document.getElementById("code1").value;
    const code2 = document.getElementById("code2").value;

    const similarity = cosineSimilarityFunc(code1.split(/\W+/), code2.split(/\W+/));

    const resultDiv = document.getElementById("result");
    const progressBar = document.getElementById("progress");

    // Set the progress bar width based on similarity score
    progressBar.style.width = `${similarity * 100}%`;


    if (similarity > 0.9) {
        resultDiv.textContent = "The codes are very similar! 🚩";
        resultDiv.style.color = "red";
        progressBar.style.backgroundColor = "red";
    } else if (similarity > 0.7) {  
        resultDiv.textContent = `Fair Similarity: ${similarity.toFixed(2) * 100} %`;
        resultDiv.style.color = "gold";
        progressBar.style.backgroundColor = "gold";
    } else {
        resultDiv.textContent = `Low Similarity: ${similarity.toFixed(2) * 100} %`;
        resultDiv.style.color = "green";
        progressBar.style.backgroundColor = "green";
    }
}

