// All Interactive Features
class BlogInteractive {
    constructor() {
        this.initReadingTime();
        this.initShareButtons();
        this.initLikeSystem();
        this.initSearch();
        this.initTableOfContents();
    }

    // Reading Time Calculator
    initReadingTime() {
        const articles = document.querySelectorAll('.blog-post, .single-post');
        articles.forEach(article => {
            const text = article.textContent;
            const words = text.trim().split(/\s+/).length;
            const time = Math.ceil(words / 200);
            
            const timeElement = document.createElement('span');
            timeElement.className = 'reading-time';
            timeElement.innerHTML = `<i class="far fa-clock"></i> ${time} min read`;
            
            const metaSection = article.querySelector('.post-meta');
            if (metaSection) metaSection.appendChild(timeElement);
        });
    }

    // Share System
    initShareButtons() {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'share-buttons';
        shareContainer.innerHTML = `
            <button onclick="BlogInteractive.shareOn('twitter')" class="share-btn twitter">
                <i class="fab fa-twitter"></i>
            </button>
            <button onclick="BlogInteractive.shareOn('facebook')" class="share-btn facebook">
                <i class="fab fa-facebook"></i>
            </button>
            <button onclick="BlogInteractive.copyLink()" class="share-btn copy">
                <i class="far fa-copy"></i>
            </button>
        `;

        document.querySelectorAll('.blog-post, .single-post').forEach(post => {
            post.appendChild(shareContainer.cloneNode(true));
        });
    }

    // Like System
    initLikeSystem() {
        document.querySelectorAll('.blog-post, .single-post').forEach(post => {
            const likeBtn = document.createElement('button');
            likeBtn.className = 'like-btn';
            likeBtn.innerHTML = `
                <i class="far fa-heart"></i>
                <span class="like-count">0</span>
            `;

            likeBtn.addEventListener('click', this.handleLike.bind(this));
            post.appendChild(likeBtn);
        });
    }

    // Search System
    initSearch() {
        const searchBar = document.createElement('div');
        searchBar.className = 'blog-search';
        searchBar.innerHTML = `
            <input type="text" placeholder="Search posts...">
            <i class="fas fa-search"></i>
        `;

        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            blogGrid.insertBefore(searchBar, blogGrid.firstChild);
            searchBar.querySelector('input').addEventListener('input', this.handleSearch.bind(this));
        }
    }

    // Table of Contents
    initTableOfContents() {
        const article = document.querySelector('.single-post');
        if (!article) return;

        const headings = article.querySelectorAll('h2, h3');
        const toc = document.createElement('div');
        toc.className = 'table-of-contents';
        toc.innerHTML = '<h3>Contents</h3><ul></ul>';

        headings.forEach((heading, index) => {
            const id = `section-${index}`;
            heading.id = id;
            const li = document.createElement('li');
            li.innerHTML = `<a href="#${id}">${heading.textContent}</a>`;
            toc.querySelector('ul').appendChild(li);
        });

        article.insertBefore(toc, article.querySelector('.article-body'));
    }

    // Event Handlers
    handleLike(e) {
        const btn = e.currentTarget;
        const count = btn.querySelector('.like-count');
        let likes = parseInt(count.textContent);
        
        btn.classList.toggle('liked');
        count.textContent = btn.classList.contains('liked') ? likes + 1 : likes - 1;
        
        // Add heart animation
        this.createHeartAnimation(btn);
    }

    handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.blog-post').forEach(post => {
            const text = post.textContent.toLowerCase();
            post.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    }

    // Utility Functions
    static shareOn(platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        const urls = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
        };

        window.open(urls[platform], '_blank', 'width=600,height=400');
    }

    static copyLink() {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                const copyBtn = document.querySelector('.share-btn.copy');
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="far fa-copy"></i>';
                }, 2000);
            });
    }

    createHeartAnimation(btn) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart heart-animation';
        btn.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogInteractive();
});