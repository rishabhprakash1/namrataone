document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) {
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // PROJECTS PAGE: Tab Switching Logic
    const tabLinks = document.querySelectorAll('.tab-link');
    const projectPanes = document.querySelectorAll('.project-pane');

    if(tabLinks.length > 0 && projectPanes.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Remove active class from all tabs and panes
                tabLinks.forEach(l => l.classList.remove('active'));
                projectPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and target pane
                link.classList.add('active');
                const targetId = link.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                
                if(targetPane) {
                    targetPane.classList.add('active');
                    
                    // On mobile, scroll to content slightly below the sticky menu
                    if(window.innerWidth <= 992) {
                        const headerOffset = 180; // Account for sticky menu and header
                        const elementPosition = targetPane.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // PROJECTS PAGE: Carousel Navigation
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        if (prevBtn && nextBtn && track) {
            // Scroll by approximately one image width
            prevBtn.addEventListener('click', () => {
                const scrollAmount = track.clientWidth * 0.8;
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                const scrollAmount = track.clientWidth * 0.8;
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    });
});
