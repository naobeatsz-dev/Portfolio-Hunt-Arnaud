// ===============================
// VARIABLES GLOBALES
// ===============================

let currentSection = 'main'; // 'main' ou nom de l'UE active

// ===============================
// ANIMATION D'INTRODUCTION
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    const introAnimation = document.getElementById('intro-animation');
    const mainContent = document.getElementById('main-content');
    setTimeout(() => {
        introAnimation.classList.add('fade-out');
        setTimeout(() => {
            introAnimation.style.display = 'none';
            mainContent.classList.remove('hidden');
            initializePortfolio();
        }, 1000);
    }, 3000);
});

// ===============================
// INITIALISATION DU PORTFOLIO
// ===============================

function initializePortfolio() {
    initializeVideo();
    initializeNavigation();
    initializeScrollAnimations();
    initializeUECards();
    initializeContactForm();
    initializeScrollToTop();
    initializeCVModal();
    console.log('Portfolio initialisé avec succès');
}

// ===============================
// GESTION DE LA VIDÉO DE FOND
// ===============================

function initializeVideo() {
    const video = document.getElementById('video-bg');
    if (video) {
        video.addEventListener('loadeddata', function() {
            video.classList.add('loaded');
        });
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) video.pause();
            else video.play();
        });
    }
}

// ===============================
// NAVIGATION PRINCIPALE
// ===============================

function initializeNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
    }
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (navLinks) navLinks.classList.remove('open');
            if (currentSection !== 'main') {
                showMainSkills();
                setTimeout(() => {
                    scrollToSection(targetId);
                }, 500);
            } else {
                scrollToSection(targetId);
            }
        });
    });
    document.addEventListener('click', function(e) {
        if (menuToggle && navLinks &&
            !menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    });
}

// ===============================
// GESTION DES CARTES UE
// ===============================

function initializeUECards() {
    // Timeline (nouveau design)
    document.querySelectorAll('.ue-card-new').forEach(card => {
        const ueBtn = card.querySelector('.ue-btn-new');
        const ueName = card.parentElement.getAttribute('data-ue');
        card.addEventListener('click', function() {
            showUEProjects(ueName);
        });
        if (ueBtn) {
            ueBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showUEProjects(ueName);
            });
        }
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    // Anciennes cartes (si présentes)
    document.querySelectorAll('.ue-card').forEach(card => {
        const ueBtn = card.querySelector('.ue-btn');
        const ueName = card.getAttribute('data-ue');
        card.addEventListener('click', function() {
            showUEProjects(ueName);
        });
        if (ueBtn) {
            ueBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showUEProjects(ueName);
            });
        }
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===============================
// NAVIGATION ENTRE SECTIONS UE
// ===============================

function showUEProjects(ueName) {
    const skillsSection = document.getElementById('skills');
    const ueSection = document.getElementById(`ue-${ueName}`);
    const navLinks = document.getElementById('nav-links');
    if (!ueSection) {
        console.error(`Section UE ${ueName} non trouvée`);
        return;
    }
    // Fermer le menu mobile si ouvert
    if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
    }
    // Animation de sortie de la section skills
    if (skillsSection) {
        skillsSection.style.opacity = '0';
        skillsSection.style.transform = 'translateX(-100px)';
        setTimeout(() => {
            skillsSection.style.display = 'none';
            ueSection.classList.remove('hidden');
            ueSection.style.display = 'flex';
            ueSection.style.opacity = '0';
            ueSection.style.transform = 'translateX(100px)';
            setTimeout(() => {
                ueSection.style.opacity = '1';
                ueSection.style.transform = 'translateX(0)';
                // Scroll mobile friendly
                setTimeout(() => {
                    window.scrollTo({
                        top: ueSection.offsetTop - (window.innerWidth < 600 ? 0 : 80),
                        behavior: 'smooth'
                    });
                }, 50);
                currentSection = ueName;
            }, 50);
        }, 300);
    }
    history.pushState({section: ueName}, '', `#ue-${ueName}`);
}

function showMainSkills() {
    const skillsSection = document.getElementById('skills');
    const currentUESection = document.getElementById(`ue-${currentSection}`);
    if (currentSection === 'main') return;
    if (currentUESection) {
        currentUESection.style.opacity = '0';
        currentUESection.style.transform = 'translateX(100px)';
        setTimeout(() => {
            currentUESection.style.display = 'none';
            currentUESection.classList.add('hidden');
            if (skillsSection) {
                skillsSection.style.display = 'flex';
                skillsSection.style.opacity = '0';
                skillsSection.style.transform = 'translateX(-100px)';
                setTimeout(() => {
                    skillsSection.style.opacity = '1';
                    skillsSection.style.transform = 'translateX(0)';
                    skillsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    currentSection = 'main';
                }, 50);
            }
        }, 300);
    }
    history.pushState({section: 'main'}, '', '#skills');
}

// ===============================
// GESTION DE L'HISTORIQUE NAVIGATEUR
// ===============================

window.addEventListener('popstate', function(event) {
    if (event.state && event.state.section) {
        if (event.state.section === 'main') {
            showMainSkills();
        } else {
            showUEProjects(event.state.section);
        }
    }
});

// ===============================
// GESTION DE LA MODAL CV
// ===============================

function initializeCVModal() {
    const modal = document.getElementById('cv-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        modal.style.opacity = '0';
    }
    console.log('Modal CV initialisée - fermée par défaut');
}

function openCV() {
    const modal = document.getElementById('cv-modal');
    const iframe = document.getElementById('cv-iframe');
    const loading = modal.querySelector('.cv-loading');
    if (!modal) {
        console.error('Modal CV non trouvée');
        return;
    }
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    if (iframe) {
        if (loading) loading.style.display = 'block';
        iframe.src = 'Image/CV/cv Arnaud Hunt numérique.pdf';
        iframe.onload = function() {
            if (loading) loading.style.display = 'none';
            iframe.classList.add('loaded');
        };
    }
    console.log('CV ouvert');
}

function closeCV() {
    const modal = document.getElementById('cv-modal');
    const iframe = document.getElementById('cv-iframe');
    if (!modal) return;
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        if (iframe) {
            iframe.src = '';
            iframe.classList.remove('loaded');
        }
        console.log('CV fermé');
    }, 300);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('cv-modal');
        if (modal && !modal.classList.contains('hidden')) {
            closeCV();
        }
    }
});

// ===============================
// ANIMATIONS DE SCROLL
// ===============================

function initializeScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                if (entry.target.id === 'skills') {
                    animateUECards();
                }
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });
}

function animateUECards() {
    const ueCards = document.querySelectorAll('.ue-card');
    ueCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.9)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 100);
        }, index * 150);
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = sectionId === 'about' ? section.offsetTop : section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===============================
// FORMULAIRE DE CONTACT
// ===============================

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form ? form.querySelector('.submit-btn') : null;
    if (!form || !submitBtn) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const nom = formData.get('nom') || document.getElementById('user_name')?.value;
        const email = formData.get('email') || document.getElementById('user_email')?.value;
        const message = formData.get('message') || document.getElementById('user_message')?.value;
        if (!nom || !email || !message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        submitBtn.disabled = true;
        const subject = encodeURIComponent(`Contact Portfolio - ${nom}`);
        const body = encodeURIComponent(`
Nom: ${nom}
Email: ${email}

Message:
${message}

---
Envoyé depuis le portfolio de Hunt Arnaud
        `);
        const mailtoLink = `mailto:hunt.arnaud@example.com?subject=${subject}&body=${body}`;
        setTimeout(() => {
            window.location.href = mailtoLink;
            showNotification('Votre client email va s\'ouvrir', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// ===============================
// SYSTÈME DE NOTIFICATIONS
// ===============================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
        <span>${message}</span>
    `;
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        color: 'white',
        padding: '15px 20px',
        fontSize: '0.9rem',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        maxWidth: '300px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    });
    if (type === 'success') {
        notification.style.borderColor = 'rgba(76, 175, 80, 0.5)';
    } else if (type === 'error') {
        notification.style.borderColor = 'rgba(244, 67, 54, 0.5)';
    }
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===============================
// BOUTON SCROLL TO TOP
// ===============================

function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) return;
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// ===============================
// EFFETS VISUELS AVANCÉS
// ===============================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.glass-container').forEach((element, index) => {
        const speed = (index % 2 === 0) ? 0.02 : -0.02;
        const yPos = scrolled * speed;
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ===============================
// GESTION DES ERREURS
// ===============================

window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// ===============================
// RESPONSIVE - GESTION MOBILE
// ===============================

function handleMobileNavigation() {
    const isMobile = window.innerWidth <= 768;
    const navLinks = document.getElementById('nav-links');
    if (isMobile && navLinks) {
        navLinks.style.width = '100vw';
        navLinks.style.left = '-100vw';
    }
}

window.addEventListener('resize', handleMobileNavigation);

// ===============================
// FONCTIONS GLOBALES (accessibles depuis HTML)
// ===============================

window.openCV = openCV;
window.closeCV = closeCV;
window.showMainSkills = showMainSkills;

console.log('Portfolio HUNT ARNAUD chargé avec succès !');