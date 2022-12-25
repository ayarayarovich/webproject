import Swiper, {Navigation, Pagination, Keyboard} from 'swiper';
import { SlideDescription } from "./types";

export async function setupSlider(container: string) {
    const slideDescriptions: SlideDescription[] = await fetch("/slider-description.json").then(r => r.json());

    for (const slideDescription of slideDescriptions) {
        document.querySelector(`${container} .swiper-wrapper`)!.innerHTML +=
            `
             <div class="swiper-slide">
              <div class="slide">
                <div class="container-fluid h-100 position-absolute py-5" style="z-index: 9">
                  <div class="row h-100 align-content-between align-content-lg-center align-items-center">
                    <div class="offset-1 col-10 offset-md-2 col-md-8 col-lg-3 offset-lg-1">
                      <h1 class="slide__heading text-center text-lg-start">${slideDescription.heading}</h1>
                      <p class="slide__paragraph slide__paragraph--left fs-6 d-none d-lg-block">${slideDescription.desc1}</p>
                    </div>
                    <div class="offset-1 col-10 offset-md-2 col-md-8 col-lg-3 offset-lg-4">
                      <p class="slide__paragraph slide__paragraph--right fs-6">${slideDescription.desc2}</p>
                    </div>
                  </div>
                </div>
                <div class="slide__horizontal-shadows"></div>
                <video class="slide__background-video" poster="${slideDescription.poster}" muted loop>
                  <source src="${slideDescription.videoUrl}" type="video/webm">
                </video>
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
        await activeVideo.play()


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

    window.mainSwiper = swiper;
}
