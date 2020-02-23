import React from 'react';
import { connect } from 'react-redux';
import ProductListItem from '../ProductListIem';

const ProductListItems = props => {
    const { productList, filtered } = props;
    console.log('props in productListItems', props);
    let listItems;
    if (props.filtered.length === 0) {
        listItems = productList;
    } else {

        listItems = filtered;
    }

    return (
        <div className="row">
            <div className="col s12">
                <div className="card">
                    {listItems.map((elem, i) => (
                        <div key={i}>
                            <ProductListItem item={elem} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = state => ({
    productList: state.productList,
    filtered: state.filtered,
});
export default connect(mapStateToProps)(ProductListItems);
