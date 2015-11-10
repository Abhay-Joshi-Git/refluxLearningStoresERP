import React from 'react';
import ReactDom from 'react-dom';
import Purchase from './components/purchase.jsx';
import Accounts from './components/accounts.jsx';

var App = React.createClass({
    render() {
        return <div className='container'>
            <div className='row'>
                <div className='col-sm-4'>
                    <Purchase />
                </div>

                <div className='col-sm-8'>
                    <Accounts />
                </div>
            </div>
        </div>
    }
});

ReactDom.render(<App />, document.querySelector('#app-container'));