/**
 * Plumb5 Education Admissions Campaign Landing Page - Production Javascript
 * High-performance, pure vanilla script to support interactive elements.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- REAL-TIME PORTAL CLOCK ---
  const initPortalClock = () => {
    const clockElement = document.getElementById("utc-clock-tracker");
    if (!clockElement) return;

    const updateClock = () => {
      const now = new Date();
      // Format as beautiful global standard representation
      clockElement.textContent = now.toUTCString().replace("GMT", "UTC");
    };

    updateClock();
    setInterval(updateClock, 1000);
  };

  // --- FLOATING NOTIFICATIONS TICKER LOOP ---
  const initFloatingTicker = () => {
    const notifications = [
      {
        type: "enquiry",
        badge: "New Admission Enquiry",
        text: "Ananya R. (Bengaluru)",
        time: "Just now"
      },
      {
        type: "whatsapp",
        badge: "WhatsApp Follow-Up Sent",
        text: "Personalized Course Guide delivered",
        time: "2 mins ago"
      },
      {
        type: "submitted",
        badge: "Application Submitted",
        text: "Rahul K. via Ad Campaign",
        time: "5 mins ago"
      },
      {
        type: "counselling",
        badge: "Counselling Scheduled",
        text: "Admission slot allocated",
        time: "10 mins ago"
      }
    ];

    const iconBox = document.getElementById("float-icon-box");
    const labelBox = document.getElementById("float-label-box");
    const descBox = document.getElementById("float-desc-box");
    const stampBox = document.getElementById("float-stamp-box");

    if (!iconBox || !labelBox || !descBox || !stampBox) return;

    let currentIndex = 0;

    const getIconSvg = (type) => {
      switch (type) {
        case "whatsapp":
          return `<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.348l1.157 1.157L5.25 21l2.495-1.18 1.158 1.158c1.325 1.414 3.244 2.272 5.347 2.272z" /></svg>`;
        case "counselling":
          return `<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zM14.25 15h.008v.008H14.25V15zm0 2.25h.008v.008H14.25v-.008zm2.25-2.25h.008v.008H16.5V15zm0 2.25h.008v.008H16.5v-.008z" /></svg>`;
        case "submitted":
          return `<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
        default:
          return `<svg class="w-4 h-4 text-primary-base" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21l8.913-6.236m-8.913 1.14l-2.261 4.796M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
      }
    };

    const runRotation = () => {
      const data = notifications[currentIndex];

      // Fade out
      const container = document.getElementById("floating-notification-widget");
      if (container) {
        container.style.opacity = "0";
        container.style.transform = "scale(0.95)";
      }

      setTimeout(() => {
        // Change contents
        labelBox.textContent = data.badge;
        descBox.textContent = data.text;
        stampBox.textContent = data.time;
        iconBox.innerHTML = getIconSvg(data.type);

        // Color theme adjustments
        iconBox.className = `p-2 rounded-full ${
          data.type === 'whatsapp' ? 'bg-emerald-50' :
          data.type === 'counselling' ? 'bg-amber-50' :
          data.type === 'submitted' ? 'bg-blue-50' : 'bg-blue-50'
        }`;

        // Fade back in
        if (container) {
          container.style.opacity = "1";
          container.style.transform = "scale(1)";
        }

        // Increment index
        currentIndex = (currentIndex + 1) % notifications.length;
      }, 400);
    };

    // Initialize display and start loop
    runRotation();
    setInterval(runRotation, 4500);
  };

  // --- SMOOTH INTERNAL LAZY ANCHOR NAVIGATION ---
  const initSmoothScroll = () => {
    const triggerButtons = document.querySelectorAll("[data-scroll-to]");
    triggerButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute("data-scroll-to");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  };

  // --- SCROLL REVEAL (INTERSECTION OBSERVER) ---
  const initScrollReveals = () => {
    const revealItems = document.querySelectorAll(".reveal-on-scroll");
    
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // Optional: unobserve once revealed
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      });

      revealItems.forEach(item => observer.observe(item));
    } else {
      // Fallback for older browsers
      revealItems.forEach(item => item.classList.add("active"));
    }
  };

  // --- HEADER SCROLL DETECTOR ---
  const initHeaderScroll = () => {
    const header = document.getElementById("main-app-header");
    if (!header) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  };

  // --- FAQ ACCORDION ENGINE ---
  const initFaqAccordions = () => {
    const faqCards = document.querySelectorAll(".faq-item-card");
    
    faqCards.forEach(card => {
      const btn = card.querySelector(".faq-btn");
      const iconContainer = btn.querySelector(".faq-icon-holder");

      btn.addEventListener("click", () => {
        const isOpen = card.classList.contains("is-open");

        // Close all other panels for elegant accordion feel
        faqCards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove("is-open");
            const otherIcon = otherCard.querySelector(".faq-icon-holder");
            if (otherIcon) otherIcon.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`;
          }
        });

        // Toggle state of current panel
        if (isOpen) {
          card.classList.remove("is-open");
          if (iconContainer) iconContainer.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`;
        } else {
          card.classList.add("is-open");
          if (iconContainer) iconContainer.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" /></svg>`;
        }
      });
    });
  };

  // --- PREMIUM LEAD FORM & VALIDATION ---
  const initLeadForm = () => {
    const form = document.getElementById("admission-enquiry-lead-form");
    if (!form) return;

    const fields = {
      fullName: document.getElementById("input-fullname"),
      email: document.getElementById("input-email"),
      phone: document.getElementById("input-phone"),
      institution: document.getElementById("input-institution")
    };

    const errors = {
      fullName: document.getElementById("error-fullname"),
      email: document.getElementById("error-email"),
      phone: document.getElementById("error-phone")
    };

    const submitBtn = document.getElementById("form-submit-button");
    const container = document.getElementById("form-card-inner-box");

    // Live validation listener helper
    const clearError = (fieldKey) => {
      if (errors[fieldKey]) {
        errors[fieldKey].classList.add("d-none");
      }
      if (fields[fieldKey]) {
        fields[fieldKey].classList.remove("border-rose-500");
        fields[fieldKey].classList.remove("is-invalid");
      }
    };

    if (fields.fullName) fields.fullName.addEventListener("input", () => clearError("fullName"));
    if (fields.email) fields.email.addEventListener("input", () => clearError("email"));
    if (fields.phone) fields.phone.addEventListener("input", () => clearError("phone"));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // 1. Validate name
      if (!fields.fullName.value.trim()) {
        errors.fullName.textContent = "Please enter your name.";
        errors.fullName.classList.remove("d-none");
        fields.fullName.classList.add("border-rose-500", "is-invalid");
        isValid = false;
      }

      // 2. Validate academic email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!fields.email.value.trim()) {
        errors.email.textContent = "Please enter an email address.";
        errors.email.classList.remove("d-none");
        fields.email.classList.add("border-rose-500", "is-invalid");
        isValid = false;
      } else if (!emailRegex.test(fields.email.value)) {
        errors.email.textContent = "Please enter a valid academic/work email.";
        errors.email.classList.remove("d-none");
        fields.email.classList.add("border-rose-500", "is-invalid");
        isValid = false;
      }

      // 3. Validate Indian mobile format
      const rawPhone = fields.phone.value.replace(/[\s-]/g, "");
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!fields.phone.value.trim()) {
        errors.phone.textContent = "Phone number is required.";
        errors.phone.classList.remove("d-none");
        fields.phone.classList.add("border-rose-500", "is-invalid");
        isValid = false;
      } else if (!phoneRegex.test(rawPhone)) {
        errors.phone.textContent = "Enter a valid 10-digit primary mobile number.";
        errors.phone.classList.remove("d-none");
        fields.phone.classList.add("border-rose-500", "is-invalid");
        isValid = false;
      }

      if (!isValid) return;

      // Submission simulation state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        <span>Processing Placement...</span>
      `;

      setTimeout(() => {
        // Render beautiful success DOM markup
        container.innerHTML = `
          <div id="form-success-state" class="text-center py-5 space-y-4">
            <div class="w-16 h-16 bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow" style="width: 64px; height: 64px;">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" style="width: 32px; height: 32px;"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </div>
            <div class="mb-4">
              <h3 class="font-heading font-bold text-dark text-2xl mb-2">Consultation Request Sent!</h3>
              <p class="text-sm text-secondary max-w-xs mx-auto leading-relaxed">
                Thank you for scheduling your session. An admissions growth specialist will reach out within 2 hours to confirm your time slot on Microsoft Teams/Zoom.
              </p>
            </div>
            <div class="pt-2">
              <button id="btn-success-reset" class="btn btn-outline-secondary btn-sm px-4 rounded-pill">
                Fill Another Request
              </button>
            </div>
          </div>
        `;

        // Success state resetting option
        const resetBtn = document.getElementById("btn-success-reset");
        if (resetBtn) {
          resetBtn.addEventListener("click", () => {
            window.location.reload();
          });
        }
      }, 1500);
    });
  };

  // --- STICKY MOBILE CTA DISPLAY THRESHOLD ---
  const initStickyCta = () => {
    const stickyCta = document.getElementById("sticky-mobile-cta");
    if (!stickyCta) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 450) {
        stickyCta.classList.add("visible");
      } else {
        stickyCta.classList.remove("visible");
      }
    });
  };

  // --- INITIALIZE ALL MODULES ---
  initPortalClock();
  initFloatingTicker();
  initSmoothScroll();
  initScrollReveals();
  initHeaderScroll();
  initFaqAccordions();
  initLeadForm();
  initStickyCta();
});
