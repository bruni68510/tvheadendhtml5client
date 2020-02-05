'use scrict';

import {Channel} from "./Channel.js";

export class ChannelList {
    constructor(options) {
        this.options = options;
        this.channelList = [];
        this.currentChannel = 0;
    }

    render(selector) {

        const channelList = [];

        for (const i in this.options) {
            var channel_options = this.options[i];
            const channelItem = new Channel(
                channel_options.logo, channel_options.nr,
                channel_options.epg, channel_options.uuid,
                channel_options.url);
            channelItem.append(selector);
            channelList[channel_options.nr] = channelItem;
        }

        this.channelList = channelList.filter(function(el) {
            return el != null;
        })
    }

    showChannel(nr) {
        if (nr in this.channelList) {

            const channel = this.channelList[nr];

            this.channelList.forEach(function (el) {
                el.hide();
            }, this);

            channel.show();

            this.currentChannel = parseInt(nr);
        }
    }


    nextChannel() {
        console.log("next channel", this.currentChannel, this.channelList);

        if (this.currentChannel >= this.channelList.length-1) {
            this.showChannel(0);
        } else {
            this.showChannel(this.currentChannel + 1);
        }


    }

    previousChannel() {
        console.log("previous channel");

        if (this.currentChannel <= 0) {
            this.showChannel(this.channelList.length-1);
        } else {
            this.showChannel(this.currentChannel - 1);
        }


    }

    setupEvents() {

        this.channelList.forEach(function (el) {
            el.setupEvents(this.nextChannel.bind(this), this.previousChannel.bind(this));
        }, this);


    }
}
