/*
 * File: @mas/desktop/src/platform/preload.ts
 *
 * Copyright (c) 2023 - 2024 Maspectra Dev Team
 */

// import { exposeInMainWorld } from "@mas/core/parts/sandbox/electron-sandbox/preload";

function domReady(condition: DocumentReadyState[] = ["complete", "interactive"]): Promise<boolean> {
    return new Promise((resolve) => {
        if (condition.includes(document.readyState)) {
            resolve(true);
        } else {
            document.addEventListener("readystatechange", () => {
                if (condition.includes(document.readyState)) {
                    resolve(true);
                }
            });
        }
    });
}

const safeDOM = {
    append(parent: HTMLElement, child: HTMLElement) {
        if (!Array.from(parent.children).includes(child)) {
            return parent.appendChild(child);
        }
        return null;
    },
    remove(parent: HTMLElement, child: HTMLElement) {
        if (Array.from(parent.children).includes(child)) {
            return parent.removeChild(child);
        }
        return null;
    },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function spinning(): {
    appendLoading: () => void;
    removeLoading: () => void;
} {
    const className = "loaders-css__square-spin";
    const styleContent = `
  @keyframes square-spin {
    25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
    50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
    75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
    100% { transform: perspective(100px) rotateX(0) rotateY(0); }
  }
  .${className} > div {
    animation-fill-mode: both;
    width: 50px;
    height: 50px;
    background: #fff;
    animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
  }
  .app-loading-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #282c34;
    z-index: 9;
  }
      `;
    const oStyle = document.createElement("style");
    const oDiv = document.createElement("div");

    oStyle.id = "app-loading-style";
    oStyle.innerHTML = styleContent;
    oDiv.className = "app-loading-wrap";
    oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

    return {
        appendLoading() {
            safeDOM.append(document.head, oStyle);
            safeDOM.append(document.body, oDiv);
        },
        removeLoading() {
            safeDOM.remove(document.head, oStyle);
            safeDOM.remove(document.body, oDiv);
        },
    };
}

// ----------------------------------------------------------------------

// exposeInMainWorld();

const { appendLoading, removeLoading } = spinning();
domReady()
    .then(() => {
        appendLoading();
        window.addEventListener("message", (ev) => {
            if (ev.data.payload === "removeLoading") removeLoading();
        });

        const art =
            "%20_%20%20%20_%20%20%20%20%20%20_%20_%20%20%20%20%20%20%20%20___%20%20___%20%20%20%20%20%20_____%20%0A%7C%20%7C%20%7C%20%7C%20%20%20%20%7C%20%7C%20%7C%20%20%20%20%20%20%20%7C%20%20%5C%2F%20%20%7C%20%20%20%20%20%2F%20%20___%7C%0A%7C%20%7C_%7C%20%7C%20___%7C%20%7C%20%7C%20___%20%20%20%7C%20.%20%20.%20%7C%20__%20_%5C%20%60--.%20%0A%7C%20%20_%20%20%7C%2F%20_%20%7C%20%7C%20%7C%2F%20_%20%5C%20%20%7C%20%7C%5C%2F%7C%20%7C%2F%20_%60%20%7C%60--.%20%5C%0A%7C%20%7C%20%7C%20%7C%20%20__%7C%20%7C%20%7C%20(_)%20%7C%20%7C%20%7C%20%20%7C%20%7C%20(_%7C%20%2F%5C__%2F%20%2F%0A%5C_%7C%20%7C_%2F%5C___%7C_%7C_%7C%5C___%2F%20%20%5C_%7C%20%20%7C_%2F%5C__%2C_%5C____%2F%20";
        // eslint-disable-next-line no-console
        console.log(decodeURIComponent(art));
    })
    .catch(() => {});

setTimeout(removeLoading, 4999);
