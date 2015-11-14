import React from 'react';
import accountsStore from '../stores/accountsStore.js';
import PurchaseStore from '../stores/purchaseStore.js';
import rawItemsCatalogueStore from '../stores/rawItemCatalogueStore.js';
import Reflux from 'reflux';
import Actions from '../actions.js';
import InputComponentBuilder from './inputComponentBuilder.jsx';

var purchaseComp = React.createClass({
    mixins: [
        Reflux.listenTo(accountsStore, 'onAccountStoreChange')
    ],
    onAccountStoreChange() {
        this.setPurchaseEnabledState();
    },
    setPurchaseEnabledState() {
        this.setState({
            purchaseEnabled: this.checkBalanceSufficiency(this.state.selItem, this.state.qty)
        })
    },
    checkBalanceSufficiency(selItem, qty) {
        var balance = accountsStore.getBalance();
        var rawMaterial = rawItemsCatalogueStore.getItem(selItem);
        if (!rawMaterial) {
            return false;
        }
        return (balance >= (rawMaterial.cost * qty));
    },
    onInputChange(inputEle) {
        this.setState({
            selItem: inputEle.refs.rawItemsList.value,
            qty: inputEle.refs.qty.value
        }, () => this.setPurchaseEnabledState())
    },
    render() {
        return <InputComponentBuilder key='production' {...this.getComponentProps()}/>
    },
    getInitialState() {
        return {
            selItem: rawItemsCatalogueStore.getItems()[0].id,
            qty: 1,
            purchaseEnabled: true
        }
    },
    getComponentProps() {
        return {
            heading: 'Raw Material Purchase',
            eleList: [
                {
                    label: 'Items',
                    eleType: 'select',
                    refName: 'rawItemsList',
                    getOptionsList: this.getRawItemsList,
                    onChange: this.onInputChange
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
                    label: 'Purchase',
                    enabled: this.state.purchaseEnabled
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
        if (this.state.purchaseEnabled) {
            Actions.purchase({itemId: inputEle.refs.rawItemsList.value, qty: parseInt(inputEle.refs.qty.value)});
        }
    }
});

export default purchaseComp;
