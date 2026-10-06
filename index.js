import { blogData, heroData, aboutHtml } from "./data.js";

const mainContainer = document.getElementById("main-container");
const menuContainer = document.getElementById("menu-container");

const POSTS_PER_PAGE = 6;
let visibleCount = POSTS_PER_PAGE;

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

    if (e.target.id === "load-more-btn") {
        visibleCount += 3;
        renderBlogList();
    } else if (blogCard) {
        handleBlogClicks(blogCard.dataset.blog);
    } else if (e.target.id === "home-btn") {
        visibleCount = POSTS_PER_PAGE;
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

function renderBlogList() {
    const blogContainer = document.querySelector(".blog-container");
    const loadMoreBtn = document.getElementById("load-more-btn");

    const visiblePosts = blogData.slice(0, visibleCount);

    blogContainer.innerHTML = visiblePosts
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

    if (visibleCount >= blogData.length) {
        loadMoreBtn.classList.add("hidden");
    } else {
        loadMoreBtn.classList.remove("hidden");
    }
}

function renderHomePage() {
    mainContainer.innerHTML = `
        <div id="hero-section"></div>
        <div class="blog-container"></div>
        <div class="load-more-container">
            <button id="load-more-btn" class="load-more-btn">Load More</button>
        </div>
    `;
    renderHeroSection();
    renderBlogList();
    window.scrollTo({ top: 0, behavior: "smooth" });
}
