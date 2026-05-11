const navRow = document.querySelector(".nav-row");
const anchorNav = document.querySelector(".anchor-nav");
const navToggle = document.querySelector(".nav-toggle");
const mobileNavPanel = document.querySelector(".mobile-nav-panel");

const allNavLinks = anchorNav
    ? Array.from(anchorNav.querySelectorAll("a"))
    : [];

function closeMoreMenu() {
    mobileNavPanel?.classList.remove("is-open");
    navToggle?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
}

function rebuildPriorityNav() {
    if (!navRow || !anchorNav || !navToggle || !mobileNavPanel) return;

    closeMoreMenu();

    allNavLinks.forEach((link) => {
        link.classList.remove("is-hidden");
    });

    mobileNavPanel.innerHTML = "";
    navToggle.classList.remove("has-hidden-links");

    const availableWidth = navRow.clientWidth - navToggle.offsetWidth - 120;

    let hiddenLinks = [];

    for (let i = allNavLinks.length - 1; i >= 0; i--) {
        const navIsOverflowing = anchorNav.scrollWidth > availableWidth;

        if (!navIsOverflowing) break;

        const link = allNavLinks[i];
        link.classList.add("is-hidden");
        hiddenLinks.unshift(link);
    }

    if (hiddenLinks.length > 0) {
        navToggle.classList.add("has-hidden-links");

        hiddenLinks.forEach((link) => {
            const clonedLink = link.cloneNode(true);
            clonedLink.classList.remove("is-hidden");

            clonedLink.addEventListener("click", closeMoreMenu);

            mobileNavPanel.appendChild(clonedLink);
        });
    }
}

if (navToggle && mobileNavPanel) {
    navToggle.addEventListener("click", () => {
        const isOpen = mobileNavPanel.classList.toggle("is-open");
        navToggle.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
}

window.addEventListener("load", rebuildPriorityNav);
window.addEventListener("resize", rebuildPriorityNav);