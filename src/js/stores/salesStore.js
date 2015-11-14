import Reflux from 'reflux';
import Actions from '../actions.js';

export default Reflux.createStore({
    listenables: Actions,
    sell(sale) {
        Actions.saleCompleted(sale);
    }
});

