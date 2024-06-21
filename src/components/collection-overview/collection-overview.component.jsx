import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import { selectCollections } from '../../redux/shop/shop.selector';

import './collection-overview.style.scss';

import CollectionPreview from '../preview-collection/collection-preview';

const CollectionsOverview = ({ collections }) => (
    <div className='collections-overview'>
        {collections.map(({id, ...otherCollectionProps}) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
    </div>
);

const mapStateProps = createStructuredSelector({
    collections: selectCollections
});

export default connect(mapStateProps)(CollectionsOverview);


