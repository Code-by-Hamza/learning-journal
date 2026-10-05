import { blogData } from "./data.js";
import { heroData } from "./data.js";

// !Temp
renderHomePage();
// !Temp

document.addEventListener("click", (e) => {
    if (e.target.closest(".menu-btn")) {
        toggleDisplay("menu-container");
    }
});

function toggleDisplay(id) {
    document.getElementById(id).classList.toggle("hidden");
}

function renderHeroSection() {
    document.querySelector("#hero-section").innerHTML = `
    <section class="hero-container">
                <a href="#" class="hero flex">
                    <span>${heroData.date}</span>
                    <h2>${heroData.title}</h2>
                    <p>${heroData.summary}</p>
                </a>
            </section>
    `;
}

function getBlogsHtml() {
    let blogsHtml = "";
    const blogContainer = document.querySelector(".blog-container");
    blogsHtml = blogData
        .map((blog) => {
            return `<section class="blog-sec flex">
                    <a href="#">
                        <img src="${blog.img}" class="blog-img" />
                        <span>${blog.date}</span>
                        <h2>${blog.date}</h2>
                        <p>${blog.summary}</p>
                    </a>
                </section>
        `;
        })
        .join("");
    blogContainer.innerHTML = blogsHtml;
    console.log("heooo");
}

function renderHomePage() {
    renderHeroSection();
    getBlogsHtml();
}
