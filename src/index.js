import { Liquify } from './liquify';

import './assets/demo.jpg';
import './assets/favicon.ico';

window.document.addEventListener('readystatechange', () => {
    if ('complete' === window.document.readyState) {
        global.liquify = new Liquify();
    }
});
