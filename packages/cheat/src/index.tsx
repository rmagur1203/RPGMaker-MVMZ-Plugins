import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { ROOT_ID } from './constants';

function getRoot() {
    let root = document.getElementById(ROOT_ID);

    if (!root) {
        root = document.createElement('div');
        root.id = ROOT_ID;
        document.body.appendChild(root);
    }

    return root;
}

(function render() {
    const root = ReactDOM.createRoot(getRoot());

    root.render(
        <App />
    );
})();