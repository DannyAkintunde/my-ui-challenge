// simple utility script to load custom icons

const iconClass = "icon";
const iconRoot = new URL("assets", window.location.href);

async function fetchIcon(iconName) {
    const result = await fetch(iconRoot.toString() + `/icons/${iconName}.svg`);
    return await result.text();
}

const iconParentObserver = new MutationObserver((mutations, observer) => {
    mutations.forEach(async (mutation) => {
        if (mutation.type == "childList") {
            const containsIcon = mutation.addedNodes
                .entries()
                .find(
                    ([_, el]) =>
                        el.classList?.contains(iconClass) &&
                        el.tagName !== "svg"
                );
            if (containsIcon) {
                const [_, icon] = containsIcon;
                await loadIcon(icon);
            }
        } else {
            if (
                mutation.attributeName == "data-icon" &&
                mutation.target.classList?.contains(iconClass)
            ) {
                await loadIcon(mutation.target);
            }
        }
    });
});

async function loadIcon(iconPlaceholder) {
    const iconName = iconPlaceholder.dataset.icon;
    const iconData = await fetchIcon(iconName);
    // console.log(iconData);
    const icon = document.createElement("div");
    icon.innerHTML = iconData;
    const iconSVG = icon.querySelector("svg");
    if (iconSVG !== null) {
        iconSVG.dataset.icon = iconName;
        iconSVG.classList.add(iconClass);
    }

    iconPlaceholder.replaceWith(...icon.childNodes);
}

function loadIcons() {
    document
        .querySelectorAll(`.${iconClass}`)
        .forEach(async (iconPlaceholder) => {
            const parent = iconPlaceholder.parentElement;
            await loadIcon(iconPlaceholder);
            iconParentObserver.observe(parent, {
                childList: true,
                attributes: true,
                subtree: true,
            });
        });
}

loadIcons();
