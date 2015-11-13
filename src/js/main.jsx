import React from 'react';
import ReactDom from 'react-dom';
import Purchase from './components/purchase.jsx';
import Accounts from './components/accounts.jsx';
import Production from './components/production.jsx';
import Sell from './components/sell.jsx';
import RawMaterialItems from './components/rawMaterialDisplay.jsx';
import ProductsInfo from './components/productsDisplay.jsx';

var App = React.createClass({
    render() {
        return <div className='container'>
            <div className='row'>
                <div className='col-sm-4'>
                    <Purchase />
                    <Production />
                    <Sell />
                </div>

                <div className='col-sm-8'>
                    <Accounts />
                </div>
                <div className='col-sm-8'>
                    <RawMaterialItems />
                </div>
                <div className='col-sm-8'>
                    <ProductsInfo />
                </div>
            </div>
        </div>
    }
});

ReactDom.render(<App />, document.querySelector('#app-container'));