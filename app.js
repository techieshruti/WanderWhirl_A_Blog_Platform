document.addEventListener("DOMContentLoaded", () => {
    const commentIcons = document.querySelectorAll(".comment-icon");
    const cancelButtons = document.querySelectorAll(".cancel-comment");

    commentIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const blogContainer = icon.closest(".blog-container");
        const commentBox = blogContainer.querySelector(".comment-box");
        commentBox.style.display = "block";
        blogContainer.style.height = "98rem"; // Adjust to fit comment box
      });
    });

    cancelButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const blogContainer = btn.closest(".blog-container");
        const commentBox = blogContainer.querySelector(".comment-box");
        commentBox.style.display = "none";
        blogContainer.style.height = "80rem"; // Reset to original
      });
    });
  });


//   publish comment
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

      // Add the comment just below the comment box
      commentBox.parentElement.appendChild(newComment);

      textarea.value = ""; // Clear the textarea
    }
  });
});

// login signup
const authModal = document.getElementById("authModal");
const signupToggle = document.getElementById("signupToggle");
const loginToggle = document.getElementById("loginToggle");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

// Show modal on icon click (add ID to your icon in HTML, like id="loginIcon")
document.getElementById("loginIcon").addEventListener("click", () => {
  authModal.style.display = "flex";
});

// Toggle buttons
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

// Close modal on outside click
authModal.addEventListener("click", (e) => {
  if (e.target === authModal) {
    authModal.style.display = "none";
  }
});
