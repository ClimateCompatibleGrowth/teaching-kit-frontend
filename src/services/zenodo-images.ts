import { countOccurancesInArray } from '../utils/utils'

type ImageReference = {
  name: string
  path: string
}

type Image = {
  uint8Array: Uint8Array
  name: string
}

type UpdatedZenodoEntities = {
  document: string
  images: Image[]
}

export const convertMarkdownImagesToLocalReferences = async (
  markdown: string
): Promise<UpdatedZenodoEntities> => {
  const imageReferences: ImageReference[] = []

  const updatedMarkdown = markdown.replaceAll(
    /\[(.*?)\]\((?=.*https:\/\/teaching-kit-media-assets-2\.s3\.eu-north-1\.amazonaws\.com\/)(.*?)\)/g,
    (_, imageName, imagePath) => {
      if (
        (imageName === null || imageName === '') &&
        !imagePath.includes('https')
      ) {
        return `[${imageName}](${imagePath})`
      }

      const imageNameWithoutExtension: [string, string] =
        imageName.match(/^(.*?)\.(png|jpeg|jpg|gif)/) ?? imageName

      const amountOfPreviousImagesWithTheSameName = countOccurancesInArray(
        imageName,
        imageReferences.map((imageReference) => imageReference.name)
      )

      const newImageName =
        amountOfPreviousImagesWithTheSameName > 0
          ? `${imageName}_${amountOfPreviousImagesWithTheSameName + 1}`
          : imageName

      imageReferences.push({
        name: newImageName,
        path: imagePath,
      })

      return `[${imageNameWithoutExtension[1]}](${imageName})`
    }
  )

  const images = await convertImagesToUint8Arrays(imageReferences)

  return {
    document: updatedMarkdown,
    images,
  }
}

const convertImagesToUint8Arrays = async (
  imageReferences: ImageReference[]
): Promise<Image[]> => {
  return await Promise.all(
    imageReferences.map(async (imageReference) => {
      const imageResponse = await fetch(imageReference.path)
      const imageBlob = await imageResponse.blob()
      return {
        uint8Array: new Uint8Array(await imageBlob.arrayBuffer()),
        name: imageReference.name,
      }
    })
  )
}
