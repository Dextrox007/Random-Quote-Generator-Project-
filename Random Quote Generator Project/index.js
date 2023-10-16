class RandomQuoteGenerator {
  constructor() {
    this.quoteText = document.querySelector(".quote");
    this.authorName = document.querySelector(".author .name");
    this.quoteBtn = document.querySelector(".banother");
    this.soundBtn = document.querySelector(".sound");
    this.copyBtn = document.querySelector(".copy");
    this.twitterBtn = document.querySelector(".twitter");
    this.searchBtn = document.querySelector(".bsearch");
    this.wrapper = document.querySelector('.wrapper');
    this.printBtn = document.querySelector(".printScrn");
    this.downloadBtn = document.querySelector(".download");
    this.downloadBtn.addEventListener("click", this.downloadContent.bind(this));

    window.onload = () => {
      document.querySelector("#preloader").classList.add("hide-preloader");
    };

    this.quoteBtn.addEventListener("click", this.randomQuote.bind(this));
    this.soundBtn.addEventListener("click", this.toggleSpeechSynthesis.bind(this));
    this.copyBtn.addEventListener("click", this.copyQuote.bind(this));
    this.twitterBtn.addEventListener("click", this.shareOnTwitter.bind(this));
    this.printBtn.addEventListener("click", this.printContent.bind(this));
  }

  randomQuote() {
    this.quoteBtn.classList.add("loading");
    this.quoteBtn.innerText = "Loading Quote...";
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((result) => {
        this.quoteText.innerText = result.content;
        this.authorName.innerText = result.author;
        this.quoteBtn.innerText = "Another One";
        this.quoteBtn.classList.remove("loading");
      })
      .finally(() => {
        if (localStorage.getItem("lastShownQuote")) {
          let lastQuote = JSON.parse(localStorage.getItem("lastShownQuote"));
          this.quoteText.innerText = lastQuote.content;
          this.authorName.innerText = lastQuote.author;
        }
      });
  }

  toggleSpeechSynthesis() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    } else {
      const utterance = new SpeechSynthesisUtterance(
        `${this.quoteText.innerText} by ${this.authorName.innerText}`
      );
      speechSynthesis.speak(utterance);
    }
  }

  downloadContent() {
    const wrapper = document.querySelector('.wrapper');
    const fileName = "quote-generator.png"; // You can change the file name if needed

    html2canvas(wrapper, { scale: 2 }).then((canvas) => {
      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  copyQuote() {
    const quote = this.quoteText.innerText;
    navigator.clipboard.writeText(quote).then(() => {
      const prompt = document.createElement("div");
      prompt.classList.add("copy-prompt");
      prompt.textContent = "Quote copied!";
      document.body.appendChild(prompt);
      setTimeout(() => {
        prompt.remove();
      }, 2000);
    });
  }
  
  shareOnTwitter() {
    let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.quoteText.innerText + " by " + this.authorName.innerText)}`;
    window.open(tweetUrl, "_blank");
  }

  printContent() {
    window.print();
  }
}

// Create an instance of the RandomQuoteGenerator class
const quoteGenerator = new RandomQuoteGenerator();
