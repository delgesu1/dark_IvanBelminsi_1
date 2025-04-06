/**
 * Ivan Belminsi - Classical Cellist Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const header = document.querySelector('.header');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const backToTop = document.querySelector('.back-to-top');
    const repertoireCategories = document.querySelectorAll('.repertoire-category');
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });
    
    // Mobile navigation toggle
    mobileNavToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileNavClose.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close mobile nav when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Repertoire category toggle
    repertoireCategories.forEach(category => {
        const header = category.querySelector('.category-header');
        
        header.addEventListener('click', function() {
            category.classList.toggle('active');
        });
    });
    
    // Gallery filtering
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            galleryFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Gallery lightbox
    const galleryOverlays = document.querySelectorAll('.gallery-overlay');
    
    galleryOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const imageUrl = this.previousElementSibling.getAttribute('src');
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img src="${imageUrl}" alt="Gallery image" class="lightbox-image">
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Add animation class after a small delay to trigger transition
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            
            // Close lightbox when clicking close button or outside the image
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    lightbox.classList.remove('active');
                    
                    // Remove lightbox from DOM after transition
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });
    });
    
    // Horizontal scroll for events and albums sections
    const scrollContainers = document.querySelectorAll('.events-container, .albums-container, .testimonials-container, .press-container');
    
    scrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            container.scrollLeft = scrollLeft - walk;
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('form-success');
                successMessage.textContent = 'Your message has been sent successfully!';
                
                this.appendChild(successMessage);
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    this.removeChild(successMessage);
                }, 5000);
            }, 1500);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const input = this.querySelector('.newsletter-input');
            const submitButton = this.querySelector('.newsletter-submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = '...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('newsletter-success');
                successMessage.textContent = 'Thank you for subscribing!';
                
                this.parentNode.appendChild(successMessage);
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    this.parentNode.removeChild(successMessage);
                }, 5000);
            }, 1500);
        });
    }
    
    // Load more button for news section
    const loadMoreButton = document.querySelector('.load-more');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            // Simulate loading more articles
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                const articlesGrid = document.querySelector('.articles-grid');
                
                // Create new article cards
                const newArticles = [
                    {
                        image: 'images/472094034_10163111822912474_1858302342592346687_n.jpg',
                        date: 'December 5, 2024',
                        title: 'Ivan Belminsi Joins Faculty at Juilliard',
                        excerpt: 'The renowned cellist has been appointed to the faculty of the Juilliard School, where he will teach cello performance and chamber music.'
                    },
                    {
                        image: 'images/468638483_10161875469767199_5471093597066206131_n.jpg',
                        date: 'November 18, 2024',
                        title: 'New Documentary Announced',
                        excerpt: 'A new documentary following Ivan Belminsi\'s journey through the complete Bach Cello Suites will be released next spring.'
                    },
                    {
                        image: 'images/487464258_1104846655016564_4163738746159095344_n.jpg',
                        date: 'October 30, 2024',
                        title: 'Charity Concert Raises $2 Million',
                        excerpt: 'Ivan Belminsi\'s benefit concert for music education in underserved communities raised over $2 million in a single evening.'
                    }
                ];
                
                // Add new articles to the grid
                newArticles.forEach(article => {
                    const articleCard = document.createElement('div');
                    articleCard.classList.add('article-card');
                    articleCard.innerHTML = `
                        <img src="${article.image}" alt="${article.title}" class="article-card-image">
                        <p class="article-date">${article.date}</p>
                        <h4 class="article-card-title">${article.title}</h4>
                        <p class="article-excerpt">${article.excerpt}</p>
                        <a href="#" class="article-link">Read More</a>
                    `;
                    
                    // Add fade-in animation
                    articleCard.style.opacity = '0';
                    articlesGrid.appendChild(articleCard);
                    
                    // Trigger reflow
                    void articleCard.offsetWidth;
                    
                    // Add transition and set opacity to 1
                    articleCard.style.transition = 'opacity 0.5s ease';
                    articleCard.style.opacity = '1';
                });
                
                // Update button text
                this.textContent = 'No More Articles';
                this.disabled = true;
            }, 1500);
        });
    }
    
    // Add scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.biography-content, .events-title, .gallery-title, .albums-title, .news-title, .teaching-content, .press-title, .contact-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.8) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Add fade-in class to CSS
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeInUp 1s ease forwards;
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox.active {
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 90vh;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 30px;
            color: white;
            background: none;
            border: none;
            cursor: pointer;
        }
        
        .form-success, .newsletter-success {
            background-color: rgba(255, 255, 255, 0.1);
            color: var(--color-gold);
            padding: var(--spacing-sm);
            margin-top: var(--spacing-sm);
            text-align: center;
            font-family: var(--font-mono);
            letter-spacing: 0.1em;
        }
    `;
    
    document.head.appendChild(style);
    
    // Run on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Add parallax effect to hero section
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        });
    }
    
    // Add hover effects for album cards
    const albumCards = document.querySelectorAll('.album-card');
    
    albumCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects for event cards
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Handle Loading Animation
    window.addEventListener('load', function() {
        const loader = document.querySelector('.page-loader');
        const body = document.body;

        // Ensure loader exists
        if (loader) {
            // Wait a bit for the loader animation to be appreciated
            setTimeout(() => {
                // Add class to body to trigger main content fade-in
                body.classList.add('loaded');
                
                // Hide the loader
                loader.classList.add('hidden');
                
                // Remove loader from DOM after transition
                setTimeout(() => {
                    if (loader.parentNode) {
                       loader.parentNode.removeChild(loader);
                    }
                }, 500); // Match CSS transition duration
            }, 1500); // Adjust delay as needed (original was 2000ms)
        } else {
            // If somehow loader is not found, ensure content is visible
            body.classList.add('loaded');
        }
    });
});
