'use scrict';

export class MenuItem {

    constructor(data_id, text, url, has_separator) {
        this.text = text;
        this.url = url;
        this.has_separator = has_separator;
        this.data_id = data_id;
    }

    compile() {

        if (this.has_separator) {
            return `<div class="menu_item"> <img src="${this.url}"/> <span>${this.text}</span><hr></div>`;
        }
        else {
            return `<div class="menu_item selectable" data-id="${this.data_id}"> <img src="${this.url}"/> <span>${this.text}</span></div>`;
        }
    }

    append(selector) {
        var el = document.getElementById(selector);

        if (el) {
            el.innerHTML = el.innerHTML + this.compile();
        }
    }

}
