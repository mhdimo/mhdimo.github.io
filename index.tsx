
import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// The server-prerendered markup in index.html is hydrated so AI crawlers and
// no-JS visitors already see real content in the raw HTML.
const root = ReactDOM.hydrateRoot(rootElement, <React.StrictMode><App /></React.StrictMode>);
