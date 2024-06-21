import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import { selectCollectionForPreview} from '../../redux/shop/shop.selector';

import './collection-overview.style.scss';

import CollectionPreview from '../preview-collection/collection-preview';

const CollectionsOverview = ({ collections }) => (
    <div className='collections-overview'>
        {collections.map(collection => (
            <CollectionPreview key={collection} {...collection} />
        ))}
    </div>
);

const mapStateProps = createStructuredSelector({
    collections: selectCollectionForPreview
});

export default connect(mapStateProps)(CollectionsOverview);


