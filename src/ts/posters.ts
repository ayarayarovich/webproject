import {createPopper} from "@popperjs/core";
import {htmlToElement} from "./utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const posterDescriptions = [
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster1.png",  watchUrl: "https://www.kinopoisk.ru/film/6695/"},
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster2.png",  watchUrl: "https://www.kinopoisk.ru/film/844/"},
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster3.png",  watchUrl: "https://www.kinopoisk.ru/film/5619/"},
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster4.png",  watchUrl: "https://www.kinopoisk.ru/film/841277/"},
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster5.png",  watchUrl: "https://www.kinopoisk.ru/film/840152/"},
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster6.png",  watchUrl: "https://www.kinopoisk.ru/series/803148/"},
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster7.png",  watchUrl: "https://www.kinopoisk.ru/film/333/"},
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster8.png",  watchUrl: "https://www.kinopoisk.ru/film/338/"},
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster9.png",  watchUrl: "https://www.kinopoisk.ru/film/447/"},
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster10.png", watchUrl: "https://www.kinopoisk.ru/film/714888/"},
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster11.png", watchUrl: "https://www.kinopoisk.ru/film/718223/"},
    {imageUrl: "https://storage.yandexcloud.net/project-star-wars/poster12.png", watchUrl: "https://www.kinopoisk.ru/film/718222/"},
]

export function setupPosters(container: HTMLElement) {
    posterDescriptions.forEach(desc => {
        const poster = htmlToElement(`
            <div class="poster">
                <img class="poster__image" src="${desc.imageUrl}" alt="">
                <img class="poster__background" src="${desc.imageUrl}" alt="">
                <button type="button" class="poster__button">
                    <svg width="41" height="9" viewBox="0 0 41 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4.5" cy="4.5" r="4.5" fill="#D9D9D9" fill-opacity="0.32"/>
                        <circle cx="20.5" cy="4.5" r="4.5" fill="#D9D9D9" fill-opacity="0.32"/>
                        <circle cx="36.5" cy="4.5" r="4.5" fill="#D9D9D9" fill-opacity="0.32"/>
                    </svg>
                </button>
                <div class="poster__tooltip">
                    <a class="poster__link" href="${desc.watchUrl}" target="_blank">Смотреть</a>
                </div>
            </div>
        `)!

        const button = poster.querySelector('.poster__button') as HTMLElement
        const tooltip = poster.querySelector('.poster__tooltip') as HTMLElement

        // @ts-ignore
        const popperInstance = createPopper(
            button,
            tooltip,
            {
                placement: 'top',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 16]
                        }
                    }
                ]
            }
        )

        const showTooltip = () => {
            tooltip.setAttribute('data-show', '')
            // tooltip.focus()
            popperInstance.update()
        }

        const hideTooltip = () => {
            tooltip.removeAttribute('data-show')
        }

        button.addEventListener('click', showTooltip)
        document.addEventListener('scroll', hideTooltip)

        container.append(poster)
    })

    gsap.registerPlugin(ScrollTrigger)
    gsap.from('.poster',
        {
            scrollTrigger: '.poster',
            opacity: 0,
            yPercent: 15,
            duration: 0.4,
            stagger: 0.5
    })

    const posters = gsap.utils.toArray('.poster') as HTMLDivElement[]
    posters.forEach(poster => {
        const scalePoster = gsap.to(poster.querySelector('.poster__background'),
            {
                opacity: 1,
                scale: 1.03,
                duration: 0.4,
                paused: true
            })

        poster.addEventListener('mouseenter', () => {
            scalePoster.play(0)
        })

        poster.addEventListener('mouseleave', () => {
            scalePoster.reverse()
        })
    })

}
