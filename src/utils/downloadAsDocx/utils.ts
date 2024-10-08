import { decode } from 'html-entities'

// @ts-ignore (image-to-base64 doesn't have type declarations)
import { sourceIsFromS3 } from '../utils'

export type BaseError = {
  hasError: boolean
}

export const processHTMLString = async (
  HTMLString: string,
  title: string
): Promise<string> => {
  const { header, footer } = getWrappingHTMLElements(title)
  const unicodeDecodedHtmlString = decode(HTMLString)

  let temporaryHTML = document.createElement('div')
  temporaryHTML.innerHTML = unicodeDecodedHtmlString

  temporaryHTML = await convertImagesToBase64(temporaryHTML)
  temporaryHTML = decreaseFontSizeOfParagraphs(temporaryHTML)
  temporaryHTML = addBorderToTables(temporaryHTML)

  return header + temporaryHTML.innerHTML + footer
}

const urlToBase64 = (url: string): Promise<string> => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

// html-to-docx only accepts base64 images, not hosted images like Strapi uses.
// We also only want to allow download of files uploaded through Strapi (to our S3 bucket), because of both licensing and security.
const convertImagesToBase64 = async (HTMLDiv: HTMLDivElement) => {
  const images = HTMLDiv.querySelectorAll('img')

  for (let i = 0; i < images.length; i++) {
    const imageSource = images[i].src
    if (sourceIsFromS3(imageSource)) {
      // Dummy parameter to avoid cache (CORS) on chrome: https://www.hacksoft.io/blog/handle-images-cors-error-in-chrome#solution
      const base64 = await urlToBase64(`${imageSource}?${new Date().getTime()}`)

      images[i].crossOrigin = 'anonymous' //https://stackoverflow.com/a/47359958/5837635
      images[i].src = base64
      const parentNode = images[i].parentNode as HTMLElement | undefined
      parentNode?.replaceWith(images[i])
    } else {
      images[i].parentNode?.removeChild(images[i])
    }
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

const addBorderToTables = (HTMLDiv: HTMLDivElement) => {
  HTMLDiv.querySelectorAll('table').forEach(table => {
    table.style.borderCollapse = table.style.borderCollapse || 'collapse';
    table.border = table.border || '1';
  });
  return HTMLDiv
}

export const getWrappingHTMLElements = (title: string) => ({
  header: getPageHeaderHTML(title),
  footer: getFooterHTML(),
})

export const getPageHeaderHTML = (title: string) =>
  `<!DOCTYPE html><head><meta charset='UTF-8'><title>${title}</title></head><body>`

export const getFooterHTML = () => '</body></html>'
