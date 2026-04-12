document.addEventListener("DOMContentLoaded", () => {
  const pageLoader = document.getElementById("page-loader");
  const sparkleLayer = document.getElementById("sparkle-layer");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const rotatingTitle = document.getElementById("rotating-title");
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  const yearEl = document.getElementById("year");

  function hideLoader() {
    if (!pageLoader) return;
    pageLoader.classList.add("hidden");
    setTimeout(() => {
      document.body.classList.remove("is-loading");
      pageLoader.remove();
    }, 320);
  }

  if (pageLoader) {
    if (document.readyState === "complete") {
      setTimeout(hideLoader, 450);
    } else {
      window.addEventListener(
        "load",
        () => {
          setTimeout(hideLoader, 1000);
        },
        { once: true },
      );
    }
  }

  function createSparkles() {
    if (!sparkleLayer) return;

    sparkleLayer.innerHTML = "";
    const isMobile = window.innerWidth < 768;
    const sparkleCount = isMobile ? 16 : 28;

    for (let index = 0; index < sparkleCount; index += 1) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle-dot";

      const size = 1 + Math.random() * 1.2;
      const left = Math.random() * 100;
      const duration = 9 + Math.random() * 9;
      const delay = -(Math.random() * duration);

      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.left = `${left}%`;
      sparkle.style.animationDuration = `${duration}s`;
      sparkle.style.animationDelay = `${delay}s`;

      sparkleLayer.appendChild(sparkle);
    }
  }

  createSparkles();
  let sparkleResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(sparkleResizeTimer);
    sparkleResizeTimer = setTimeout(createSparkles, 150);
  });

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function setMenuState(open) {
    if (!hamburger || !navMenu) return;
    navMenu.classList.toggle("active", open);
    hamburger.classList.toggle("active", open);
    hamburger.setAttribute("aria-expanded", String(open));

    const bars = hamburger.querySelectorAll(".bar");
    if (bars.length === 3) {
      bars[0].style.transform = open ? "translateY(6px) rotate(45deg)" : "none";
      bars[1].style.opacity = open ? "0" : "1";
      bars[2].style.transform = open
        ? "translateY(-6px) rotate(-45deg)"
        : "none";
    }
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      setMenuState(!navMenu.classList.contains("active"));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const href = link.getAttribute("href");
        const target = href ? document.querySelector(href) : null;
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setMenuState(false);
      });
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!navMenu.contains(target) && !hamburger.contains(target)) {
        setMenuState(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 840) {
        setMenuState(false);
      }
    });
  }

  // Highlight active section in navigation.
  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", active);
          });
        });
      },
      {
        root: null,
        threshold: 0.4,
      },
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Reveal sections/cards smoothly as they enter view.
  const revealTargets = document.querySelectorAll(
    ".section, .experience-item, .education-item, .project-card, .certification-item, .contact-form-container, .contact-card",
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  revealTargets.forEach((element) => {
    element.classList.add("fade-in");
    revealObserver.observe(element);
  });

  if (rotatingTitle) {
    const titles = [
      "Software Developer",
      "Full Stack Developer",
      "Backend Developer",
    ];

    let index = 0;
    setInterval(() => {
      index = (index + 1) % titles.length;
      rotatingTitle.style.opacity = "0";
      setTimeout(() => {
        rotatingTitle.textContent = titles[index];
        rotatingTitle.style.opacity = "1";
      }, 180);
    }, 2400);
  }

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = String(document.getElementById("name")?.value || "").trim();
      const email = String(
        document.getElementById("email")?.value || "",
      ).trim();
      const subject = String(
        document.getElementById("subject")?.value || "",
      ).trim();
      const message = String(
        document.getElementById("message")?.value || "",
      ).trim();

      if (!name || !email || !subject || !message) {
        formMessage.className = "form-message error";
        formMessage.textContent = "Please complete all fields before sending.";
        return;
      }

      // Graceful fallback for static hosting: open user's mail client.
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`,
      );
      const mailto = `mailto:mdgufranyt25@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailto;

      formMessage.className = "form-message success";
      formMessage.textContent =
        "Opening your email client. Thanks for reaching out!";
      contactForm.reset();
    });
  }
});
