import Reflux from 'reflux';
import Actions from '../actions.js';
import _ from 'lodash';

var itemsInventory = [];

export default Reflux.createStore({
    listenables: Actions,
    purchaseCompleted(purchaseDatails) {

        //add the item to the inventory
        this.addItem(purchaseDatails.itemId, purchaseDatails.qty);
        this.triggerChange();

    },
    addItem(itemId, qty) {
        var inventoryItem = _.findWhere(itemsInventory, {id: itemId});
        if (inventoryItem) {
            inventoryItem.count += qty;
        } else {
            itemsInventory.push({
                id: itemId,
                count: qty
            })
        }
    },
    getRawItems() {
        return _.cloneDeep(itemsInventory);
    },
    productionCompleted(cost, rawMaterialUsed) {
        rawMaterialUsed.map(item => {
            var inventoryItem = _.findWhere(itemsInventory, {id: item.itemId});
            if (inventoryItem) {
                inventoryItem.count -= item.qty;
            }
        });
        this.triggerChange()
    },
    triggerChange() {
        this.trigger('change', this.getRawItems());
    }
});
