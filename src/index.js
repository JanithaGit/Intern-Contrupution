import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import {Provider} from 'react-redux';
import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {icons} from './assets/icons'
import './assets/scss/colors.scss';
import './assets/scss/fonts.scss';
import "react-image-gallery/styles/scss/image-gallery.scss";
import "toastr/build/toastr.min.css";
import 'semantic-ui-css/semantic.min.css';
 import Loader from './components/Loader/Loader';
import {store} from "./store/storeConfig/store";

React.icons = icons;

const App = lazy(() => import("./App"));
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loader/>}>
      <App/>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
