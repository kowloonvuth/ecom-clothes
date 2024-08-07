import { takeEvery, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.action';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {

    try{
        const collectionRef = firestore.collection('collections');
        const snapshot= yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
        console.log("Log successfully");
    } catch(error) {
        yield put(fetchCollectionsFailure(error.message));
        console.log("fail");
    }
}

export function* fetchCollectionsStart() {
   yield takeEvery(
    ShopActionTypes.FETCH_COLLECTION_START, 
    fetchCollectionsAsync
    ); 
}