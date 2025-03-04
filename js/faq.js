document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // Category filter
    const tabButtons = document.querySelectorAll('.tab-btn');
    const faqGroups = document.querySelectorAll('.faq-group');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            
            faqGroups.forEach(group => {
                if (category === 'all' || group.getAttribute('data-category') === category) {
                    group.style.display = 'block';
                } else {
                    group.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.getElementById('faqSearch');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        accordionItems.forEach(item => {
            const question = item.querySelector('.accordion-header').textContent.toLowerCase();
            const answer = item.querySelector('.accordion-content').textContent.toLowerCase();

            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});