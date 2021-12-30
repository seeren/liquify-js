import { Liquify } from './liquify';

import './assets/demo.jpg';
import './assets/favicon.ico';

export { Liquify } from './liquify';

window.document.addEventListener('readystatechange', () => {
    if ('complete' === window.document.readyState) {
        global.Liquify = new Liquify();
    }
});
