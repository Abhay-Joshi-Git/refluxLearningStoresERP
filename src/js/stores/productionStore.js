import Reflux from 'reflux';
import Actions from '../actions.js';
import ProductCatalogue from './productsCatalogueStore.js';
import _ from 'lodash';

var products = [];

export default Reflux.createStore({
    listenables: Actions,
    produce(production) {
        var product = ProductCatalogue.getProduct(production.itemId);
        this.addItem(production.itemId, production.qty);
        Actions.productionCompleted(product.productionCost * production.qty,
            product.rawMaterial.map(item => ({itemId: item.itemId, qty : item.qty * production.qty})), production);
        this.triggerChange();
    },
    addItem(itemId, qty) {
        var product = _.findWhere(products, {id: itemId});
        if (product) {
            product.count += qty;
        } else {
            products.push({
                id: itemId,
                count: qty
            })
        }
    },
    removeItem(itemId, qty) {
        var product = _.findWhere(products, {id: itemId});
        if (product.count > qty) {
            product.count -= qty;
        } else {
            _.remove(products, prd => prd.id === itemId);
        }
    },
    getProductsInfo() {
        return _.cloneDeep(products);
    },
    getProduct(itemId) {
        return _.findWhere(this.getProductsInfo(), {id: itemId});
    },
    saleCompleted(sale) {
        this.removeItem(sale.itemId, sale.count);
        this.triggerChange();
    },
    triggerChange() {
        this.trigger('change', this.getProductsInfo());
    }
});