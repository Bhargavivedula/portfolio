// ======================================================
// Portfolio Website JavaScript
// Vedula Bhargavi
// Front-End AI Engineer | Web Developer | BCA Student
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // MOBILE NAVIGATION
    // ==================================================

    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    if (hamburger && mobileMenu) {

        const toggleMenu = () => {
            const isOpen = mobileMenu.classList.toggle("open");

            hamburger.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        };

        const closeMenu = () => {
            mobileMenu.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
        };

        // Open / close menu
        hamburger.addEventListener("click", toggleMenu);

        // Keyboard accessibility
        hamburger.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleMenu();
            }
        });

        // Close when Escape is pressed
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close when clicking outside
        document.addEventListener("click", (event) => {
            if (
                !mobileMenu.contains(event.target) &&
                !hamburger.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Close menu after clicking a navigation link
        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        // Make available for HTML onclick if needed
        window.closeMobile = closeMenu;
    }


    // ==================================================
    // FADE-IN ANIMATION
    // ==================================================

    const fadeElements = document.querySelectorAll(".fade-in");

    if (fadeElements.length > 0) {

        // Fallback for browsers without IntersectionObserver
        if (!("IntersectionObserver" in window)) {

            fadeElements.forEach((element) => {
                element.classList.add("visible");
            });

        } else {

            const observer = new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observerInstance.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

            fadeElements.forEach((element) => {
                observer.observe(element);
            });
        }
    }


    // ==================================================
    // SMOOTH SCROLLING
    // ==================================================

    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            // Ignore empty "#" links
            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Update URL without jumping
                history.pushState(null, "", targetId);
            }
        });

    });


    // ==================================================
    // CONTACT FORM
    // ==================================================

    window.handleSend = function () {

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("msg");
        const status = document.getElementById("send-status");

        // Make sure required elements exist
        if (
            !nameInput ||
            !emailInput ||
            !messageInput ||
            !status
        ) {
            console.error(
                "Contact form elements were not found."
            );

            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();


        // ----------------------------------------------
        // Empty field validation
        // ----------------------------------------------

        if (!name || !email || !message) {

            status.textContent =
                "Please fill in all the fields.";

            status.style.color = "#f09595";

            return;
        }


        // ----------------------------------------------
        // Email validation
        // ----------------------------------------------

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            status.textContent =
                "Please enter a valid email address.";

            status.style.color = "#f09595";

            return;
        }


        // ----------------------------------------------
        // Create email
        // ----------------------------------------------

        const subject =
            `Portfolio message from ${name}`;

        const body =
`Hello Bhargavi,

You received a new message through your portfolio website.

Name: ${name}

Email: ${email}

Message:
${message}

--------------------------------
Portfolio Contact Form
`;


        const mailtoLink =
            `mailto:b2399322@gmail.com` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;


        // ----------------------------------------------
        // Open user's default email application
        // ----------------------------------------------

        window.location.href = mailtoLink;


        // ----------------------------------------------
        // Success message
        // ----------------------------------------------

        status.textContent =
            "✓ Opening your mail application...";

        status.style.color = "#52b788";


        // ----------------------------------------------
        // Clear form
        // ----------------------------------------------

        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
    };


    // ==================================================
    // CURRENT YEAR IN FOOTER
    // ==================================================

    const yearElement =
        document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    // ==================================================
    // ACTIVE NAVIGATION LINK
    // ==================================================

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        'nav a[href^="#"]'
    );

    if (sections.length > 0 && navLinks.length > 0) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            const currentId =
                                entry.target.getAttribute("id");

                            navLinks.forEach((link) => {

                                link.classList.remove(
                                    "active"
                                );

                                if (
                                    link.getAttribute("href") ===
                                    `#${currentId}`
                                ) {
                                    link.classList.add(
                                        "active"
                                    );
                                }

                            });

                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

});
