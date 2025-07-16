const mobileNav = document.querySelector(".mobile__nav-container");
const mobileNavToggle = document.querySelector("#menu-toggle");

let navOpen = false;
const openMenu = (e, close) => {
    navOpen = mobileNav.classList.toggle("active", close);
    if (navOpen)
        mobileNavToggle.innerHTML = `<i class="icon" data-icon="menu-close">`;
    else mobileNavToggle.innerHTML = `<i class="icon" data-icon="menu">`;
};

document.addEventListener("click", (e) => {
    if (mobileNavToggle.contains(e.target)) openMenu(e);
    else if (navOpen && !mobileNav.contains(e.target)) openMenu(e, false);
});
