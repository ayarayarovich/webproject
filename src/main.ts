import './scss/style.scss'
import { setupCounter } from './ts/counter'

document.addEventListener('DOMContentLoaded', () => {
    setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
})
