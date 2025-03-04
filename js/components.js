// Components Class for Quick-Win Features
class UIComponents {
    constructor() {
        this.initLoader();
        this.initCookieConsent();
        this.initNewsletterPopup();
        this.initQuickLinks();
        this.initSocialBar();
        this.initLanguageSelector();
        this.initAccessibility();
    }

    // 1. Loading Screen
    initLoader() {
        const loader = `
            <div class="page-loader">
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', loader);

        window.addEventListener('load', () => {
            document.querySelector('.page-loader').style.display = 'none';
        });
    }

    // 2. Cookie Consent
    initCookieConsent() {
        if (!localStorage.getItem('cookieConsent')) {
            const cookieNotice = `
                <div class="cookie-consent">
                    <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                    <div class="cookie-buttons">
                        <button class="accept-cookies">Accept</button>
                        <button class="decline-cookies">Decline</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', cookieNotice);

            document.querySelector('.accept-cookies').addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                document.querySelector('.cookie-consent').remove();
            });

            document.querySelector('.decline-cookies').addEventListener('click', () => {
                document.querySelector('.cookie-consent').remove();
            });
        }
    }

    // 3. Newsletter Popup
    initNewsletterPopup() {
        if (!sessionStorage.getItem('newsletterShown')) {
            setTimeout(() => {
                const newsletter = `
                    <div class="newsletter-popup">
                        <div class="newsletter-content">
                            <span class="close-newsletter">&times;</span>
                            <h3>Subscribe to Our Newsletter</h3>
                            <p>Get the latest updates and special offers!</p>
                            <form class="newsletter-form">
                                <input type="email" placeholder="Enter your email" required>
                                <button type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                `;
                document.body.insertAdjacentHTML('beforeend', newsletter);

                document.querySelector('.close-newsletter').addEventListener('click', () => {
                    document.querySelector('.newsletter-popup').remove();
                    sessionStorage.setItem('newsletterShown', 'true');
                });
            }, 5000);
        }
    }

    // 4. Quick Links Widget
    initQuickLinks() {
        const quickLinks = `
            <div class="quick-links">
                <button class="quick-links-toggle">
                    <i class="fas fa-plus"></i>
                </button>
                <div class="quick-links-menu">
                    <a href="#" class="quick-link"><i class="fas fa-home"></i></a>
                    <a href="#" class="quick-link"><i class="fas fa-envelope"></i></a>
                    <a href="#" class="quick-link"><i class="fas fa-phone"></i></a>
                    <a href="#top" class="quick-link back-to-top"><i class="fas fa-arrow-up"></i></a>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', quickLinks);

        document.querySelector('.quick-links-toggle').addEventListener('click', () => {
            document.querySelector('.quick-links').classList.toggle('active');
        });
    }

    // 5. Social Media Bar
    initSocialBar() {
        const socialBar = `
            <div class="social-bar">
                <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', socialBar);
    }

    // 6. Language Selector
    initLanguageSelector() {
        const languages = `
            <div class="language-selector">
                <button class="language-toggle">
                    <i class="fas fa-globe"></i> EN
                </button>
                <div class="language-dropdown">
                    <a href="#" data-lang="en">English</a>
                    <a href="#" data-lang="es">Español</a>
                    <a href="#" data-lang="fr">Français</a>
                </div>
            </div>
        `;
        document.querySelector('.navbar').insertAdjacentHTML('beforeend', languages);

        document.querySelector('.language-toggle').addEventListener('click', () => {
            document.querySelector('.language-dropdown').classList.toggle('active');
        });
    }

    // 7. Accessibility Features
    initAccessibility() {
        const accessibilityTools = `
            <div class="accessibility-tools">
                <button class="contrast-toggle">
                    <i class="fas fa-adjust"></i>
                </button>
                <button class="font-size-increase">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="font-size-decrease">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', accessibilityTools);

        // Contrast toggle
        document.querySelector('.contrast-toggle').addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });

        // Font size controls
        let fontSize = 16;
        document.querySelector('.font-size-increase').addEventListener('click', () => {
            fontSize = Math.min(fontSize + 2, 24);
            document.documentElement.style.fontSize = `${fontSize}px`;
        });

        document.querySelector('.font-size-decrease').addEventListener('click', () => {
            fontSize = Math.max(fontSize - 2, 12);
            document.documentElement.style.fontSize = `${fontSize}px`;
        });
    }
}