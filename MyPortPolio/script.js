document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Typing effect
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const phrases = [' Software Developer','Web Developer', 'Freelancer','Java Developer']; // Customize these
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at end of word
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next word
            }

            setTimeout(typeEffect, typingSpeed);
        }

        typeEffect();
    }

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Get form values
    //         const name = document.getElementById('name').value;
    //         const email = document.getElementById('email').value;
    //         const subject = document.getElementById('subject').value;
    //         const message = document.getElementById('message').value;
            
    //         // Here you would typically send the form data to a server
    //         // For now, we'll just log it to the console
    //         console.log('Form submitted:', { name, email, subject, message });
            
    //         // Show a success message (you can customize this)
    //         alert('Thank you for your message! I will get back to you soon.');
            
    //         // Reset the form
    //         contactForm.reset();
    //     });
    // }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });

     // Form submission with EmailJS
     const contactForm = document.getElementById('contactForm');
     if (contactForm) {
         contactForm.addEventListener('submit', function(e) {
             e.preventDefault();
             
             // Show loading state
             const submitButton = contactForm.querySelector('button[type="submit"]');
             const originalButtonText = submitButton.innerHTML;
             submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
             submitButton.disabled = true;
             
             // Get form values
             const name = document.getElementById('name').value;
             const email = document.getElementById('email').value;
             const subject = document.getElementById('subject').value;
             const message = document.getElementById('message').value;
             
             // Prepare template parameters for EmailJS
             const templateParams = {
                 from_name: name,
                 from_email: email,
                 subject: subject,
                 message: message
             };
             
             // Send email using EmailJS
             emailjs.send('service_kpeuh2c', 'template_yjvqnzl', templateParams)
                 .then(function(response) {
                     console.log('SUCCESS!', response.status, response.text);
                     
                     // Show success message
                     showFormMessage('success', 'Your message has been sent successfully! I will get back to you soon.');
                     
                     // Reset the form
                     contactForm.reset();
                 }, function(error) {
                     console.log('FAILED...', error);
                     
                     // Show error message
                     showFormMessage('error', 'Oops! Something went wrong. Please try again later.');
                 })
                 .finally(function() {
                     // Restore button state
                     submitButton.innerHTML = originalButtonText;
                     submitButton.disabled = false;
                 });
         });
     }

    // Animate skill bars on scroll
    const skillSection = document.querySelector('.skills');
    const skillLevels = document.querySelectorAll('.skill-level');
    
    if (skillSection && skillLevels.length > 0) {
        const animateSkills = () => {
            const sectionPos = skillSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            
            if (sectionPos < screenPos) {
                skillLevels.forEach(level => {
                    level.style.width = level.style.width;
                });
                window.removeEventListener('scroll', animateSkills);
            }
        };
        
        window.addEventListener('scroll', animateSkills);
        // Trigger once on load
        animateSkills();
    }
});