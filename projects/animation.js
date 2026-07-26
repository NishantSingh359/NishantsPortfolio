
document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".anime");

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