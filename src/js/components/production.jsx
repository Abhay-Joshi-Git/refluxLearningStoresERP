import React from 'react';
import ProductCatalogueStore from '../stores/productsCatalogueStore.js';
import Actions from '../actions.js';
import InputComponentBuilder from './inputComponentBuilder.jsx';
import ProductionStore from '../stores/productionStore.js';

export default React.createClass({
    render() {
        return <InputComponentBuilder key='production' {...this.getComponentProps()}/>
    },
    getComponentProps() {
        return {
            heading: 'Production Floor',
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
                    refName: 'produce',
                    primary: true,
                    btnClickHandler: this.produce,
                    label: 'Produce'
                }
            ],
            inputComp: this
        }
    },
    produce(inputEle) {
        Actions.produce({itemId: inputEle.refs.prdList.value, qty: parseInt(inputEle.refs.qty.value)});
    },
    getProductsList() {
        return ProductCatalogueStore.getProducts().map(product => <option defaultValue={product.id} key={product.id} className='form-control'>{product.id}</option>);
    }
});