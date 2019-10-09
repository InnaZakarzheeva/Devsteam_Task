import {createStore, combineReducers} from 'redux';
import img from '../reducer/reducer'

const saveState = (state) => {
    try {
        const serialisedState = JSON.stringify(state);
        window.localStorage.setItem('app_gallery', serialisedState);
    } catch (err) {

    }
};

const loadState = () => {
    try {
        const serialisedState = window.localStorage.getItem('app_gallery');
        if (!serialisedState) return undefined;
        return JSON.parse(serialisedState);
    } catch (err) {
        return undefined;
    }
};

const oldState = loadState();
export const store = createStore(combineReducers({
    img: img
}), oldState);

store.subscribe( () => {
    saveState(store.getState());
})
