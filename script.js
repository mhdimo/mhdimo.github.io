// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation logo click
    const navLogo = document.querySelector('.navbar-brand a');
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollTimer = null;

    navLogo.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Improved navbar hide/show on scroll
    let scrollDirection = 'none';
    let hideThreshold = 100;
    let showThreshold = 20;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Clear existing timer
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }

        // Determine scroll direction
        if (scrollTop > lastScrollTop) {
            scrollDirection = 'down';
        } else if (scrollTop < lastScrollTop) {
            scrollDirection = 'up';
        }

        // Hide navbar when scrolling down past threshold
        if (scrollDirection === 'down' && scrollTop > hideThreshold) {
            navbar.classList.add('hidden');
        }
        // Show navbar when scrolling up or near top
        else if (scrollDirection === 'up' || scrollTop <= showThreshold) {
            navbar.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;

        // Show navbar after scrolling stops for 1 second
        scrollTimer = setTimeout(function() {
            navbar.classList.remove('hidden');
        }, 1000);
    });

    // Handle scroll wheel events for more responsive hiding
    let wheelTimer = null;
    window.addEventListener('wheel', function(e) {
        if (wheelTimer) {
            clearTimeout(wheelTimer);
        }

        if (e.deltaY > 0 && window.pageYOffset > hideThreshold) {
            // Scrolling down - hide navbar immediately
            navbar.classList.add('hidden');
        } else if (e.deltaY < 0) {
            // Scrolling up - show navbar immediately
            navbar.classList.remove('hidden');
        }

        // Auto-show after 2 seconds of no wheel activity
        wheelTimer = setTimeout(function() {
            navbar.classList.remove('hidden');
        }, 2000);
    });

    // Add simple scroll animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add hover effects to project items
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add hover effects to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});