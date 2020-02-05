'use scrict';

import {MenuList} from "./MenuList.js";
import {ChannelList} from "./ChannelList.js";
import { Crypto } from "./Crypto.js";

var shared = typeof(global) === "object" ? global : window;

export class Main {

    static renderMenu() {
        const menu_items = new MenuList([
            {text: "TVHeadend Player", url: "/images/play2.png", has_separator: true},
            {data_id: "television", text: "Television", url: "/images/television2.png", has_separator: false},
            {data_id: "epg", text: "EPG", url: "/images/list.png", has_separator: false}
        ]);
        menu_items.render("menu");
    }

    static renderChannels(response) {

        if (response.ok) {
            response.json().then(function(value){
                let channelListDef = [];

                value.entries.forEach(element => {

                            channelListDef.push({
                                uuid : element.uuid,
                                nr: element.number,
                                name: element.name,
                                logo: "/logo?url=" + element.icon_public_url + "&encoded=" + shared.encoded,
                                //logo: "/images/channel.png",
                                epg: {
                                    title: element.number,
                                    start: "", end: "",
                                    description: ""
                                },
                                url: "/stream?channelnr=" + element.number + "&encoded=" + shared.encoded
                            });

                            if (channelListDef.length === value.entries.length) {
                                const sorted = channelListDef.sort(function(a,b) {
                                    return a.nr - b.nr;
                                });

                                const channelList = new ChannelList(sorted);
                                channelList.render("section#television #channel");
                                setTimeout(function() {
                                    channelList.showChannel(1);
                                    channelList.setupEvents();
                                }, 50);
                            }
                        });

            });

        } else {
            return new Error('Failed to load');
        }


    }


    static menuClickHandler() {
        document.querySelectorAll("aside#menu .selectable").forEach(function(el) {

            el.addEventListener("click", function() {
                var data_id = el.getAttribute("data-id");

                show_channel(data_id);
            });

        });

    }

    static getChannels(callback) {
        fetch("/channels/list?encoded=" + encodeURI(shared.encoded))
            .then(response => {
                callback(response);
            })
            .catch(err => {
                console.log(err);
            });

    }

    static getEPG(channelUUID, limit) {

        return new Promise(function(resolve, reject) {

            fetch("/epg/list?channel=" + channelUUID + "&limit=" + limit + "&encoded=" + shared.encoded )
                .then(response => resolve(response))
                .catch(response => {
                    console.log(response);
                    reject(response);
                });
        });
    }

    static cleanupConnections(cb) {

    }

    static toggleVideo(url) {
        const videoEl = document.getElementsByTagName("video");
        const videoElement = videoEl.item(0);
        if (window.source) {
            if (window.source.getAttribute("src") !== url) {
                videoElement.removeChild(window.source);
                window.source = null;
            }
        }
        if (!window.source) {
            window.source = document.createElement('source');
            window.source.setAttribute('src', url);
            videoElement.appendChild(window.source);
            videoElement.load();
            afterglow.getPlayer("myvideo").play();

        }
        else if (afterglow.getPlayer("myvideo").paused()) {
            afterglow.getPlayer("myvideo").play();
        } else {
            afterglow.getPlayer("myvideo").pause();
        }
    }

    static Main() {
        Main.getChannels(Main.renderChannels);
        Main.renderMenu();
        Main.menuClickHandler();
    }

}

const server_data = {
    server : "192.168.1.3",
    username: "admin",
    password: "zause1gt"
};

shared.encoded = null;

setTimeout(function() {
    Crypto.getEncryptionKey().then(function(key) {
        Crypto.encryptRequest(server_data, key).then(function(encoded) {
            shared.encoded = encoded;

            Main.Main();
        });
    });
}, 100);

