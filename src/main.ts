import './scss/style.scss'
import { setupPreloader } from './ts/preloader'
import { setupPosters } from "./ts/posters";


document.addEventListener('DOMContentLoaded', () => {
    setupPreloader(document.querySelector<HTMLDivElement>('.preloader')!)
    setupPosters(document.querySelector<HTMLDivElement>('.posters .grid')!)
})
