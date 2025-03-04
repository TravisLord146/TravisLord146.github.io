// Services Page Interactive Features
class ServicesInteractive {
    constructor() {
        this.initFAQ();
        this.initSearchFilter();
        this.initPriceToggle();
        this.initServiceAnimations();
        this.initProgressBar();
    }

    // FAQ Functionality
    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const icon = question.querySelector('i');
            
            question.addEventListener('click', () => {
                // Close other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('i').classList.replace('fa-minus', 'fa-plus');
                    }
                });

                // Toggle current FAQ
                item.classList.toggle('active');
                icon.classList.toggle('fa-plus');
                icon.classList.toggle('fa-minus');
            });
        });
    }

    // Live Search Filter
    initSearchFilter() {
        const searchInput = document.querySelector('.service-search input');
        const serviceCards = document.querySelectorAll('.category-card');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            serviceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Price Toggle (Monthly/Yearly)
    initPriceToggle() {
        const priceCards = document.querySelectorAll('.price-card');
        const html = `
            <div class="price-toggle">
                <span>Monthly</span>
                <label class="switch">
                    <input type="checkbox" id="priceToggle">
                    <span class="slider"></span>
                </label>
                <span>Yearly</span>
                <span class="discount-badge">Save 20%</span>
            </div>
        `;

        // Insert toggle before price cards
        priceCards[0].parentElement.insertAdjacentHTML('beforebegin', html);

        // Toggle functionality
        const toggle = document.getElementById('priceToggle');
        toggle.addEventListener('change', () => {
            priceCards.forEach(card => {
                const price = card.querySelector('.price');
                const currentPrice = parseInt(price.textContent.replace('$', ''));
                
                if (toggle.checked) {
                    // Yearly price (20% discount)
                    const yearlyPrice = (currentPrice * 12 * 0.8).toFixed(0);
                    price.innerHTML = `$${yearlyPrice}<span>/year</span>`;
                } else {
                    // Monthly price
                    const monthlyPrice = (currentPrice / 12 / 0.8).toFixed(0);
                    price.innerHTML = `$${monthlyPrice}<span>/month</span>`;
                }

                // Add animation
                price.style.animation = 'pulse 0.5s ease';
            });
        });
    }

    // Scroll Animations
    initServiceAnimations() {
        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    if (entry.target.classList.contains('service-item')) {
                        this.animateServiceFeatures(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.service-item, .category-card, .timeline-item')
            .forEach(el => observer.observe(el));
    }

    // Animated Feature List
    animateServiceFeatures(serviceItem) {
        const features = serviceItem.querySelectorAll('.service-features li');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.classList.add('animate');
            }, index * 200);
        });
    }

    // Progress Bar on Scroll
    initProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ServicesInteractive();
});