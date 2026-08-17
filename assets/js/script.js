'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



/*-----------------------------------*\
  #SCROLL REVEAL (seven-color cards fade/slide in as you scroll)
\*-----------------------------------*/

(function () {
  const revealSelectors = [
    ".service-item", ".stats-item", ".timeline-item",
    ".testimonials-item", ".project-item", ".blog-post-item",
    ".clients-item"
  ];

  const revealEls = document.querySelectorAll(revealSelectors.join(", "));

  if (!revealEls.length) return;

  revealEls.forEach(function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = Math.min(i % 8, 8) * 0.06 + "s";
  });

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach(function (el) { observer.observe(el); });

  // re-check when switching pages (elements hidden by [data-page] logic)
  document.querySelectorAll("[data-nav-link]").forEach(function (link) {
    link.addEventListener("click", function () {
      setTimeout(function () {
        document.querySelectorAll(".reveal:not(.in-view)").forEach(function (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight) el.classList.add("in-view");
        });
      }, 60);
    });
  });
})();



/*-----------------------------------*\
  #AVATAR FALLBACK (colorful initials when a photo is missing/broken)
\*-----------------------------------*/

(function () {
  const palette = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#3498db", "#8e6ff7", "#e84fc0"];

  function initialsAvatar(name, index) {
    const initials = (name || "?")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(function (w) { return w[0] ? w[0].toUpperCase() : ""; })
      .join("");

    const color = palette[index % palette.length];
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">' +
      '<rect width="120" height="120" rx="24" fill="' + color + '"/>' +
      '<text x="50%" y="54%" font-family="Poppins, sans-serif" font-size="46" ' +
      'font-weight="600" fill="#fff" text-anchor="middle" dominant-baseline="middle">' +
      initials + '</text></svg>';

    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  const avatarImgs = document.querySelectorAll(
    "[data-testimonials-avatar], [data-modal-img], .avatar-box img"
  );

  avatarImgs.forEach(function (img, i) {
    img.addEventListener("error", function () {
      const card = img.closest("[data-testimonials-item]");
      const nameEl = card ? card.querySelector("[data-testimonials-title]") : null;
      const name = nameEl ? nameEl.textContent : img.alt;
      img.src = initialsAvatar(name, i);
    }, { once: true });

    // catch images that are already broken (empty/missing src) before the browser fires 'error'
    if (!img.getAttribute("src")) {
      const card = img.closest("[data-testimonials-item]");
      const nameEl = card ? card.querySelector("[data-testimonials-title]") : null;
      const name = nameEl ? nameEl.textContent : img.alt;
      img.src = initialsAvatar(name, i);
    }
  });
})();