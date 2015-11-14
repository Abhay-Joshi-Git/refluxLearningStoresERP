import React from 'react';
import accountsStore from '../stores/accountsStore.js';
import ProductCatalogueStore from '../stores/productsCatalogueStore.js';
import Reflux from 'reflux';
import Actions from '../actions.js';
import InputComponentBuilder from './inputComponentBuilder.jsx';
import ProductStore from '../stores/productionStore.js';
import SalesStore from '../stores/salesStore.js';

export default React.createClass({
    mixins: [
        Reflux.listenTo(ProductStore, 'onChange')
    ],
    onChange() {
        this.setSellsEnabledState();
    },
    setSellsEnabledState() {
        this.setState({
            sellBtnEnabled : this.checkProductSufficiency(this.state.selItem, this.state.qty)
        })
    },
    checkProductSufficiency(selItem, qty) {
        var prd = ProductStore.getProduct(selItem);
        if (!prd) {
            return false;
        }
        return (prd.count >= qty);
    },
    getInitialState() {
        var prd = ProductCatalogueStore.getProducts()[0].id;
        return {
            selItem: prd,
            qty: 1,
            sellBtnEnabled: this.checkProductSufficiency(prd, 1)
        }
    },
    onInputChange(inputEle) {
        this.setState({
            selItem: inputEle.refs.prdList.value,
            qty: inputEle.refs.qty.value
        }, () => this.setSellsEnabledState());
    },
    render() {
        return <InputComponentBuilder key='production' {...this.getComponentProps()}/>
    },
    getComponentProps() {
        return {
            heading: 'Sales Desk',
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
                    refName: 'sellBtn',
                    primary: true,
                    btnClickHandler: this.sell,
                    label: 'Sell',
                    enabled: this.state.sellBtnEnabled
                }
            ],
            inputComp: this
        }
    },
    sell(inputEle) {
        if (this.state.sellBtnEnabled) {
            Actions.sell({itemId: inputEle.refs.prdList.value, count: inputEle.refs.qty.value});
        }
    },
    getProductsList() {
        return ProductCatalogueStore.getProducts().map(product => <option defaultValue={product.id} key={product.id} className='form-control'>{product.id}</option>);
    }
});
