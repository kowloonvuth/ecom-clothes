import React from "react";
import { connect } from 'react-redux';

import { useParams } from "react-router-dom";

import CollectionItem from '../../components/item-collection/item-collection';

import { selectCollection } from "../../redux/shop/shop.selector";
import './collection.style.scss';

const CollectionPage = ({ collection }) => {
    const { collectionId } = useParams();
    const { title, items } = collection(collectionId) || {};
    return (
        <div className='collection-page'>
            <h2 className='title'> { title }</h2>
            <div className='items'>
                {
                    items?.map(item => <CollectionItem key={item.id} item={item} /> )
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        collection: (collectionId) => selectCollection(collectionId)(state)
    };
};

export default connect(mapStateToProps)(CollectionPage);
