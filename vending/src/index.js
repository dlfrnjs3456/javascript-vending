import {PageButtonModel} from './model/PageButtonModel.js'
import PageButtonView from './view/PageButtonView.js'
import PageButtonController from './controller/PageButtonController.js'

const model = PageButtonModel;
const view = new PageButtonView();
const controller = new PageButtonController(model, view);

controller.init();