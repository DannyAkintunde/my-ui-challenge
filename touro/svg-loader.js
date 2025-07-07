// simple utility script to load custom icons

const iconRoot = new URL("touro/assets", window.origin);

async function fetchIcon(iconName) {
    const result = await fetch(iconRoot.toString() + `icons/${iconName}.svg`);
    return await result.text();
}

function loadIcons() {
    document.querySelectorAll(".icon").forEach(async (iconPlaceholder) => {
        const iconName = iconPlaceholder.dataset.icon;
        const iconData = await fetchIcon(iconName);
        // console.log(iconData);
        const icon = document.createElement("div");
        icon.innerHTML = iconData;
        iconPlaceholder.replaceWith(...icon.childNodes);
    });
}

loadIcons();
