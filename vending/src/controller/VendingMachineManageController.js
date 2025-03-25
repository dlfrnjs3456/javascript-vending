import VendingMachineManageModel from "../model/VendingMachineManageModel.js"
import VendingMachineManageView from "../view/VendingMachineManageView.js"

export default class VendingMachineManageController{
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    initialize = () => { 
        this.view.updateCharge(this.model.getPrevCharge());
        this.view.updateCoinTable(this.model.retCoinList());
        this.view.bindVendingMachineChargeBtn(this.handleVendingMachineChargeBtn.bind(this));
    }

    handleVendingMachineChargeBtn = (event) => {
        event.preventDefault();
        debugger
        const prevCharge = this.model.getPrevCharge();
        let inputCharge = this.view.getChargeInput();
        if(!this.model.validateCharge(inputCharge)) {
            alert("금액은 100원 이상 10원 단위로 나누어 떨어지게 넣어주세요");
            return;
        }
        const saveCharge = inputCharge + Number(prevCharge);
        this.model.setCurrentCharge(saveCharge);
        this.view.updateCharge(saveCharge);
        this.model.seperateCoin(inputCharge);
        this.view.updateCoinTable(this.model.retCoinList());
    }

}

const vendingMachineManageModel = new VendingMachineManageModel();
const vendingMachineManageView = new VendingMachineManageView();
const vendingMachineManageController = new VendingMachineManageController(vendingMachineManageModel, vendingMachineManageView);
vendingMachineManageController.initialize();