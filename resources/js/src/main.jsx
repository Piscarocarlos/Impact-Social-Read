import  { Suspense } from 'react';
// import ReactDOM from 'react-dom/client'

// // Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// // Tailwind css
import './tailwind.css';

// // i18n (needs to be bundled)
import './i18n';


import { Provider } from 'react-redux';
import store from './store/index';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { InertiaProgress } from '@inertiajs/progress'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Impact Social';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
        <Suspense>
            <Provider store={store}>
                <App {...props} />
            </Provider>
        </Suspense>

        );
    },
});


InertiaProgress.init({
    color: "#C9D454"
})