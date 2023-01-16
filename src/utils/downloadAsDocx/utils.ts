import { decode } from 'html-entities'

// @ts-ignore (image-to-base64 doesn't have type declarations)
import imageToBase64 from 'image-to-base64'

export type BaseError = {
  hasError: boolean
}

export const processHTMLString = async (
  HTMLString: string
): Promise<string> => {
  const unicodeDecodedHtmlString = decode(HTMLString)

  let temporaryHTML = document.createElement('div')
  temporaryHTML.innerHTML = unicodeDecodedHtmlString

  temporaryHTML = await convertImagesToBase64(temporaryHTML)
  temporaryHTML = decreaseFontSizeOfParagraphs(temporaryHTML)

  return temporaryHTML.innerHTML
}

// html-to-docx only accepts base64 images, not hosted images like Strapi uses.
const convertImagesToBase64 = async (HTMLDiv: HTMLDivElement) => {
  const images = HTMLDiv.getElementsByTagName('img')

  for (const image of images) {
    const imageUrl = image.src
    // Dummy parameter to avoid cache (CORS): https://www.hacksoft.io/blog/handle-images-cors-error-in-chrome#solution
    const base64 = await imageToBase64(`${imageUrl}?do-not-fetch-from-cache`)
    image.src = `data:image/png;base64, ${base64}`
  }

  return HTMLDiv
}

// This is needed because of the following bug in html-to-docx: https://github.com/privateOmega/html-to-docx/issues/180
// The function decreases the size of the paragraphs, but fail to change their fontWeight. The reason why is discussed in
// the link above.
const decreaseFontSizeOfParagraphs = (HTMLDiv: HTMLDivElement) => {
  const paragraphs = HTMLDiv.getElementsByTagName('p')

  for (const paragraph of paragraphs) {
    paragraph.style.fontWeight = 'normal'
    paragraph.style.fontSize = '12pt'
  }

  return HTMLDiv
}

export const getWrappingHTMLElements = (title: string) => ({
  header: getPageHeaderHTML(title),
  footer: getFooterHTML(),
})

export const getPageHeaderHTML = (title: string) =>
  `<!DOCTYPE html><head><meta charset='UTF-8'><title>${title}</title></head><body>`

export const getFooterHTML = () => '</body></html>'
