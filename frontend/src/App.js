import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.scss';
import Main from "./components/Main";
import { applyMiddleware, combineReducers, createStore } from "redux";
import {
    authErrorReducer,
    authReducer, certificateReducer,
    certificatesErrorReducer,
    certificatesMetadataReducer,
    certificatesReducer, tagsReducer
} from "./reducers/reducers";
import { Provider } from "react-redux";
import LoginContainer from "./containers/LoginContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import PageNotFound from "./components/PageNotFound";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from "redux-logger";
import CertificatesContainer from "./containers/CertificatesContainer";

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['authError', 'certificates', 'certificatesMetadata', 'certificatesError', 'tags', 'certificate']
}

const certificatesMetadataConfig = {
    key: 'certificatesMetadata',
    storage: storage,
    blacklist: ['isLoaded', 'filter', 'sort', 'order', 'isAdded']
}

const rootReducer = combineReducers({
    auth: authReducer,
    authError: authErrorReducer,
    certificates: certificatesReducer,
    certificatesMetadata: persistReducer(certificatesMetadataConfig, certificatesMetadataReducer),
    certificatesError: certificatesErrorReducer,
    tags: tagsReducer,
    certificate: certificateReducer
});

const persistRootReducer = persistReducer(rootPersistConfig, rootReducer);

const loggerMiddleware = createLogger();

const store = createStore(persistRootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

const persistor = persistStore(store);

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="App">
                    <BrowserRouter>
                        <Header />
                        <Main>
                            <Routes>
                                <Route exact path="/" element={<LoginContainer />} />
                                <Route exact path="/certificates" element={<CertificatesContainer />} />
                                <Route element={<PageNotFound />} />
                            </Routes>
                        </Main>
                        <Footer />
                    </BrowserRouter>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
