import Reflux from 'reflux';
import actions from '../actions.js';
import RawItemsCatalogue from './rawItemCatalogueStore.js';
import ProductCatalogue from './productsCatalogueStore.js';

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
        var item = RawItemsCatalogue.getItem(purchaseDetails.itemId);
        var cost = item.cost * purchaseDetails.qty;
        totalPurchaseCost += cost;
        totalBalance -= cost;
        this.triggerChange();
    },
    sell(sale) {
        var product = ProductCatalogue.getProduct(sale.itemId);
        var price = product.price * sale.count;
        totalBalance += price;
        this.triggerChange();
    },
    triggerChange() {
        this.trigger('change', {totalBalance, totalPurchaseCost});
    },
    productionCompleted(cost) {

        totalBalance -= cost;
        this.triggerChange();
    }
});