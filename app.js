// --------------------- COMMENT FUNCTIONALITY ---------------------
document.addEventListener("DOMContentLoaded", () => {
  const commentIcons = document.querySelectorAll(".comment-icon");
  const cancelButtons = document.querySelectorAll(".cancel-comment");

  commentIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const blogContainer = icon.closest(".blog-container");
      const commentBox = blogContainer.querySelector(".comment-box");
      commentBox.style.display = "block";
      blogContainer.style.height = "98rem";
      blogContainer.style.paddingBottom = "1rem"; // ✅ add bottom padding
    });
  });

  cancelButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const blogContainer = btn.closest(".blog-container");
      const commentBox = blogContainer.querySelector(".comment-box");
      commentBox.style.display = "none";
      blogContainer.style.height = "80rem";
    });
  });
});

// --------------------- PUBLISH COMMENT ---------------------
const publishButtons = document.querySelectorAll(".comment-action button");

publishButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const commentBox = button.closest(".comment-box");
    const textarea = commentBox.querySelector("textarea");
    const commentText = textarea.value.trim();

    if (commentText !== "") {
      const newComment = document.createElement("p");
      newComment.textContent = commentText;
      newComment.style.marginTop = "0.5rem";
      newComment.style.padding = "0.5rem";
      newComment.style.border = "1px solid #ccc";
      newComment.style.borderRadius = "5px";
      newComment.style.backgroundColor = "#f9f9f9";

      commentBox.parentElement.appendChild(newComment);
      textarea.value = "";
    }
  });
});

// --------------------- AUTH MODAL TOGGLE ---------------------
const authModal = document.getElementById("authModal");
const signupToggle = document.getElementById("signupToggle");
const loginToggle = document.getElementById("loginToggle");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

document.getElementById("loginIcon").addEventListener("click", () => {
  authModal.style.display = "flex";
});

signupToggle.addEventListener("click", () => {
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  signupToggle.classList.add("active");
  loginToggle.classList.remove("active");
});

loginToggle.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  loginToggle.classList.add("active");
  signupToggle.classList.remove("active");
});

authModal.addEventListener("click", (e) => {
  if (e.target === authModal) {
    authModal.style.display = "none";
  }
});

// --------------------- SIGNUP FUNCTION ---------------------
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  localStorage.setItem(email, JSON.stringify({ password }));

  alert("Signup successful! Please log in.");
  signupForm.reset();
  loginToggle.click(); // switch to login tab
});

// --------------------- LOGIN FUNCTION ---------------------
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem(email));

  if (storedUser && storedUser.password === password) {
    localStorage.setItem("loggedInUser", email);
    window.location.href = "myblogs.html"; // ✅ redirect to blog page
  } else {
    alert("Invalid credentials!");
  }
});

// -------------------------LOGOUT----------------------
document.addEventListener("DOMContentLoaded", () => {
  const blogForm = document.getElementById("blogForm");
  const blogList = document.getElementById("blogList");
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    alert("Please login to create blogs.");
    return;
  }

  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  blogForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("blogTitle").value.trim();
    const image = document.getElementById("blogImage").value.trim();
    const content = document.getElementById("blogContent").value.trim();

    if (!title || !image || !content) {
      alert("All fields are required.");
      return;
    }

    const newBlog = {
      title,
      image,
      content,
      user: loggedInUser,
      createdAt: new Date().toISOString()
    };

    blogs.push(newBlog);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    blogForm.reset();
    renderBlogs(); // Optional: shows blog below form
  });

  function renderBlogs() {
    blogList.innerHTML = "";
    blogs.forEach((blog) => {
      if (blog.user === loggedInUser) {
        const blogCard = document.createElement("div");
        blogCard.innerHTML = `
          <h3>${blog.title}</h3>
          <img src="${blog.image}" width="200" />
          <p>${blog.content}</p>
        `;
        blogList.appendChild(blogCard);
      }
    });
  }

  renderBlogs();
});


// -------------------------user blog content-----------------------
// ------------------ RENDER USER BLOGS on blogs.html ONLY ------------------
document.addEventListener("DOMContentLoaded", () => {
  const userBlogsContainer = document.getElementById("userBlogs");

  // Only run this if the container exists (meaning we're on blogs.html)
  if (!userBlogsContainer) return;

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  if (blogs.length === 0) {
    userBlogsContainer.innerHTML = "<p style='text-align:center;'>No user blogs yet.</p>";
    return;
  }

  blogs.forEach((blog) => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-content";
    blogCard.innerHTML = `
      <div class="blog-container">
        <span>${blog.user} | Just now | 2 min read</span>
        <h1 style="font-family: Georgia, 'Times New Roman', Times, serif">
          ${blog.title}
        </h1>
        <div class="blog-img">
          <img src="${blog.image}" alt="${blog.title}" />
        </div>
        <div class="blog-text">
          <p>${blog.content}</p>
        </div>
      </div>
    `;
    userBlogsContainer.appendChild(blogCard);
  });
});
