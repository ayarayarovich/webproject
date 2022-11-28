import './scss/style.scss'
import { setupPreloader } from './ts/preloader'


document.addEventListener('DOMContentLoaded', () => {
    setupPreloader(document.querySelector<HTMLDivElement>('.preloader')!, /*just for demo*/ 5)
})
