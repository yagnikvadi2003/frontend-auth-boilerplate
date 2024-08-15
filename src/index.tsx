import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

/**
 * @constant {HTMLElement} rootElement
 * The root DOM element where the React app will be rendered.
 * Using the non-null assertion operator (!) to assume that this element
 * is always present in the DOM.
 */
const rootElement = document.getElementById('root')!;

/**
 * @constant {Root} root
 * The root of the React application, created by the `createRoot` function.
 * It is responsible for managing the rendering lifecycle of the React application.
 * 
 * @param {HTMLElement} rootElement - The DOM element to render the React app into.
 * This parameter must be an `HTMLElement` and is ensured to be non-null using `!`.
 */
const root = createRoot(rootElement);

/**
 * Renders the React application to the root DOM element.
 * 
 * The application is wrapped in `React.StrictMode` which helps detect 
 * potential problems by activating additional checks and warnings 
 * for its descendants. 
 * 
 * @component <React.StrictMode>
 * Ensures that the application adheres to React best practices by highlighting 
 * potential issues such as deprecated APIs, side effects, etc.
 */
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
