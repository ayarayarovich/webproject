import './scss/style.scss'
import { setupPreloader } from './ts/preloader'
import { setupPosters } from "./ts/posters";
import { setupSlider } from "./ts/slider"
import {setupHeader} from "./ts/header";


document.addEventListener('DOMContentLoaded', () => {
    setupPreloader(document.querySelector<HTMLDivElement>('.preloader')!)
    setupHeader(document.querySelector<HTMLDivElement>('.header')!)
    setupPosters(document.querySelector<HTMLDivElement>('.posters .grid')!)
    setupSlider('.swiper')
})
