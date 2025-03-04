// About Page Interactions
class AboutPageInteractions {
    constructor() {
        this.initStatCounter();
        this.initScrollAnimations();
        this.initTeamHover();
        this.initTimelineAnimation();
        this.initTestimonialSlider();
    }

    // Animated Stats Counter
    initStatCounter() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    this.animateValue(entry.target, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        stats.forEach(stat => observer.observe(stat));
    }

    animateValue(element, start, end, duration) {
        let current = start;
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Scroll Animations
    initScrollAnimations() {
        const elements = document.querySelectorAll('.mission-content, .value-item, .team-member, .timeline-item, .office-card');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    if (entry.target.classList.contains('timeline-item')) {
                        entry.target.classList.add('timeline-animate');
                    }
                }
            });
        }, observerOptions);

        elements.forEach(element => {
            element.classList.add('pre-animate');
            observer.observe(element);
        });
    }

    // Team Member Hover Effects
    initTeamHover() {
        const teamMembers = document.querySelectorAll('.team-member');

        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                this.animateSocialIcons(member);
            });
        });
    }

    animateSocialIcons(member) {
        const icons = member.querySelectorAll('.member-social a');
        icons.forEach((icon, index) => {
            icon.style.transitionDelay = `${index * 100}ms`;
            icon.classList.add('animate-icon');
        });
    }

    // Timeline Animation
    initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-animate');
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => observer.observe(item));
    }

    // Testimonial Slider
    initTestimonialSlider() {
        const slider = document.querySelector('.testimonial-slider');
        const items = document.querySelectorAll('.testimonial-item');
        let currentSlide = 0;

        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        slider.appendChild(dotsContainer);

        // Auto-advance slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % items.length;
            this.goToSlide(currentSlide);
        }, 5000);
    }

    goToSlide(index) {
        const items = document.querySelectorAll('.testimonial-item');
        const dots = document.querySelectorAll('.slider-dot');
        
        items.forEach((item, i) => {
            item.style.transform = `translateX(${100 * (i - index)}%)`;
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AboutPageInteractions();
});



// Enhanced Interactive Features
class EnhancedAboutInteractions extends AboutPageInteractions {
    constructor() {
        super();
        this.initParallaxEffect();
        this.initImageZoom();
        this.initSkillBars();
        this.initOfficeLocations();
        this.initTeamFilter();
        this.initAchievementsWall();
    }

    // Parallax Effect for Hero Section
    initParallaxEffect() {
        const hero = document.querySelector('.about-hero');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });

        // Add floating shapes
        const shapes = ['circle', 'square', 'triangle'];
        shapes.forEach(shape => {
            const element = document.createElement('div');
            element.className = `floating-shape ${shape}`;
            hero.appendChild(element);
        });
    }

    // Image Zoom Effect
    initImageZoom() {
        const images = document.querySelectorAll('.mission-image img, .member-image img');
        
        images.forEach(img => {
            img.addEventListener('mousemove', (e) => {
                const bounds = e.target.getBoundingClientRect();
                const mouseX = e.clientX - bounds.left;
                const mouseY = e.clientY - bounds.top;
                const xPercent = mouseX / bounds.width;
                const yPercent = mouseY / bounds.height;
                
                e.target.style.transform = `scale(1.1) translate(${xPercent * -20}px, ${yPercent * -20}px)`;
            });

            img.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'scale(1) translate(0, 0)';
            });
        });
    }

    // Animated Skill Bars
    initSkillBars() {
        const skillsHTML = `
            <div class="skills-section">
                <h2>Our Expertise</h2>
                <div class="skill-bars">
                    <div class="skill-bar" data-skill="Web Development" data-level="95">
                        <div class="skill-progress"></div>
                    </div>
                    <div class="skill-bar" data-skill="Digital Marketing" data-level="85">
                        <div class="skill-progress"></div>
                    </div>
                    <div class="skill-bar" data-skill="UI/UX Design" data-level="90">
                        <div class="skill-progress"></div>
                    </div>
                </div>
            </div>
        `;

        document.querySelector('.mission-section').insertAdjacentHTML('beforeend', skillsHTML);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const level = bar.getAttribute('data-level');
                    bar.querySelector('.skill-progress').style.width = `${level}%`;
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-bar').forEach(bar => observer.observe(bar));
    }

    // Interactive Office Locations
    initOfficeLocations() {
        const officeCards = document.querySelectorAll('.office-card');
        
        officeCards.forEach(card => {
            // Add 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const bounds = card.getBoundingClientRect();
                const mouseX = e.clientX - bounds.left;
                const mouseY = e.clientY - bounds.top;
                const centerX = bounds.width / 2;
                const centerY = bounds.height / 2;
                
                const angleX = (mouseY - centerY) / 20;
                const angleY = (centerX - mouseX) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });

            // Add location preview
            card.addEventListener('click', () => {
                this.showLocationPreview(card);
            });
        });
    }

    // Team Filter System
    initTeamFilter() {
        const filterHTML = `
            <div class="team-filter">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="development">Development</button>
                <button class="filter-btn" data-filter="design">Design</button>
                <button class="filter-btn" data-filter="marketing">Marketing</button>
            </div>
        `;

        document.querySelector('.team-section h2').insertAdjacentHTML('afterend', filterHTML);

        const filterButtons = document.querySelectorAll('.filter-btn');
        const teamMembers = document.querySelectorAll('.team-member');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                teamMembers.forEach(member => {
                    const department = member.getAttribute('data-department');
                    if (filter === 'all' || filter === department) {
                        member.style.display = 'block';
                        setTimeout(() => member.classList.add('show'), 10);
                    } else {
                        member.classList.remove('show');
                        setTimeout(() => member.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // Interactive Achievements Wall
    initAchievementsWall() {
        const achievementsHTML = `
            <div class="achievements-wall">
                <h2>Our Achievements</h2>
                <div class="achievements-grid">
                    <!-- Add achievement items dynamically -->
                </div>
            </div>
        `;

        const achievements = [
            { icon: 'trophy', title: 'Best Agency 2023', description: 'Awarded by Digital Excellence' },
            { icon: 'star', title: '5-Star Rating', description: '500+ Client Reviews' },
            { icon: 'certificate', title: 'Certified Expert', description: 'Google & Meta Partner' }
        ];

        document.querySelector('.timeline-section').insertAdjacentHTML('beforebegin', achievementsHTML);

        const grid = document.querySelector('.achievements-grid');
        achievements.forEach(achievement => {
            const item = document.createElement('div');
            item.className = 'achievement-item';
            item.innerHTML = `
                <i class="fas fa-${achievement.icon}"></i>
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
            `;
            grid.appendChild(item);

            item.addEventListener('mouseenter', () => {
                item.classList.add('pulse');
            });

            item.addEventListener('animationend', () => {
                item.classList.remove('pulse');
            });
        });
    }

    // Location Preview Modal
    showLocationPreview(card) {
        const modal = document.createElement('div');
        modal.className = 'location-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>${card.querySelector('h3').textContent}</h3>
                <div class="location-details">
                    <div class="map-container">
                        <!-- Add map iframe or image here -->
                    </div>
                    <div class="location-info">
                        <p><i class="fas fa-map-marker-alt"></i> ${card.querySelector('p').textContent}</p>
                        <p><i class="fas fa-phone"></i> +1 (555) 123-4567</p>
                        <p><i class="fas fa-envelope"></i> office@agencypro.com</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
    }
}

// Initialize Enhanced Features
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedAboutInteractions();
});

// More Advanced Interactive Features
class MoreAdvancedFeatures {
    constructor() {
        this.initParticleBackground();
        this.initTeamMemberBios();
        this.initInteractiveTimeline();
        this.initPhotoGallery();
        this.initLiveChat();
    }

    // Particle Background
    initParticleBackground() {
        const canvas = document.createElement('canvas');
        canvas.className = 'particle-background';
        document.querySelector('.about-hero').appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.speed = 0.1;
                this.velocity = Math.random() * 2;
            }

            update() {
                this.y += this.velocity;
                if (this.y > canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                ctx.fill();
            }
        }

        function createParticles() {
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }

        resizeCanvas();
        createParticles();
        animate();

        window.addEventListener('resize', resizeCanvas);
    }

    // Interactive Team Member Bios
    initTeamMemberBios() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            member.addEventListener('click', () => {
                this.showTeamBio(member);
            });
        });
    }

    showTeamBio(member) {
        const modal = document.createElement('div');
        modal.className = 'bio-modal';
        modal.innerHTML = `
            <div class="bio-content">
                <span class="close-bio">&times;</span>
                <div class="bio-header">
                    <img src="${member.querySelector('img').src}" alt="Team Member">
                    <div class="bio-info">
                        <h3>${member.querySelector('h3').textContent}</h3>
                        <span>${member.querySelector('.position').textContent}</span>
                    </div>
                </div>
                <div class="bio-details">
                    <div class="bio-tabs">
                        <button class="tab-btn active" data-tab="about">About</button>
                        <button class="tab-btn" data-tab="experience">Experience</button>
                        <button class="tab-btn" data-tab="projects">Projects</button>
                    </div>
                    <div class="tab-content">
                        <!-- Content will be dynamically loaded -->
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);

        // Handle tab switching
        const tabs = modal.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.loadTabContent(modal, tab.dataset.tab);
            });
        });

        modal.querySelector('.close-bio').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });

        // Load initial content
        this.loadTabContent(modal, 'about');
    }

    loadTabContent(modal, tab) {
        const content = modal.querySelector('.tab-content');
        let html = '';

        switch(tab) {
            case 'about':
                html = `
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div class="bio-skills">
                        <h4>Skills</h4>
                        <div class="skill-tags">
                            <span>Web Development</span>
                            <span>UI/UX Design</span>
                            <span>Project Management</span>
                        </div>
                    </div>
                `;
                break;
            case 'experience':
                html = `
                    <div class="experience-timeline">
                        <div class="exp-item">
                            <span class="year">2020 - Present</span>
                            <h4>Senior Developer</h4>
                            <p>AgencyPro</p>
                        </div>
                        <div class="exp-item">
                            <span class="year">2018 - 2020</span>
                            <h4>Web Developer</h4>
                            <p>Tech Solutions Inc.</p>
                        </div>
                    </div>
                `;
                break;
            case 'projects':
                html = `
                    <div class="project-grid">
                        <div class="project-card">
                            <img src="images/project1.jpg" alt="Project">
                            <h4>E-commerce Platform</h4>
                            <p>Lead developer for major retail client</p>
                        </div>
                        <div class="project-card">
                            <img src="images/project2.jpg" alt="Project">
                            <h4>Banking App</h4>
                            <p>Frontend development and UI design</p>
                        </div>
                    </div>
                `;
                break;
        }

        content.innerHTML = html;
    }

    // Interactive Timeline
    initInteractiveTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            item.addEventListener('click', () => {
                const content = item.querySelector('.timeline-content');
                content.classList.toggle('expanded');
                
                if (content.classList.contains('expanded')) {
                    const details = document.createElement('div');
                    details.className = 'timeline-details';
                    details.innerHTML = `
                        <div class="detail-content">
                            <img src="images/timeline-detail.jpg" alt="Timeline Detail">
                            <p>Detailed description of this milestone...</p>
                            <ul>
                                <li>Achievement 1</li>
                                <li>Achievement 2</li>
                                <li>Achievement 3</li>
                            </ul>
                        </div>
                    `;
                    content.appendChild(details);
                } else {
                    const details = content.querySelector('.timeline-details');
                    if (details) details.remove();
                }
            });
        });
    }

    // Photo Gallery
    initPhotoGallery() {
        const galleryHTML = `
            <div class="office-gallery">
                <h2>Life at AgencyPro</h2>
                <div class="gallery-grid">
                    <!-- Add gallery items dynamically -->
                </div>
            </div>
        `;

        document.querySelector('.office-section').insertAdjacentHTML('beforeend', galleryHTML);

        // Add gallery items
        const images = [
            { src: 'office1.jpg', caption: 'Team Building' },
            { src: 'office2.jpg', caption: 'Work Space' },
            { src: 'office3.jpg', caption: 'Company Event' }
        ];

        const grid = document.querySelector('.gallery-grid');
        images.forEach(img => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="images/${img.src}" alt="${img.caption}">
                <div class="gallery-caption">${img.caption}</div>
            `;
            grid.appendChild(item);

            item.addEventListener('click', () => {
                this.showGalleryModal(img);
            });
        });
    }

    showGalleryModal(image) {
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="gallery-modal-content">
                <span class="close-gallery">&times;</span>
                <img src="images/${image.src}" alt="${image.caption}">
                <div class="gallery-modal-caption">${image.caption}</div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);

        modal.querySelector('.close-gallery').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
    }

    // Live Chat Widget// Live Chat Widget
initLiveChat() {
    const chatHTML = `
        <div class="chat-widget">
            <button class="chat-toggle">
                <i class="fas fa-comments"></i>
                <span class="chat-notification">1</span>
            </button>
            
            <div class="chat-container">
                <div class="chat-header">
                    <h4>Live Support</h4>
                    <span class="minimize-chat">
                        <i class="fas fa-minus"></i>
                    </span>
                </div>
                
                <div class="chat-messages">
                    <div class="message bot">
                        <div class="message-content">
                            <p>👋 Hi! How can we help you today?</p>
                            <span class="message-time">Just now</span>
                        </div>
                    </div>
                </div>
                
                <div class="quick-responses">
                    <button class="quick-response">I need help with services</button>
                    <button class="quick-response">Request a quote</button>
                    <button class="quick-response">Technical support</button>
                </div>

                <div class="chat-input">
                    <input type="text" placeholder="Type your message...">
                    <button class="send-message">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // Chat functionality
    const chatWidget = document.querySelector('.chat-widget');
    const chatToggle = chatWidget.querySelector('.chat-toggle');
    const minimizeBtn = chatWidget.querySelector('.minimize-chat');
    const chatInput = chatWidget.querySelector('.chat-input input');
    const sendBtn = chatWidget.querySelector('.send-message');
    const quickResponses = chatWidget.querySelectorAll('.quick-response');

    // Toggle chat window
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('open');
        chatToggle.querySelector('.chat-notification').style.display = 'none';
    });

    // Minimize chat
    minimizeBtn.addEventListener('click', () => {
        chatWidget.classList.remove('open');
    });

    // Send message function
    const sendMessage = (message, isUser = true) => {
        const messagesContainer = chatWidget.querySelector('.chat-messages');
        const messageHTML = `
            <div class="message ${isUser ? 'user' : 'bot'}">
                <div class="message-content">
                    <p>${message}</p>
                    <span class="message-time">Just now</span>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        if (isUser) {
            // Simulate bot response
            setTimeout(() => {
                sendMessage('Thanks for your message! Our team will get back to you soon.', false);
            }, 1000);
        }
    };

    // Send message on button click
    sendBtn.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            sendMessage(message);
            chatInput.value = '';
        }
    });

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                sendMessage(message);
                chatInput.value = '';
            }
        }
    });

    // Quick responses
    quickResponses.forEach(button => {
        button.addEventListener('click', () => {
            sendMessage(button.textContent);
        });
    });
}