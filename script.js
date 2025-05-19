// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-btn') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Testimonial Slider
    initTestimonialSlider();

    // Product Filters
    initProductFilters();

    // FAQ Accordion
    initFaqAccordion();

    // Form Validation
    initFormValidation();

    // Newsletter Form
    initNewsletterForm();
});

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (!testimonials.length || !dots.length) return;

    let currentSlide = 0;

    function showSlide(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Product Filters
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (!filterBtns.length || !productCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter products
            const category = this.getAttribute('data-category');
            
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Highlight active navigation link
 document.addEventListener('DOMContentLoaded', function() {
    // Get current page path
    const path = window.location.pathname;
    
    // Remove active class from all navigation links
    const navLinks = document.querySelectorAll('nav li a');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current page link
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (path === href || (href !== '/' && path.startsWith(href))) {
        link.classList.add('active');
      } else if (path === '/' && href === '/') {
        link.classList.add('active');
      }
    });
    
    // Add a class to body for page-specific styles
    if (path.includes('/blog')) {
      document.body.classList.add('blog-page');
    }
  });


// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate Name
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Please enter your name';
            isValid = false;
        } else {
            nameError.textContent = '';
        }
        
        // Validate Email
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Please enter your email';
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // Validate Subject
        const subjectInput = document.getElementById('subject');
        const subjectError = document.getElementById('subject-error');
        if (!subjectInput.value) {
            subjectError.textContent = 'Please select a subject';
            isValid = false;
        } else {
            subjectError.textContent = '';
        }
        
        // Validate Message
        const messageInput = document.getElementById('message');
        const messageError = document.getElementById('message-error');
        if (!messageInput.value.trim()) {
            messageError.textContent = 'Please enter your message';
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Your message is too short';
            isValid = false;
        } else {
            messageError.textContent = '';
        }
        
        // If valid, show success message
        if (isValid) {
            contactForm.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
            
            // In a real-world scenario, you would send the form data to a server here
            // For demonstration purposes, we'll just simulate a form submission
            console.log('Form submitted successfully');
        }
    });
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('email');
        const formMessage = document.getElementById('form-message');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
            formMessage.textContent = 'Please enter a valid email address';
            formMessage.style.color = '#e74c3c';
        } else {
            formMessage.textContent = 'Thank you for subscribing!';
            formMessage.style.color = '#2ecc71';
            emailInput.value = '';
            
            // In a real-world scenario, you would send the email to a server here
            console.log('Newsletter subscription successful');
        }
    });
}

// Check URL hash for product category filters
window.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        const categoryId = window.location.hash.substring(1);
        const categoryBtn = document.getElementById(categoryId);
        
        if (categoryBtn && categoryBtn.classList.contains('filter-btn')) {
            categoryBtn.click();
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add animation on scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.category-card, .value-card, .team-member, .certification, .product-card');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('visible');
        }
    });
});