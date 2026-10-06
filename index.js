import { blogData, heroData, aboutHtml } from "./data.js";

const mainContainer = document.getElementById("main-container");
const menuContainer = document.getElementById("menu-container");

renderHomePage();

document.addEventListener("click", (e) => {
    const blogCard = e.target.closest("[data-blog]");
    const isMenuBtn = e.target.closest(".menu-btn");

    if (isMenuBtn) {
        menuContainer.classList.toggle("hidden");
        return;
    }

    if (
        !menuContainer.contains(e.target) &&
        !menuContainer.classList.contains("hidden")
    ) {
        menuContainer.classList.add("hidden");
    }

    if (blogCard) {
        handleBlogClicks(blogCard.dataset.blog);
    } else if (e.target.id === "home-btn") {
        renderHomePage();
    } else if (e.target.id === "about-btn") {
        renderAboutPage();
    }
});

function renderAboutPage() {
    mainContainer.innerHTML = aboutHtml;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleBlogClicks(blogId) {
    const id = Number(blogId);
    const post = id === 0 ? heroData : blogData.find((b) => b.id === id);

    if (!post) return;

    mainContainer.innerHTML = `
        <article class="post-container">
            <span class="post-date">${post.date}</span>
            <h1 class="post-title">${post.title}</h1>
            <p class="post-summary">${post.summary}</p>
            <img class="post-img" src="${post.img}" alt="${post.alt || ""}"/>
            <div class="post-body">${post.body}</div>
        </article>
    `;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHeroSection() {
    document.querySelector("#hero-section").innerHTML = `
        <section class="hero-container" data-blog="${heroData.id}">
            <div class="hero flex">
                <span>${heroData.date}</span>
                <h2>${heroData.title}</h2>
                <p>${heroData.summary}</p>
            </div>
        </section>
    `;
}

function getBlogsHtml() {
    const blogContainer = document.querySelector(".blog-container");
    blogContainer.innerHTML = blogData
        .map(
            (blog) => `
            <section class="blog-sec flex" data-blog="${blog.id}">
                <img src="${blog.img}" class="blog-img" alt="${blog.alt || ""}" />
                <span>${blog.date}</span>
                <h2>${blog.title}</h2>
                <p>${blog.summary}</p>
            </section>
        `,
        )
        .join("");
}

function renderHomePage() {
    mainContainer.innerHTML = `
        <div id="hero-section"></div>
        <div class="blog-container"></div>
    `;
    renderHeroSection();
    getBlogsHtml();
    window.scrollTo({ top: 0, behavior: "smooth" });
}
