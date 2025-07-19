const mobileNav = document.querySelector(".mobile__nav-container");
const mobileNavToggle = document.querySelector("#menu-toggle");

let navOpen = false;
const openMenu = (e, close) => {
    navOpen = mobileNav.classList.toggle("active", close);
    if (navOpen) {
        mobileNav.ariaHidden = false;
        mobileNavToggle.innerHTML = `<i class="icon" data-icon="menu-close">`;
    } else {
        mobileNav.ariaHidden = true;
        mobileNavToggle.innerHTML = `<i class="icon" data-icon="menu">`;
    }
};

document.addEventListener("click", (e) => {
    if (mobileNavToggle.contains(e.target)) openMenu(e);
    else if (navOpen && !mobileNav.contains(e.target)) openMenu(e, false);
});

const tabbers = document.querySelectorAll(".tabber");

tabbers.forEach((tabber) => {
    const tabList = tabber.querySelector(".tabber__tabs");
    const tabPanels = tabber.querySelector(".tabber__tabpanels");
    let activeTab = tabList.querySelector(".active");

    tabList.addEventListener("click", (e) => {
        if (
            e.target.classList.contains("tabber__tab") &&
            !activeTab.contains(e.target)
        ) {
            //deactivate tab
            activeTab.classList.toggle("active", false);
            activeTab.ariaSelected = false;
            tabPanels
                .querySelector(`[data-index="${activeTab.dataset.index}"]`)
                .classList.toggle("active", false);

            // activate tab
            e.target.classList.toggle("active", true);
            e.target.ariaSelected = true;
            tabPanels
                .querySelector(`[data-index="${e.target.dataset.index}"]`)
                .classList.toggle("active", true);
            activeTab = e.target;
        }
    });
});
