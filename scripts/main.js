import * as db from "./db.js";
let buttons = "";
for (let i = 0; i < db.contents.length; i++) {
    buttons +=`
    <a id="${db.contents[i].id}" class="button" href="${db.contents[i].link}" target="_blank">
        <svg>
            <title>
                ${db.contents[i].name}
            </title>
            <path fill="#000" d="${db.contents[i].img}">
            </path>
        </svg>
        <h2>
            ${db.contents[i].name}
        </h2>
    </a>`;
}

const display = document.getElementById("buttons");
display.innerHTML = buttons;
