type ImageReference = {
  name: string
  path: string
  fileExtension: string
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
    /\[(.*?)\]+\((.*?)\)/g,
    (_, imageName, imagePath) => {
      if (
        (imageName === '' || imageName === null) &&
        !imagePath.includes('https')
      ) {
        return ''
      }
      const fileExtension: string = imagePath.match(/\.([0-9a-z]+$)/)
      const imageNameWithoutExtension: [string, string] =
        imageName.match(/^(.*?)\.(png|jpeg|jpg|gif)/) ?? imageName
      imageReferences.push({
        name: imageName,
        path: imagePath,
        fileExtension,
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
