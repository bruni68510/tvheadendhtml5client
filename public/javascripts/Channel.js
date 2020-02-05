'use scrict';

import { Main} from "./Main.js"

var source = null;

export class Channel {

    constructor(logo, nr, epg, uuid, url) {
        this.logo = logo;
        this.nr = nr;
        this.epg = epg;
        this.uuid = uuid;
        this.url = url;
    }

    append(selector) {

        let el = document.querySelector(selector);

        if (el ){
            el.innerHTML = el.innerHTML + `
            <div id="channel_${this.nr}" class="channel hidden" data-id="${this.nr}">
                <div class="logo selectable">
                    <img class="logo_img" onerror="this.src='/images/channel.png'"/>
                    <img src="/images/arrow.png"   style="transform: rotateX(180deg)"/>
                </div>
                <div class="description selectable" data-url="${this.epg.url}"> 
                </div>
             </div>
            `;
        }
    }

    show() {

        const channel = document.getElementById("channel_" + this.nr);
        channel.classList.remove("hidden");
        channel.classList.add("visible");

        this.changeLogo();
        this.loadEPG();

    }

    changeLogo() {

        const channel = document.getElementById("channel_" + this.nr);
        const img = channel.querySelector(".logo .logo_img");
        img.src = this.logo;
    }

    loadEPG() {

        var widget = this;
        console.log(this.uuid);

        Main.getEPG(this.uuid, 1).then(response => {

            response.json().then(function(data) {

                console.log(data);

                const startDate = new Date(data.entries[0].start * 1000);
                const endDate = new Date(data.entries[0].stop * 1000);

                widget.epg.title = data.entries[0].title;
                widget.epg.start = startDate.getHours() + ":" + (parseInt(startDate.getMinutes()) < 10 ? "0" + startDate.getMinutes() : startDate.getMinutes());
                widget.epg.end = endDate.getHours() + ":" + (parseInt(endDate.getMinutes()) < 10 ? "0" + endDate.getMinutes() : endDate.getMinutes());
                try {
                    widget.epg.description = data.entries[0].subtitle || "";
                } catch(e) {
                    widget.epg.description = "";
                }


                const channel = document.getElementById("channel_" + widget.nr);
                const description = channel.querySelector(".description");

                description.innerHTML =
                    `<div class="title">${widget.epg.title} : ${widget.epg.start} - ${widget.epg.end} </div>
                 <hr>
                 <div class="details">${widget.epg.description}</div>`;

            });
        });


    }

    hide() {
        const channel = document.getElementById("channel_" + this.nr);
        channel.classList.remove("visible");
        channel.classList.add("hidden");
    }

    setupEvents(up, down) {
        let channel = document.getElementById("channel_" + this.nr);
        const description = channel.querySelector(".description");
        //const epg = this.epg;
        const widget = this;

        description.addEventListener("click", function(ev) {
            Main.toggleVideo(widget.url);
        });

        const nav = channel.querySelector(".logo img:last-child");

        nav.addEventListener("click", function(ev) {
            if (ev.offsetX > (window.width >= 1920 ? 40 : 20)) {
                up();
            } else {
                down();
            }
        });

        return channel;
    }

}
