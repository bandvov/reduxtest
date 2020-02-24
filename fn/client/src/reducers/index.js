// import { combineReducers } from 'redux'
import { fetchProducts } from './fetchProducts';
// export default combineReducers({
//   fetchProducts
// });
const reducer = (state, action) => ({
    ...state,
    products: [...fetchProducts(state, action)],
});
export default reducer;
