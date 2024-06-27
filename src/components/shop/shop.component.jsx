import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';


import {fetchCollectionsStartAsync} from '../../redux/shop/shop.action';
import CollectionsOverviewContainer from '../collection-overview/collection-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container';


class ShopPage extends React.Component {

  componentDidMount() {
    
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }


  render() {
    
    return(
      <div className='shop-page'>
      <Routes>
        <Route exact path='/' 
        element={<CollectionsOverviewContainer />}
      />
        <Route path=":collectionId" 
        element={<CollectionPageContainer />}
      />
      </Routes>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);