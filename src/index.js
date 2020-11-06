import React, {Suspense,lazy} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux"
// import 'semantic-ui-css/semantic.min.css'
import './assets/css/semantic.css';
import './assets/scss/zoom-mtg/bootstrap.scss';
import './assets/scss/zoom-mtg/react-select.scss';
import 'flatpickr/dist/themes/airbnb.css';

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";
import "toastr/build/toastr.min.css"

import {store} from "./store/storeConfig/store"
import './assets/fonts/opens-sans.css';
import './assets/fonts/red-hat.css';
import './assets/fonts/fira-sans.css';
import "./assets/scss/index.scss";
import "./assets/scss/override.scss";
import "./assets/scss/home-reponsive.scss";
import SiteLoader from "./components/Loader/SiteLoader";

const LazyApp = lazy(() => import("./App"));

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<SiteLoader />}>
        <LazyApp />
        </Suspense>
    </Provider>,
    document.getElementById("root")
);
