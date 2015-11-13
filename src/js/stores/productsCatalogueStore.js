import Reflux from 'reflux';
import _ from 'lodash';

var productsCatalogue = [
    {
        id: 'Bearings',
        productionCost: 40,
        rawMaterial: [
            {
                itemId: 'IronSheet',
                qty: 3
            },
            {
                itemId: 'AlSheet',
                qty: 1
            }
        ],
        price: 800
    },
    {
        id: 'valves',
        productionCost: 30,
        rawMaterial: [
            {
                itemId: 'IronSheet',
                qty: 2
            },
            {
                itemId: 'AlSheet',
                qty: 1
            },
            {
                itemId: 'plasticSheet',
                qty: 1
            }
        ],
        price: 700
    }
];

export default Reflux.createStore({
    getProducts() {
        return productsCatalogue;
    },
    getProduct(productId) {
        return _.findWhere(productsCatalogue, {id : productId});
    }
});