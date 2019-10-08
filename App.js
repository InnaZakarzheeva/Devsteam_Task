import React from 'react';
import {store} from './store/store';
import {Provider} from 'react-redux';
import ImageGallery from './component/gallery'

export default class App extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <ImageGallery/>
      </Provider>
    );
  }
}

