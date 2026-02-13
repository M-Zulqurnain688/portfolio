let current = 0;

function scrollToProjects() {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}

// Gallery functions
function openGallery(projectIndex = 0) {
    const slides = document.querySelectorAll(".slide");
    slides.forEach(s => s.classList.remove("active"));
    // Only show slides belonging to this project
    let startIndex = 0;
    if (projectIndex === 1) startIndex = 4;  // Project 2 slides start
    if (projectIndex === 2) startIndex = 7;  // Project 3 slides start
    slides[startIndex].classList.add("active");
    current = startIndex;

    document.getElementById("gallery").style.display = "flex";
    updateCounter();
}

function closeGallery() {
    document.getElementById("gallery").style.display = "none";
}

function getSlides() {
    return document.querySelectorAll(".slide");
}

function showSlide(index) {
    const slides = getSlides();
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");
    current = index;
    updateCounter();
}

function nextSlide() {
    const slides = getSlides();
    let nextIndex = (current + 1) % slides.length;
    showSlide(nextIndex);
}

function prevSlide() {
    const slides = getSlides();
    let prevIndex = (current - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function updateCounter() {
    const counter = document.getElementById("counter");
    const slides = getSlides();
    counter.innerText = (current + 1) + " / " + slides.length;
}

// Skills animation
function animateSkills() {
    const fills = document.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
        const width = fill.dataset.width;
        fill.style.width = '0';
        setTimeout(() => {
            fill.style.width = width;
        }, 100);
    });
}

// Animate skills on click
document.getElementById('skills-link').addEventListener('click', animateSkills);

// Animate skills on scroll
const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.5 });
observer.observe(skillsSection);

// Mobile swipe support for gallery
let startX = 0;
let galleryBody = document.querySelector('.gallery-body');
galleryBody.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; });
galleryBody.addEventListener('touchend', function (e) {
    let endX = e.changedTouches[0].clientX;
    let diff = endX - startX;
    if (diff > 50) prevSlide();
    else if (diff < -50) nextSlide();
});