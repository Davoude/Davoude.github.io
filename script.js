const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navLinks.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll(".case-shot").forEach((shot) => {
  const image = shot.querySelector("img");
  if (!image) return;

  const markLoaded = () => {
    if (image.naturalWidth > 0) shot.classList.add("has-image");
  };

  image.addEventListener("load", markLoaded);
  image.addEventListener("error", () => shot.classList.remove("has-image"));
  markLoaded();
});
