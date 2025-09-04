// ===============================
// VARIABLES GLOBALES
// ===============================

let currentSection = 'main'; // 'main' ou nom de l'UE active

// ===============================
// ANIMATION D'INTRODUCTION
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    // Animation BIENVENUE au chargement
    const introAnimation = document.getElementById('intro-animation');
    const mainContent = document.getElementById('main-content');
    
    // Masquer l'animation après 3 secondes et afficher le contenu
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
    // Initialiser la vidéo de fond
    initializeVideo();
    
    // Initialiser la navigation
    initializeNavigation();
    
    // Initialiser les animations de scroll
    initializeScrollAnimations();
    
    // Initialiser les cartes UE
    initializeUECards();
    
    // Initialiser le formulaire de contact
    initializeContactForm();
    
    // Initialiser le bouton scroll to top
    initializeScrollToTop();
    
    // Initialiser la modal CV
    initializeCVModal();
    
    // Afficher la première section
    showSection('about');
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
        
        // Gérer la pause/lecture selon la visibilité de la page
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                video.pause();
            } else {
                video.play();
            }
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
    
    // Toggle du menu burger
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
    }
    
    // Navigation vers les sections principales
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Fermer le menu mobile
            if (navLinks) {
                navLinks.classList.remove('open');
            }
            
            // Si on est dans une section UE, revenir d'abord au main
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
    
    // Fermer le menu en cliquant ailleurs
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
    const ueCards = document.querySelectorAll('.ue-card');
    
    ueCards.forEach(card => {
        const ueBtn = card.querySelector('.ue-btn');
        const ueName = card.getAttribute('data-ue');
        
        // Clic sur la carte entière
        card.addEventListener('click', function() {
            showUEProjects(ueName);
        });
        
        // Clic sur le bouton
        if (ueBtn) {
            ueBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showUEProjects(ueName);
            });
        }
        
        // Effet de hover amélioré
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
    
    if (!ueSection) {
        console.error(`Section UE ${ueName} non trouvée`);
        return;
    }
    
    // Animation de sortie de la section skills
    if (skillsSection) {
        skillsSection.style.opacity = '0';
        skillsSection.style.transform = 'translateX(-100px)';
        
        setTimeout(() => {
            // Masquer la section skills
            skillsSection.style.display = 'none';
            
            // Afficher la section UE
            ueSection.classList.remove('hidden');
            ueSection.style.display = 'flex';
            ueSection.style.opacity = '0';
            ueSection.style.transform = 'translateX(100px)';
            
            // Animation d'entrée
            setTimeout(() => {
                ueSection.style.opacity = '1';
                ueSection.style.transform = 'translateX(0)';
                
                // Scroll vers le haut de la section
                ueSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Mettre à jour la section courante
                currentSection = ueName;
            }, 50);
        }, 300);
    }
    
    // Mettre à jour l'URL sans recharger la page
    history.pushState({section: ueName}, '', `#ue-${ueName}`);
}

function showMainSkills() {
    const skillsSection = document.getElementById('skills');
    const currentUESection = document.getElementById(`ue-${currentSection}`);
    
    if (currentSection === 'main') return;
    
    // Animation de sortie de la section UE
    if (currentUESection) {
        currentUESection.style.opacity = '0';
        currentUESection.style.transform = 'translateX(100px)';
        
        setTimeout(() => {
            // Masquer la section UE
            currentUESection.style.display = 'none';
            currentUESection.classList.add('hidden');
            
            // Afficher la section skills
            if (skillsSection) {
                skillsSection.style.display = 'flex';
                skillsSection.style.opacity = '0';
                skillsSection.style.transform = 'translateX(-100px)';
                
                // Animation d'entrée
                setTimeout(() => {
                    skillsSection.style.opacity = '1';
                    skillsSection.style.transform = 'translateX(0)';
                    
                    // Scroll vers la section skills
                    skillsSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Mettre à jour la section courante
                    currentSection = 'main';
                }, 50);
            }
        }, 300);
    }
    
    // Mettre à jour l'URL
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
    // La modal CV ne s'initialise que lors du clic sur le bouton
    console.log('Modal CV initialisée - prête pour ouverture sur clic');
}

// Fonction pour ouvrir le CV (appelée par le bouton)
function openCV() {
    const modal = document.getElementById('cv-modal');
    const iframe = document.getElementById('cv-iframe');
    const loading = modal.querySelector('.cv-loading');
    
    if (!modal) {
        console.error('Modal CV non trouvée');
        return;
    }
    
    // Afficher la modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
    
    // Animation d'ouverture
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Charger le CV seulement maintenant
    if (iframe) {
        // Afficher le loading
        if (loading) {
            loading.style.display = 'block';
        }
        
        // Charger le PDF
        iframe.src = 'Image/CV/cv Arnaud Hunt numérique.pdf'; // Mettez le bon chemin ici
        
        // Masquer le loading une fois chargé
        iframe.onload = function() {
            if (loading) {
                loading.style.display = 'none';
            }
            iframe.classList.add('loaded');
        };
    }
    
    console.log('CV ouvert');
}

// Fonction pour fermer le CV
function closeCV() {
    const modal = document.getElementById('cv-modal');
    const iframe = document.getElementById('cv-iframe');
    
    if (!modal) return;
    
    // Animation de fermeture
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.add('hidden');
        
        // Réactiver le scroll du body
        document.body.style.overflow = 'auto';
        
        // Vider l'iframe pour économiser les ressources
        if (iframe) {
            iframe.src = '';
            iframe.classList.remove('loaded');
        }
        
        console.log('CV fermé');
    }, 300);
}

// Fermer la modal avec Escape
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
    
    // Observer pour les animations d'apparition
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Animation spéciale pour les cartes UE
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

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('show');
    }
}

// ===============================
// FORMULAIRE DE CONTACT
// ===============================

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form ? form.querySelector('.submit-btn') : null;
    const messageDiv = document.getElementById('form-message');
    
    if (!form || !submitBtn) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animation du bouton
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Récupérer les données
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulation d'envoi
        setTimeout(() => {
            // Succès
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
            submitBtn.style.background = 'rgba(76, 175, 80, 0.2)';
            submitBtn.style.borderColor = 'rgba(76, 175, 80, 0.5)';
            
            // Message de confirmation
            showNotification('Message envoyé avec succès !', 'success');
            
            // Reset du formulaire
            form.reset();
            
            // Remettre le bouton normal
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                submitBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }, 3000);
        }, 2000);
    });
    
    // Effets sur les champs de saisie
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
        <i class="fas fa-${type === 'success' ? 'check' : 'info'}"></i>
        <span>${message}</span>
    `;
    
    // Styles
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
    
    // Couleurs selon le type
    if (type === 'success') {
        notification.style.borderColor = 'rgba(76, 175, 80, 0.5)';
    }
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-suppression
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
    
    // Afficher/masquer selon le scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    // Action du bouton
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Animation du bouton
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// ===============================
// EFFETS VISUELS AVANCÉS
// ===============================

// Parallax léger sur les éléments glass
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const glassElements = document.querySelectorAll('.glass-container');
    
    glassElements.forEach((element, index) => {
        const speed = (index % 2 === 0) ? 0.02 : -0.02; // Très léger
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
        // Ajustements spécifiques mobile
        navLinks.style.width = '100vw';
        navLinks.style.left = '-100vw';
    }
}

window.addEventListener('resize', handleMobileNavigation);

// ===============================
// INITIALISATION FINALE
// ===============================

// Démarrage automatique si l'animation d'intro est désactivée
if (!document.getElementById('intro-animation') || 
    document.getElementById('intro-animation').style.display === 'none') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
}

// ===============================
// FONCTIONS GLOBALES (accessibles depuis HTML)
// ===============================

// Ces fonctions doivent être globales pour être appelées depuis le HTML
window.openCV = openCV;
window.closeCV = closeCV;
window.showMainSkills = showMainSkills;

console.log('🎨 Portfolio HUNT ARNAUD chargé avec succès ! 🚀');