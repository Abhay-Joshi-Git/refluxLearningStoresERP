import React from 'react';
import accountsStore from '../stores/accountsStore.js';
import ProductCatalogueStore from '../stores/productsCatalogueStore.js';
import Reflux from 'reflux';
import Actions from '../actions.js';
import InputComponentBuilder from './inputComponentBuilder.jsx';


export default React.createClass({
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
                    getOptionsList: this.getProductsList
                },
                {
                    label: 'Qty',
                    refName: 'qty',
                    eleType: 'input'
                }
            ],
            btns: [
                {
                    refName: 'sellBtn',
                    primary: true,
                    btnClickHandler: this.sell,
                    label: 'Sell'
                }
            ],
            inputComp: this
        }
    },
    sell(inputEle) {
        Actions.sell({itemId: inputEle.refs.prdList.value, count: inputEle.refs.qty.value});
    },
    getProductsList() {
        return ProductCatalogueStore.getProducts().map(product => <option defaultValue={product.id} key={product.id} className='form-control'>{product.id}</option>);
    }
});
