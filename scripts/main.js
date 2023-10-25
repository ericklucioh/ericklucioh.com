import * as db from "./db.js";
let buttons = "";
for (let i = 0; i < db.contents.length; i++) {
    buttons +=`
    <a id="${db.contents[i].id}" class="button" href="${db.contents[i].link}" target="_blank">
        <div class="intern">
            ${db.contents[i].img}
            <h2>
                ${db.contents[i].name} 
            </h2>
        </div>
    </a>`;

}

const display = document.getElementById("buttons");
display.innerHTML = buttons;
