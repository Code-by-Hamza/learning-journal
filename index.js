import { blogData } from "./data.js";
import { heroData } from "./data.js";
import { aboutHtml } from "./data.js";

renderHomePage();

document.addEventListener("click", (e) => {
    if (e.target.closest(".menu-btn")) {
        toggleDisplay("menu-container");
    } else if (e.target.dataset.blog) {
        handleBlogClicks(e.target.dataset.blog);
    } else if (e.target.id === "home-btn") {
        toggleDisplay("menu-container");
        renderHomePage();
    } else if (e.target.id === "about-btn") {
        toggleDisplay("menu-container");
        renderAboutPage();
    }
});

function renderAboutPage() {
    document.getElementById("main-container").innerHTML = aboutHtml;
}

function handleBlogClicks(blogId) {
    const fullPostObj = blogData.find((blog) => blog.id === Number(blogId))
        ? blogData.find((blog) => blog.id === Number(blogId))
        : heroData;

    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = `
    <article class="post-container">
        <span class="post-date">${fullPostObj.date}</span>
        <h1 class="post-title">${fullPostObj.title}</h1>
        <p class="post-summary">${fullPostObj.summary}</p>
        <img class="post-img" src="${fullPostObj.img}" alt="${fullPostObj.alt || ""}"/>
        <div class="post-body">${fullPostObj.body}</div>
    </article>
    `;
}

function toggleDisplay(id) {
    document.getElementById(id).classList.toggle("hidden");
}

function renderHeroSection() {
    document.querySelector("#hero-section").innerHTML = `
                <section class="hero-container" >
                <div class="hero flex" data-blog="${heroData.id}">
                <span>${heroData.date}</span>
                <h2 data-blog="${heroData.id}">${heroData.title}</h2>
                <p data-blog="${heroData.id}">${heroData.summary}</p>
                </div>
                </section>
                `;
}

function getBlogsHtml() {
    let blogsHtml = "";
    const blogContainer = document.querySelector(".blog-container");
    blogsHtml = blogData
        .map((blog) => {
            return `<section class="blog-sec flex" >
                    <img src="${blog.img}" class="blog-img" data-blog="${blog.id}" />
                    <span>${blog.date}</span>
                    <h2 data-blog="${blog.id}">${blog.title}</h2>
                    <p data-blog="${blog.id}">${blog.summary}</p>
                    </section>
                    `;
        })
        .join("");
    blogContainer.innerHTML = blogsHtml;
}

function renderHomePage() {
    document.getElementById("main-container").innerHTML =
        `<div id="hero-section"></div>
            <div class="blog-container"></div>`;

    renderHeroSection();
    getBlogsHtml();
}
