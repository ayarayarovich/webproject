export function setupPreloader(element: HTMLDivElement, finalProgress: number) {
    let progress = 0

    const barEl = element.querySelector<HTMLDivElement>('.preloader__bar')
    const percentEl = element.querySelector<HTMLDivElement>('.preloader__percent')

    if (!barEl || !percentEl)
        throw new Error("Preloader markup is wrong!")

    const hide = () => element.classList.remove('preloader--show')

    window.addEventListener('load', () => {
        setProgress(finalProgress)
        setTimeout(hide, 750)
    })

    const setProgress = (p: number) => {
        if (0 <= progress && progress <= finalProgress) {
            progress = p
            barEl.style.width = percentEl.innerText = `${Math.floor(progress / finalProgress * 100)}%`
        }
    }

    setProgress(0)
    return () => setProgress(progress + 1)
}
