import Reflux from 'reflux';
import actions from '../actions.js';
import rawItemsStore from './rawItemCatalogueStore.js';

var totalBalance = 100;
var totalPurchaseCost = 0;


export default Reflux.createStore({
    listenables: actions,
    getBalance() {
        return totalBalance;
    },
    getTotalPurchaseCost() {
        return totalPurchaseCost;
    },
    purchaseCompleted(purchaseDetails) {
        var item = rawItemsStore.getItem(purchaseDetails.itemId);
        var cost = item.cost * purchaseDetails.count;
        totalPurchaseCost += cost;
        totalBalance -= cost;
        this.trigger('change', {totalBalance, totalPurchaseCost});
    }
});