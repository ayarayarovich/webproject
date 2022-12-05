import Swiper, {Navigation, Pagination, Keyboard} from 'swiper'
import {loadVideo} from "./utils";

interface SlideDescription {
    heading: string
    videoUrl: string
    desc1: string
    desc2: string
}

export async function setupSlider(container: string) {
    const slideDescriptions: SlideDescription[] = await fetch("/slider-description.json").then(r => r.json());

    for await (const slideDescription of slideDescriptions.map(async (desc) => {
        return {
            ...desc,
            videoUrl: await loadVideo(desc.videoUrl)
        }
    })) {
        document.querySelector(`${container} .swiper-wrapper`)!.innerHTML +=
            `
             <div class="swiper-slide">
              <div class="slide">
                <div class="container-fluid position-absolute" style="z-index: 9">
                  <div class="row align-items-center">
                    <div class="col-3 offset-1">
                      <h1 class="slide__heading">${slideDescription.heading}</h1>
                      <p class="slide__paragraph slide__paragraph--left">${slideDescription.desc1}</p>
                    </div>
                    <div class="col-3 offset-4">
                      <p class="slide__paragraph slide__paragraph--right">${slideDescription.desc2}</p>
                    </div>
                  </div>
                </div>
                <div class="slide__horizontal-shadows"></div>
                <video class="slide__background-video" src="${slideDescription.videoUrl}" muted loop></video>
              </div>
            </div>
        `

    }

    // @ts-ignore
    const swiper = new Swiper(container, {
        modules: [Navigation, Pagination, Keyboard],
        direction: 'horizontal',

        // to hide a thin white line between slides
        spaceBetween: -1,

        slidesPerView: 1,
        grabCursor: true,
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })

    const activeVideo = swiper.slides[0].querySelector('.slide__background-video') as HTMLVideoElement
    if (activeVideo.paused)
        activeVideo.play()


    swiper.on('realIndexChange', swiper => {
        console.log(swiper.slides)
        const idx = swiper.realIndex
        const activeVideo = swiper.slides[idx].querySelector('.slide__background-video') as HTMLVideoElement
        if (activeVideo.paused)
            activeVideo.play()

        for (let i = 0; i < swiper.slides.length; ++i) {
            if (i != idx) {
                const inactiveVideo = swiper.slides[i].querySelector('.slide__background-video') as HTMLVideoElement
                inactiveVideo.pause()
            }
        }

    })
}
