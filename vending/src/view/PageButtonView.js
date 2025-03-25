import {createBtn} from '../model/Utils/createButton.js'

export default class PageButtonView {
    renderBtn = (buttons) => {
        const app = document.getElementById("app");

        buttons.forEach(({text, id}) => {
            app.appendChild(this.createBtn(text,id));
        })
    }

}