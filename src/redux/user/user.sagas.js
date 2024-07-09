import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import { auth, GoogleProvider, createUserProfileDocument } from "../../firebase/firebase.utils";

import { SignInSuccess, SignInFailure } from "./user.action";

export function* signInWithGooogle() {
    try {
        const {user} = yield auth.signInWithPopup(GoogleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
    } catch(error) {
        yield put(SignInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGooogle)
}

export function* signInWithEmail({payload: {email, password}}) {
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    } catch(error) {
        put(SignInFailure(error))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail )
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}