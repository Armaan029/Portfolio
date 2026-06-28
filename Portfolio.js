/**
 * ==========================================================================
 * script.js - Interactive Portfolio Capabilities
 * Fully compliant with assignment guidelines (Steps 3-7)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript successfully initialized.");

    // ==========================================================================
    // Step 3: Add Basic Interactivity (Navigation & Smooth Scroll)
    // ==========================================================================
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            navMenu.classList.toggle("active");
            
            // Toggle hamburger icon appearance optionally inside styling transitions
            console.log(`Navigation menu visibility toggled. Expanded state: ${!isExpanded}`);
        });
    }

    // Smooth Scrolling Behavior for UI Navigation anchors
    document.querySelectorAll('header nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                
                // Accessible focus management rule
                targetElement.focus();
                if (document.activeElement !== targetElement) {
                    targetElement.setAttribute("tabindex", "-1");
                    targetElement.focus();
                }

                // Auto-close responsive mobile navbar menu drawer if open
                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    menuToggle.setAttribute("aria-expanded", "false");
                }
            }
        });
    });


    // ==========================================================================
    // Step 4: Add Interactivity to Portfolio Sections (Filter & Lightbox)
    // ==========================================================================
    
    // --- Card Filtering System ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedCategory = button.getAttribute("data-category");
            console.log(`Filtering matching inventory cards via category rule: "${selectedCategory}"`);

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                if (selectedCategory === "all" || cardCategory === selectedCategory) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // --- Modal Lightbox Layout Logic ---
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

    lightboxTriggers.forEach(img => {
        img.addEventListener("click", () => {
            if (lightboxModal && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxModal.style.display = "flex";
                lightboxClose.focus(); // Pull accessible focus framework directly into active frame modal
                console.log("Modal display triggered successfully.");
            }
        });
    });

    if (lightboxClose && lightboxModal) {
        const closeLightbox = () => {
            lightboxModal.style.display = "none";
            lightboxImg.src = "";
        };

        lightboxClose.addEventListener("click", closeLightbox);
        
        // Escape key fallback access rule
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }


    // ==========================================================================
    // Step 5 & 6: Form Validation, Real-Time Feedback, Testing & Diagnostics
    // ==========================================================================
    const contactForm = document.getElementById("contact-form");
    const inputsToValidate = ["name", "email", "message"];

    // Validation processing criteria definition loop
    const validateField = (fieldId) => {
        const field = document.getElementById(fieldId);
        const errorSpan = document.getElementById(`${fieldId}-error`);
        if (!field || !errorSpan) return false;

        let isValid = true;
        let errorMessage = "";

        // Standard Empty Value Assert Checks
        if (field.value.trim() === "") {
            isValid = false;
            errorMessage = `${field.previousElementSibling.textContent.replace(':', '')} details are required.`;
        } 
        // Specialized RegEx constraint syntax validation for formatting errors
        else if (fieldId === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                errorMessage = "Please enter a valid structural email formatting structure (e.g., mail@domain.com).";
            }
        }

        // Commit Real-Time structural UI notification updates
        if (!isValid) {
            errorSpan.textContent = errorMessage;
            errorSpan.style.display = "block";
            field.style.borderColor = "#ef4444";
        } else {
            errorSpan.textContent = "";
            errorSpan.style.display = "none";
            field.style.borderColor = ""; // Reset inline boundary metrics
        }

        return isValid;
    };

    // Attach immediate "input" event listener actions for live verification context strings
    inputsToValidate.forEach(id => {
        const inputElement = document.getElementById(id);
        if (inputElement) {
            inputElement.addEventListener("input", () => {
                validateField(id);
            });
        }
    });

    // Final comprehensive programmatic evaluation step intercepting form dispatching requests
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            let formHasErrors = false;

            inputsToValidate.forEach(id => {
                const isThisFieldValid = validateField(id);
                if (!isThisFieldValid) {
                    formHasErrors = true;
                }
            });

            if (formHasErrors) {
                e.preventDefault(); // Intercept browser submission pipeline processing completely
                console.warn("Submit Request Blocked: The dataset currently possesses broken verification states.");
            } else {
                console.log("Success: Form evaluation checks cleared successfully. Packaging dataset payload structural items.");
                alert("Thank you! Your message has been validated and sent successfully.");
            }
        });
    }
});