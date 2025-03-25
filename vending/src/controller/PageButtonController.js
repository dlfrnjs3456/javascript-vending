import {pageMove} from '../model/Utils/pageMove.js'

export default class PageButtonController { 
    constructor(model, view) { 
        this.model = model;
        this.view = view;
    }

    init = () => { 
        this.view.renderBtn(this.model);
        pageMove();
    }
}