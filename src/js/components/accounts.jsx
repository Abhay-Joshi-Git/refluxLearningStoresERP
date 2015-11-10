import React from 'react';
import AccountsStore from '../stores/accountsStore.js';
import Reflux from 'reflux';

export default React.createClass({
    mixins: [
        Reflux.listenTo(AccountsStore, 'onChange')
    ],
    getInitialState() {
        return this.getState();
    },
    componentDidMount() {
        this.updateState()
    },
    onChange() {
        this.updateState()
    },
    getState() {
        return {
            totalBalance: AccountsStore.getBalance(),
            totalPurchaseCost: AccountsStore.getTotalPurchaseCost()
        };
    },
    updateState() {
        this.setState(this.getState());
    },
    render() {
        return <div className = 'panel panel-group module-container col-sm-12'>
            <div className='text-center'>
                <h4> Accounts Info </h4>
            </div>
            <div className='row panel'>
                <div className='col-sm-4'>
                    <span className='form-label pull-right'>Total Balance: </span>
                </div>
                <div className=' col-sm-8'>
                    <span className='form-label'>{this.state.totalBalance} </span>
                </div>
            </div>
            <div className='row panel'>
                <div className='col-sm-4'>
                    <span className='form-label pull-right'>Total Purchase Cost: </span>
                </div>
                <div className=' col-sm-8'>
                    <span className='form-label'>{this.state.totalPurchaseCost} </span>
                </div>
            </div>
        </div>
    }
});