
// ==================================== NAV BAR ===============================================

// ========== NAV BAR HIGHLIGHT 
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    function changeActiveNav() {
        let scrollPosition = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100; // Adjust offset if needed
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href").substring(1) === section.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", changeActiveNav);
});


// ==================================== HOME SECTION ===============================================


document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".l-text");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            } else {
                entry.target.classList.remove("animate"); // Resets animation when out of view
            }
        });
    }, { threshold: 0 });

    projects.forEach(project => observer.observe(project));
});

// ==================================== ABOUT SECTION ===============================================

document.addEventListener("DOMContentLoaded", function () {
    const aboutBlocks = document.querySelectorAll(".about-reveal");

    if (!aboutBlocks.length) {
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            } else {
                entry.target.classList.remove("animate");
            }
        });
    }, { threshold: 0 });

    aboutBlocks.forEach(block => observer.observe(block));
});



// ==================================== EXPERIENCE SECTION ===============================================

// ========== EXPERIENCE SECTION ZOOM IN AND ZOOM OUT

document.addEventListener("DOMContentLoaded", () => {
    const zoomSection = document.querySelector(".secondsection");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    zoomSection.classList.add("visible"); // Zoom in
                } else {
                    zoomSection.classList.remove("visible"); // Zoom out
                }
            });
        },
        { threshold: 0 } // Trigger when 50% of the section is visible
    );

    observer.observe(zoomSection);
});

// ==================================== EXPERIENCE SECTION ===============================================

// ========== EXPERIENCE SECTION TIMELINE ANIMATION

document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            } else {
                entry.target.classList.remove("animate"); // Resets animation when out of view
            }
        });
    }, { threshold: 0 });

    projects.forEach(project => observer.observe(project));
});


// ==================================== SKILL SECTION ===============================================

// ========== SKILL SECTION CARD ANIMATION

document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".skill-card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            } else {
                entry.target.classList.remove("animate"); // Resets animation when out of view
            }
        });
    }, { threshold: 0 });

    projects.forEach(project => observer.observe(project));
});



// ==================================== PROJECT SECTION ===============================================

// ========== PROJECT SECTION TEXT SHAPE RIGHT ANIMATION

document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            } else {
                entry.target.classList.remove("animate"); // Resets animation when out of view
            }
        });
    }, { threshold: 0 });

    projects.forEach(project => observer.observe(project));
});

document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".info-box");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            } else {
                entry.target.classList.remove("animate"); // Resets animation when out of view
            }
        });
    }, { threshold: 0 });

    projects.forEach(project => observer.observe(project));
});

// ========== PROJECT SECTION FOR CLICKING EVENT & ANIMATION

document.addEventListener("DOMContentLoaded", function () {
    const projectLinks = document.querySelectorAll(".project ul li a");

    projectLinks.forEach(link => {
        link.addEventListener("mouseover", function () {
            const projectInfo = this.getAttribute("data-info");

            const categoryBox = this.closest(".catego");
            const infoBox = categoryBox.querySelector(".info-box .info-text");
            const infoImage = categoryBox.querySelector(".info-box img");

            // Clear any existing timeouts to prevent conflicts
            clearTimeout(categoryBox.infoShowTimeout);
            clearTimeout(categoryBox.imageShowTimeout);
            clearTimeout(categoryBox.infoHideTimeout);

            // Hide image immediately
            infoImage.classList.add("img-hide");
            infoImage.classList.remove("img-show");

            // Schedule info display after 500ms
            categoryBox.infoShowTimeout = setTimeout(() => {
                infoBox.innerHTML = projectInfo;
                infoBox.classList.add("fade-in");
                infoBox.style.display = "block";
            }, 180);
        });

        link.addEventListener("mouseout", function () {
            const categoryBox = this.closest(".catego");
            const infoBox = categoryBox.querySelector(".info-box .info-text");
            const infoImage = categoryBox.querySelector(".info-box img");

            // Clear existing timeouts
            clearTimeout(categoryBox.infoShowTimeout);
            clearTimeout(categoryBox.imageShowTimeout);
            clearTimeout(categoryBox.imageShowTimeout);

            // Start fade-out animation
            infoBox.classList.remove("fade-in");
            infoBox.classList.add("fade-out");

            // Schedule info cleanup and image display
            categoryBox.infoHideTimeout = setTimeout(() => {
                infoBox.innerHTML = "";
                infoBox.style.display = "none";
                infoBox.classList.remove("fade-out");

                // Show image after info is hidden
                categoryBox.imageShowTimeout = setTimeout(() => {
                    infoImage.classList.remove("img-hide");
                    infoImage.classList.add("img-show");
                }, 10);
            }, 100);
        });
    });

    // Image clicking to change images in a loop (for each category)
    document.querySelectorAll(".catego .info-box img").forEach(infoImage => {
        infoImage.addEventListener("click", function () {
            let imageList = this.getAttribute("data-images").split(",");
            let currentIndex = parseInt(this.getAttribute("data-index"));

            currentIndex = (currentIndex + 1) % imageList.length;

            // Apply fade transition
            this.classList.add("fade");
            setTimeout(() => {
                this.src = imageList[currentIndex].trim();
                this.classList.remove("fade");
            }); // add number dealy image clicking

            this.setAttribute("data-index", currentIndex);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.rel = "noopener noreferrer";
    });
});

// ========== PROJECT SECTION AUTOMATIC ADJUSTMANTS

document.addEventListener("DOMContentLoaded", function () {
    // Delay the execution by 3 seconds (3000 milliseconds)
    setTimeout(function () {
        const categoryBoxes = document.querySelectorAll(".catego");

        categoryBoxes.forEach(categoryBox => {
            const infoBox = categoryBox.querySelector(".info-box");
            const infoText = categoryBox.querySelector(".info-text");
            const infoImage = categoryBox.querySelector(".info-image");

            // Function to calculate and set the height of .info-box
            const setInfoBoxHeight = () => {
                // Temporarily show both text and image to calculate the maximum height
                infoText.style.display = "block";
                infoImage.style.display = "block";

                // Calculate the heights
                const textHeight = infoText.offsetHeight;
                const imageHeight = infoImage.offsetHeight;

                // Set the fixed height to the maximum of the two
                infoBox.style.height = `${Math.max(textHeight, imageHeight)}px`;

                // Hide the text again
                infoText.style.display = "none";
            };

            // Ensure the image is fully loaded before calculating its height
            if (infoImage.complete) {
                // If the image is already loaded, set the height immediately
                setInfoBoxHeight();
            } else {
                // If the image is not yet loaded, wait for it to load
                infoImage.addEventListener("load", setInfoBoxHeight);
            }

            // Recalculate height on window resize to handle responsive design
            window.addEventListener("resize", setInfoBoxHeight);
        });
    }, 3500);
});

// ==================================== CONTACT SECTION ===============================================


// ========== CONTACT SECTION ICON TEXT ANIMATION


document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".contactme");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            } else {
                entry.target.classList.remove("animate"); // Resets animation when out of view
            }
        });
    }, { threshold: 0 });

    projects.forEach(project => observer.observe(project));
});
