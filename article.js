document.addEventListener("DOMContentLoaded", () => {
    // Get article ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const articleId = urlParams.get("id")
  
    // If no article ID is provided, redirect to home page
    if (articleId === null) {
      window.location.href = "index.html"
      return
    }
  
    // Mock articles data (replace with actual data source)
    const articles = {
      1: {
        title: "First Article",
        category: "Technology",
        date: "2024-01-01",
        body: "<p>This is the first article.</p>",
        readTime: "2 min read",
      },
      2: {
        title: "Second Article",
        category: "Science",
        date: "2024-01-05",
        body: "<p>This is the second article.</p>",
        readTime: "3 min read",
      },
    }
  
    // Get the article data
    const article = articles[articleId]
  
    // If article doesn't exist, show error message
    if (!article) {
      document.querySelector(".article-wrapper").innerHTML = `
              <div class="error-message">
                  <h1>Article Not Found</h1>
                  <p>Sorry, the article you're looking for doesn't exist.</p>
              </div>
          `
      return
    }
  
    // Update page title
    document.title = `${article.title} - Syntax & Synapses`
  
    // Render the article
    const articleWrapper = document.querySelector(".article-wrapper")
    articleWrapper.innerHTML = `
          <h1>${article.title}</h1>
          <div class="article-meta-view">
              <span class="category-tag">${article.category}</span>
              <span class="article-date">${article.date}</span>
              <span class="read-time">${article.readTime || calculateReadingTime(article.body)}</span>
          </div>
          <div class="article-content">
              ${article.body}
          </div>
      `
  
    // Set up back button
    document.getElementById("back-button").addEventListener("click", () => {
      window.location.href = "index.html"
    })
  
    // Set up reading progress bar
    setupReadingProgressBar()
  
    // Set up theme toggle
    setupThemeToggle()
  
    // Set up share buttons
    setupShareButtons(article.title)
  })
  
  // Function to calculate reading time
  function calculateReadingTime(text) {
    const wordsPerMinute = 200
    const wordCount = text.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime + " min read"
  }
  
  // Function to set up reading progress bar
  function setupReadingProgressBar() {
    const progressBar = document.getElementById("article-progress")
  
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      const scrollPercentRounded = Math.round(scrollPercent * 100)
  
      progressBar.style.width = scrollPercentRounded + "%"
    })
  }
  
  // Function to set up theme toggle
  function setupThemeToggle() {
    const themeToggleBtn = document.getElementById("theme-toggle-btn")
    const icon = themeToggleBtn.querySelector("i")
  
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.body.classList.add("dark-theme")
      icon.classList.remove("fa-moon")
      icon.classList.add("fa-sun")
    }
  
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")
  
      if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark")
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
      } else {
        localStorage.setItem("theme", "light")
        icon.classList.remove("fa-sun")
        icon.classList.add("fa-moon")
      }
    })
  }
  
  // Function to set up share buttons
  function setupShareButtons(title) {
    const twitterBtn = document.querySelector(".share-btn.twitter")
    const facebookBtn = document.querySelector(".share-btn.facebook")
    const linkedinBtn = document.querySelector(".share-btn.linkedin")
  
    const url = window.location.href
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
  
    twitterBtn.addEventListener("click", () => {
      window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, "_blank")
    })
  
    facebookBtn.addEventListener("click", () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")
    })
  
    linkedinBtn.addEventListener("click", () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank")
    })
  }
  