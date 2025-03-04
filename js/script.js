document.getElementById('mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});
// Add this to your script.js
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Add loading state to button
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // You would typically send this to your server
    // For now, let's simulate an API call
    setTimeout(() => {
        // Success simulation
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
        submitBtn.style.backgroundColor = '#28a745';
        
        // Reset form
        setTimeout(() => {
            document.getElementById('contactForm').reset();
            submitBtn.innerHTML = 'Send Message';
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '#4CAF50';
        }, 3000);
    }, 2000);
});

// Add this to script.js
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Add this to script.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add this to script.js
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Initialize counters when they come into view
const counterElements = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
});

counterElements.forEach(el => counterObserver.observe(el));

// Template Contact Form - Basic Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // TEMPLATE: Replace this with your own form handling
    alert('Form submitted! Add your form handling code here.');
    
    // Basic success animation for demo
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Message Sent!';
    setTimeout(() => {
        submitBtn.innerHTML = 'Send Message';
    }, 2000);
});

//protection
(function(){
    const licenseKey = 'DEMO-VERSION';
    const checkLicense = setInterval(() => {
        if(licenseKey === 'DEMO-VERSION') {
            console.log('Unlicensed Template Version');
            document.body.style.opacity = '0.8';
        }
    }, 3600000); // Checks every hour
})();