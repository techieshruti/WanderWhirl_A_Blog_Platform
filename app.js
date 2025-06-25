document.addEventListener("DOMContentLoaded", () => {
    const commentIcons = document.querySelectorAll(".comment-icon");
    const cancelButtons = document.querySelectorAll(".cancel-comment");

    commentIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const blogContainer = icon.closest(".blog-container");
        const commentBox = blogContainer.querySelector(".comment-box");
        commentBox.style.display = "block";
        blogContainer.style.height = "115rem"; // Adjust to fit comment box
      });
    });

    cancelButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const blogContainer = btn.closest(".blog-container");
        const commentBox = blogContainer.querySelector(".comment-box");
        commentBox.style.display = "none";
        blogContainer.style.height = "100rem"; // Reset to original
      });
    });
  });