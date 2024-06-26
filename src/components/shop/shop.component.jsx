import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.action';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';


import CollectionsOverview from '../collection-overview/collection-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

import WithSpinner from '../with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  componentDidMount() {
    
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }


  render() {
    const {isCollectionFetching, isCollectionsLoaded} = this.props;
    return(
      <div className='shop-page'>
      <Routes>
        <Route exact path='/' element={<CollectionsOverviewWithSpinner isLoading={isCollectionFetching} />} />
        <Route path=":collectionId" element={<CollectionPageWithSpinner isLoading={!isCollectionsLoaded} />} />
      </Routes>
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
 fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);