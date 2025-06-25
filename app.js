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
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html"; // or login page
}

// --------------------- BLOG PAGE CRUD (Only runs in blog.html) ---------------------
const blogForm = document.getElementById("blogForm");
const blogList = document.getElementById("blogList");
const userBlogSection = document.getElementById("userBlogSection");
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
let editIndex = null;
const loggedInUser = localStorage.getItem("loggedInUser");

if (userBlogSection && loggedInUser) {
  userBlogSection.style.display = "block";
  renderBlogs();
}

if (blogForm) {
  blogForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("blogTitle").value;
    const image = document.getElementById("blogImage").value;
    const content = document.getElementById("blogContent").value;

    const newBlog = {
      title,
      image,
      content,
      user: loggedInUser,
    };

    if (editIndex !== null) {
      blogs[editIndex] = newBlog;
      editIndex = null;
    } else {
      blogs.push(newBlog);
    }

    localStorage.setItem("blogs", JSON.stringify(blogs));
    blogForm.reset();
    renderBlogs();
  });
}

function renderBlogs() {
  blogList.innerHTML = "";
  blogs.forEach((blog, index) => {
    if (blog.user === loggedInUser) {
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");
      blogCard.innerHTML = `
        <h3>${blog.title}</h3>
        <img src="${blog.image}" alt="${blog.title}" style="width:100%;max-height:200px;object-fit:cover"/>
        <p>${blog.content}</p>
        <button onclick="editBlog(${index})">Edit</button>
        <button onclick="deleteBlog(${index})">Delete</button>
      `;
      blogList.appendChild(blogCard);
    }
  });
}

window.editBlog = function (index) {
  const blog = blogs[index];
  document.getElementById("blogTitle").value = blog.title;
  document.getElementById("blogImage").value = blog.image;
  document.getElementById("blogContent").value = blog.content;
  editIndex = index;
};

window.deleteBlog = function (index) {
  if (confirm("Are you sure you want to delete this blog?")) {
    blogs.splice(index, 1);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    renderBlogs();
  }
};
