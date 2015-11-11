import React from 'react';
import accountsStore from '../stores/accountsStore.js';
import PurchaseStore from '../stores/purchaseStore.js';
import rawItemsCatalogueStore from '../stores/rawItemCatalogueStore.js';
import _ from 'lodash';
import Reflux from 'reflux';
import Actions from '../actions.js';

export default React.createClass({
    render() {
        return <div className = 'panel panel-group module-container col-sm-12'>
            <div className='text-center'>
                <h4> Raw Material Purchase </h4>
            </div>
            <div className='row panel'>
                <div className='col-sm-4'>
                    <span className='form-label pull-right'>Items: </span>
                </div>
                <div className=' col-sm-8 form-control-container'>
                    <select ref='rawItemsList'>
                        {this.getRawItemsList()}
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
                <button ref='purchaseBtn' onClick={this.purchaseHandler} className='btn btn-primary'>Purchase</button>
            </div>
        </div>
    },
    purchaseHandler() {
        console.log(this.refs.rawItemsList.value, this.refs.qty.value, Actions);
        Actions.purchase({itemId: this.refs.rawItemsList.value, count: this.refs.qty.value});
    },
    getRawItemsList() {
        var itemIds = _.pluck(rawItemsCatalogueStore.getItems(), 'id');
        console.log(itemIds);
        return itemIds.map(item => <option defaultValue={item} key={item} className='form-control'>{item}</option>)
    },
    checkBalance() {
        //var balance = accountsStore.getBalance();
        //var rawItem = rawItemsCatalogueStore.getItem(selectedItem.itemId);
        //var totalCost = rawItem.cost * qty;

    }
});