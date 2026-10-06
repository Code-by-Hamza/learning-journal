import { blogData } from "./data.js";
import { heroData } from "./data.js";

// !Temp
renderHomePage();
// !Temp

document.addEventListener("click", (e) => {
    if (e.target.closest(".menu-btn")) {
        toggleDisplay("menu-container");
    } else if (e.target.dataset.blog) {
        handleBlogClicks(e.target.dataset.blog);
    } else if (e.target.id === "home-btn") {
        renderHomePage();
    } 
});

function handleBlogClicks(blogId) {
    const fullPostObj = blogData.find((blog) => blog.id === Number(blogId))
        ? blogData.find((blog) => blog.id === Number(blogId))
        : heroData;

    console.log(fullPostObj);

    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = `
    <span>${fullPostObj.date}</span>
    <h2>${fullPostObj.title}</h2>
    <p>${fullPostObj.summary}</p>
    <img src="${fullPostObj.img}"/>
    <div>${fullPostObj.body}</div>
    `;
}

//// delete this later
// function showFullBlog(){
//     const params = new URLSearchParams(window.location.search)
// const postId = params.get('id')
// const currentPost = blogData.find(blog => blog.id === postId)
// const postContainer = document.getElementById('main-container')

// if (currentPost) {
//   postContainer.innerHTML = `
//     <article class="full-post">
//       <p class="post-date">${currentPost.date}</p>
//       <h1>${currentPost.title}</h1>
//       <p class="post-lead">${currentPost.body}</p>
//       <img src="${currentPost.image}" alt="${currentPost.alt}">
//       <div class="post-content">
//         <p>${currentPost.fullContent || currentPost.body}</p>
//       </div>
//     </article>
//   `;
// } else {
//   postContainer.innerHTML = `<p>Post not found. <a href="index.html">Return home</a></p>`;
// }
// }

function toggleDisplay(id) {
    document.getElementById(id).classList.toggle("hidden");
}

function renderHeroSection() {
    document.querySelector("#hero-section").innerHTML = `
                <section class="hero-container" >
                <div class="hero flex">
                <span>${heroData.date}</span>
                <h2 data-blog="${heroData.id}">${heroData.title}</h2>
                <p>${heroData.summary}</p>
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
                    <h2>${blog.date}</h2>
                    <p>${blog.summary}</p>
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
