import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CollectionsOverview from '../collection-overview/collection-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

const ShopPage = () => (
  <div className='shop-page'>
  <Routes>
    <Route exact path='/' element={<CollectionsOverview />} />
    <Route path=":collectionId" element={<CollectionPage />} />
  </Routes>
  </div>
);

export default ShopPage;