import { Volume } from 'memfs'
const fs = Volume.fromJSON({})

type ImageReference = {
  name: string
  path: string
  fileExtension: string
}

const MATERIAL_DIRECTORY_NAME = 'material'
const ASSETS_DIRECTORY_NAME = 'assets'

export const convertMarkdownImagesToLocalReferences = async (
  markdown: string,
  materialTitle: string
) => {
  fs.mkdirSync(MATERIAL_DIRECTORY_NAME)
  fs.mkdirSync(`/${MATERIAL_DIRECTORY_NAME}/${ASSETS_DIRECTORY_NAME}`)

  const imageReferences: ImageReference[] = []

  const updatedMarkdown = markdown.replace(
    /\[(.*?)\]+\((https.+)\)/,
    (_, imageName, imagePath) => {
      console.log(imageName, imagePath)
      const fileExtension = imagePath.match(/\.([0-9a-z]+$)/)
      imageReferences.push({
        name: imageName,
        path: imagePath,
        fileExtension,
      })
      const newImagePath = `${ASSETS_DIRECTORY_NAME}/${imageName}.${fileExtension}`
      return `[${imageName}](${newImagePath})`
    }
  )

  await downloadImagesToLocalAssets(imageReferences)

  fs.writeFileSync(
    `/${MATERIAL_DIRECTORY_NAME}/${materialTitle}.md`,
    updatedMarkdown
  )

  return fs
}

const downloadImagesToLocalAssets = async (
  imageReferences: ImageReference[]
) => {
  for (const imageReference of imageReferences) {
    const imageResponse = await fetch(imageReference.path)
    const imageBlob = await imageResponse.blob()
    const image = new Uint8Array(await imageBlob.arrayBuffer())
    fs.writeFileSync(
      `/${MATERIAL_DIRECTORY_NAME}/assets/${imageReference.name}.${imageReference.fileExtension}`,
      image
    )
  }
}
