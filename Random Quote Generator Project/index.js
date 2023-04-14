const quoteText = document.querySelector(".quote"),
  authorName = document.querySelector(".author .name"),
  quoteBtn = document.querySelector(".banother"),
  soundBtn = document.querySelector(".sound"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  searchBtn = document.querySelector(".bsearch"),
  wrapper = document.querySelector('.wrapper'),
  printBtn = document.querySelector(".printScrn");

window.onload = function () {
  document.querySelector("#preloader").classList.add("hide-preloader");
};

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.innerText = "Another One";
      quoteBtn.classList.remove("loading");
    })
    .finally(() => {
      if (localStorage.getItem("lastShownQuote")) {
        let lastQuote = JSON.parse(localStorage.getItem("lastShownQuote"));
        quoteText.innerText = lastQuote.content;
        authorName.innerText = lastQuote.author;
      }
    });
}

soundBtn.addEventListener("click", () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  } else {
    const utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    // utterance.pitch = 1.5; // Change the pitch to make the voice sound lower
    // utterance.rate = 1.5; // Change the rate to make the voice speak slower
    speechSynthesis.speak(utterance);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, "_blank");
});

printBtn.addEventListener("click", () => {
  window.print();
});

function download() {
  // Create a canvas element with the same size as the wrapper
  const canvas = document.createElement('canvas');
  canvas.width = wrapper.offsetWidth;
  canvas.height = wrapper.offsetHeight;

  // Get the canvas context and draw the wrapper content onto the canvas
  const context = canvas.getContext('2d');
  context.drawImage(wrapper, 0, 0);

  // Convert the canvas to a data URL
  const dataURL = canvas.toDataURL();

  // Create a temporary link element and set its href to the data URL
  const link = document.createElement('a');
  link.href = dataURL;

  // Set the download attribute and filename of the link
  link.download = 'wrapper.png';

  // Add the link to the document and trigger a click event to start the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

quoteBtn.addEventListener("click", randomQuote);
