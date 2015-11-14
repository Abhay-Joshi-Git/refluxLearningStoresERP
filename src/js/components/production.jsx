import React from 'react';
import ProductCatalogueStore from '../stores/productsCatalogueStore.js';
import Actions from '../actions.js';
import InputComponentBuilder from './inputComponentBuilder.jsx';
import ProductionStore from '../stores/productionStore.js';
import RawInventoryStore from '../stores/rawInventoryStore.js';
import Reflux from 'reflux';
import _ from 'lodash';
import AccountsStore from '../stores/accountsStore.js';

export default React.createClass({
    mixins: [
        Reflux.listenTo(RawInventoryStore, 'onChange'),
        Reflux.listenTo(AccountsStore, 'onAccountChange')
    ],
    onChange() {
        this.setProductionEnabledState();
    },
    onAccountChange() {
        this.setProductionEnabledState();
    },
    setProductionEnabledState() {
        this.setState({
            productionEnabled: this.checkResourceSufficiency(this.state.selPrd, this.state.qty)
        });
    },
    checkInventorySufficiency(selPrd, qty) {
        var rawMaterialInventory = RawInventoryStore.getRawItems();
        var prd = ProductCatalogueStore.getProduct(selPrd);
        var sufficiency = true;
        if (!prd) {
            return false;
        }
        prd.rawMaterial.map(item => {
            let rawItem = _.findWhere(rawMaterialInventory, {id: item.itemId});
            if (!((rawItem) && (rawItem.count >= (item.qty * qty)))) {
                sufficiency = false;
            }
        });
        return sufficiency;
    },
    checkBalanceSufficiency(selPrd, qty) {
        var balance = AccountsStore.getBalance();
        var prd = ProductCatalogueStore.getProduct(selPrd);
        if (!prd) {
            return false;
        }
        return balance >= prd.productionCost * qty;
    },
    checkResourceSufficiency(selPrd, qty) {
        return this.checkInventorySufficiency(selPrd, qty) && this.checkBalanceSufficiency(selPrd, qty);
    },
    render() {
        return <InputComponentBuilder key='production' {...this.getComponentProps()}/>
    },
    disableProduction() {
        if (this.state.productionEnabled) {
            this.setState({
                selPrd: this.state.selPrd,
                qty: this.state.qty,
                productionEnabled: false
            });
        }
    },
    onInputChange(inputEle) {
        if (!(inputEle && inputEle.refs)) {
            return;
        }
        this.setState({
            selPrd: inputEle.refs.prdList.value,
            qty: inputEle.refs.qty.value
        }, () => this.setProductionEnabledState());
    },
    getInitialState() {
        var products = ProductCatalogueStore.getProducts();
        var selPrd = products.length ? products[0].id : '';
        var qty = 1;
        return {
            selPrd: selPrd,
            qty: qty,
            productionEnabled : this.checkResourceSufficiency(selPrd, qty)
        }
    },
    getComponentProps() {
        return {
            heading: 'Production Floor',
                eleList: [
                {
                    label: 'Products',
                    eleType: 'select',
                    refName: 'prdList',
                    getOptionsList: this.getProductsList,
                    onChange: this.onInputChange
                },
                {
                    label: 'Qty',
                    refName: 'qty',
                    eleType: 'input',
                    onChange: this.onInputChange
                }
            ],
                btns: [
                {
                    refName: 'produce',
                    primary: true,
                    btnClickHandler: this.produce,
                    label: 'Produce',
                    enabled: this.state.productionEnabled
                }
            ],
            inputComp: this
        }
    },
    produce(inputEle) {
        if (this.state.productionEnabled) {
            Actions.produce({itemId: inputEle.refs.prdList.value, qty: parseInt(inputEle.refs.qty.value)});
        }
    },
    getProductsList() {
        return ProductCatalogueStore.getProducts().map(product => <option defaultValue={product.id} key={product.id} className='form-control'>{product.id}</option>);
    }
});