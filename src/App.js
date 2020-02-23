import React from 'react';
import './App.css';
import Row from './components/Row'
import Filter from './components/Filter'
import { Provider } from 'react-redux'
import store from '../src/store/store'
import ProductListItems from './components/ProductListItems'
function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Row left={<Filter />} right={<ProductListItems />} />
            </div>
        </Provider>
    )
}

export default App;
