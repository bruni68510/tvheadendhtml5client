'use scrict';

import { MenuItem} from "./MenuItem.js"

export class MenuList {

    constructor(options) {
        this.options = options;
    }


    render(selector) {
        for (const i in this.options) {
            var menu_options = this.options[i];
            const menuitem = new MenuItem(menu_options.data_id, menu_options.text, menu_options.url, menu_options.has_separator);
            menuitem.append(selector);
        }
    }
}
