import React from 'react';
import accountsStore from '../stores/accountsStore.js';
import PurchaseStore from '../stores/purchaseStore.js';
import rawItemsCatalogueStore from '../stores/rawItemCatalogueStore.js';
import Reflux from 'reflux';
import Actions from '../actions.js';
import InputComponentBuilder from './inputComponentBuilder.jsx';


var purchaseComp = React.createClass({
    render() {
        return <InputComponentBuilder key='production' {...this.getComponentProps()}/>
    },
    getComponentProps() {
        return {
            heading: 'Raw Material Purchase',
            eleList: [
                {
                    label: 'Items',
                    eleType: 'select',
                    refName: 'rawItemsList',
                    getOptionsList: this.getRawItemsList
                },
                {
                    label: 'Qty',
                    refName: 'qty',
                    eleType: 'input'
                }
            ],
            btns: [
                {
                    refName: 'purchaseBtn',
                    primary: true,
                    btnClickHandler: this.purchaseHandler,
                    label: 'Purchase'
                }
            ],
            inputComp: this
        }
    },
    getRawItemsList() {
        return rawItemsCatalogueStore.getItems().map(item => <option defaultValue={item.id} key={item.id}
                                                                     className='form-control'>{item.id}</option>)
    },
    purchaseHandler(inputEle) {
        Actions.purchase({itemId: inputEle.refs.rawItemsList.value, qty: parseInt(inputEle.refs.qty.value)});
    },
    checkBalance() {
        //var balance = accountsStore.getBalance();
        //var rawItem = rawItemsCatalogueStore.getItem(selectedItem.itemId);
        //var totalCost = rawItem.cost * qty;

    }
});

export default purchaseComp;
