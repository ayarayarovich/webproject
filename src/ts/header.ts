import {SlideDescription} from "./types";
import {htmlToElement} from "./utils";

export async function setupHeader(element: HTMLDivElement) {
    const slideDescriptions: SlideDescription[] = await fetch("/slider-description.json").then(r => r.json());
    const container = element.querySelector('.header__inner')!;

    for (const [i, sd] of slideDescriptions.entries()) {
        const el = htmlToElement(`
                <div class="col mb-4">
                    <button class="header__link-to-slide" type="button">
                        ${sd.heading}
                    </button>
                </div>
            `);
        const btn = el.querySelector('button')!;
        btn.addEventListener('click', () => {
            window.mainSwiper.slideTo(i);
            window.mainSwiper.wrapperEl.scrollIntoView();
        })
        container.append(el);
    }
}
