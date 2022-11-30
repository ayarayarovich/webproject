export function setupPreloader(element: HTMLDivElement) {
    const hide = () => element.classList.remove('preloader--show')
    window.addEventListener('load', () => {
        setTimeout(hide, 1000)
    })
}
