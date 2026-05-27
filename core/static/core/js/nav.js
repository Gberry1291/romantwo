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


const duration = 1800;
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        const targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset;

        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;

        const duration = 1400;

        let start = null;

        function animation(currentTime) {

            if (start === null) start = currentTime;

            const timeElapsed = currentTime - start;

            const progress = Math.min(timeElapsed / duration, 1);

            const ease =
                progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(
                0,
                startPosition + distance * ease
            );

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    });
});