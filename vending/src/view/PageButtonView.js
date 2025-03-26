import {createBtn} from '../model/Utils/createBtn.js'

export default class PageButtonView {
    renderBtn = (buttons) => {
        const app = document.getElementById("app");

        buttons.forEach(({text, id}) => {
            app.appendChild(createBtn(text,id, "id"));
        })
    }

}