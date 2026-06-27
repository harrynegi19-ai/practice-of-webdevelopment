// --- Interactive Typing Animation Loop ---
const words = ["B.Tech CSE Student", "Web Developer", "AI Enthusiast"];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const targetTextElement = document.getElementById("typing-text");

function typeEffect() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
        targetTextElement.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        targetTextElement.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentWord.length) {
        speed = 2000; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length; // Rotate loop
        speed = 400; // Small delay before typing next word
    }

    setTimeout(typeEffect, speed);
}

// --- Dark/Light Preference System ---
const darkModeBtn = document.getElementById("darkModeBtn");
const themeIcon = darkModeBtn.querySelector("i");

// Initialize from device or last local session cache
const activeTheme = localStorage.getItem("theme");
if (activeTheme === "dark") {
    document.body.classList.add("dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
}

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    
    localStorage.setItem("theme", isDark ? "dark" : "light");
    
    if (isDark) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
    }
});

// Kick off initialization
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});