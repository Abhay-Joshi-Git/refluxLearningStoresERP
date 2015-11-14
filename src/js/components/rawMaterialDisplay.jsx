import React from 'react';
import RawInventoryStore from '../stores/rawInventoryStore.js';
import Reflux from 'reflux';

export default React.createClass({
    mixins: [
        Reflux.listenTo(RawInventoryStore, 'onChange')
    ],
    onChange() {
        this.setState(this.getState());
    },
    getInitialState() {
        return this.getState();
    },
    getState() {
        return {items: RawInventoryStore.getRawItems()};
    },
    render() {
        return <div className = 'panel panel-group module-container col-sm-12'>
            <div className='text-center'>
                <h4> Raw Material Info </h4>
            </div>
            <div className='row panel'>
                <div className='col-sm-6'>
                    <label className='form-label pull-right'>Items </label>
                </div>
                <div className=' col-sm-6'>
                    <label className='form-label'>Count </label>
                </div>
            </div>
            {this.getItems()}
        </div>
    },
    getItems() {
        if (this.state.items.length) {
            return this.state.items.map(function(item) {
                return <div className='row panel' key={item.id}>
                    <div className='col-sm-6'>
                        <span className='form-label pull-right'>{item.id} </span>
                    </div>
                    <div className='col-sm-6'>
                        <span className='form-label'>{item.count} </span>
                    </div>
                </div>;
            });
        } else {
            return <div className='panel  text-center'>No data</div>;
        }
    }
});