export function htmlToElement(html: string) {
    const template = document.createElement('template')
    template.innerHTML = html.trim()
    return template.content.firstChild as HTMLElement
}

export async function loadVideo(src: string) {
    const res = await fetch(src, {
        mode: 'no-cors',
        method: 'GET'
    });
    const blob = await res.blob();
    return URL.createObjectURL(blob);
}
