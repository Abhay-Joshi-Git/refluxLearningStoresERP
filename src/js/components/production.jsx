import React from 'react';
import ProductCatalogueStore from '../stores/productsCatalogueStore.js';
import Actions from '../actions.js';

export default React.createClass({
    render() {
        return <div className = 'panel panel-group module-container col-sm-12'>
            <div className='text-center'>
                <h4> Production Floor </h4>
            </div>
            <div className='row panel'>
                <div className='col-sm-4'>
                    <span className='form-label pull-right'>Products: </span>
                </div>
                <div className=' col-sm-8 form-control-container'>
                    <select ref='productsList'>
                        {this.getProductsList()}
                    </select>
                </div>
            </div>
            <div className='row panel'>
                <div className='col-sm-4'>
                    <label className='form-label pull-right'>Qty: </label>
                </div>
                <div className=' col-sm-8'>
                    <input type='text' ref='qty' placeholder='Qty' defaultValue='1' />
                </div>
            </div>
            <div className='panel panel-btn pull-right'>
                <button ref='produceBtn' onClick={this.produce} className='btn btn-primary'>Produce</button>
            </div>
        </div>
    },
    getProductsList() {
        return ProductCatalogueStore.getProducts().map(product => <option defaultValue={product.id} key={product.id} className='form-control'>{product.id}</option>);
    },
    produce() {
        Actions.produce();
    }
});