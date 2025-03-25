import VendingMachineManageModel from "../model/VendingMachineManageModel.js"
import VendingMachineManageView from "../view/VendingMachineManageView.js"

export default class VendingMachineManageController{
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    initialize = () => { 

    }

}

const vendingMachineManageModel = new VendingMachineManageModel();
const vendingMachineManageView = new VendingMachineManageView();
const vendingMachineManageController = new VendingMachineManageController(vendingMachineManageModel, vendingMachineManageView);
vendingMachineManageController.initialize();