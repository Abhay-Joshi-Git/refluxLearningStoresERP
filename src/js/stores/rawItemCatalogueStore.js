import Reflux from 'reflux';
import _ from 'lodash';

var itemsCatalogue = [
    {
        id: 'IronSheet',
        cost: 15
    },
    {
        id: 'AlSheet',
        cost: 30
    },
    {
        id: 'plasticSheet',
        cost: 10
    }
];

export default Reflux.createStore({
    getItems() {
        return itemsCatalogue;
    },
    getItem(ItemId) {
        return _.findWhere(itemsCatalogue, {id : ItemId});
    }
});