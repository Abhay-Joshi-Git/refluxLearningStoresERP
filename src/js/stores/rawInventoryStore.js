import Reflux from 'reflux';
import actions from '../actions.js';
import _ from 'lodash';

var itemsInventory = [];

export default Reflux.createStore({
    purchaseCompleted(purchaseDatails) {

        //add the item to the inventory
        this.addItem(purchaseDatails.item, purchaseDatails.count);

    },
    addItem(itemId, count) {
        inventoryItem = _.findWhere(itemsInventory, {id: itemId});
        if (inventoryItem) {
            inventoryItem.qty += count;
        } else {
            itemsInventory.push({
                id: itemId,
                qty: count
            })
        }
    },
    getRawItemInventory() {
        return _.cloneDeep(itemsInventory);
    }
});
