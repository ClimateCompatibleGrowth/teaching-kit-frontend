import axios from 'axios'

export interface UploadResult {
  id: number
  name: string
  url: string
  size: number
  mime: string
}

export interface UploadError {
  message: string
  file: string
}

/**
 * Uploads a single file directly to Strapi
 */
export async function uploadFileToStrapi(
  file: File,
  strapiApiUrl: string,
  apiKey: string
): Promise<UploadResult> {
  console.log('🚀 Direct upload to Strapi started:', {
    fileName: file.name,
    fileSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
    strapiUrl: strapiApiUrl,
    hasApiKey: !!apiKey
  })

  const formData = new FormData()
  formData.append('files', file, `UNVERIFIED-${file.name}`)

  const response = await axios.post(`${strapiApiUrl}/upload`, formData, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  if (response.data && response.data.length > 0) {
    const uploadedFile = response.data[0]
    console.log('✅ Direct upload successful:', {
      fileId: uploadedFile.id,
      fileName: uploadedFile.name,
      fileSize: `${(uploadedFile.size / 1024 / 1024).toFixed(2)}MB`,
      fileUrl: uploadedFile.url
    })
    return {
      id: uploadedFile.id,
      name: uploadedFile.name,
      url: uploadedFile.url,
      size: uploadedFile.size,
      mime: uploadedFile.mime,
    }
  }

  console.error('❌ Direct upload failed: No data returned from Strapi')
  throw new Error(`Upload failed for file: ${file.name}`)
}

/**
 * Uploads multiple files directly to Strapi
 */
export async function uploadFilesToStrapi(
  files: FileList | File[],
  strapiApiUrl: string,
  apiKey: string,
  onProgress?: (progress: number) => void
): Promise<{ results: UploadResult[], errors: UploadError[] }> {
  const results: UploadResult[] = []
  const errors: UploadError[] = []
  const totalFiles = files.length

  for (let i = 0; i < totalFiles; i++) {
    try {
      const file = files[i]
      const result = await uploadFileToStrapi(file, strapiApiUrl, apiKey)
      results.push(result)
      
      // Update progress
      if (onProgress) {
        onProgress(Math.round(((i + 1) / totalFiles) * 100))
      }
    } catch (error: any) {
      console.error('❌ Direct upload error for file:', files[i].name, error)
      errors.push({
        message: error.message || 'Upload failed',
        file: files[i].name,
      })
    }
  }

  return { results, errors }
}

/**
 * Uploads files directly to a lecture using Strapi's ref system
 */
export async function uploadLectureFiles(
  files: FileList | File[],
  strapiApiUrl: string,
  apiKey: string,
  lectureId: number
): Promise<void> {
  if (!files || files.length === 0) return

  console.log('📚 Uploading lecture files directly to lecture:', lectureId, 'files:', files.length)
  
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i], `UNVERIFIED-${files[i].name}`)
    console.log('📚 Added file to FormData:', files[i].name, 'size:', files[i].size)
  }
  formData.append("ref", "api::lecture.lecture")
  formData.append("refId", lectureId.toString())
  formData.append("field", "Files")

  console.log('📚 FormData contents:', {
    ref: "api::lecture.lecture",
    refId: lectureId.toString(),
    field: "Files",
    fileCount: files.length
  })

  const response = await axios.post(`${strapiApiUrl}/upload`, formData, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  console.log('📚 Lecture files uploaded successfully:', {
    status: response.status,
    data: response.data
  })
}

/**
 * Uploads files directly to a course using Strapi's ref system
 */
export async function uploadCourseFiles(
  files: FileList | File[],
  strapiApiUrl: string,
  apiKey: string,
  courseId: number
): Promise<void> {
  if (!files || files.length === 0) return

  console.log('🎓 Uploading course files directly to course:', courseId, 'files:', files.length)
  
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i], `UNVERIFIED-${files[i].name}`)
  }
  formData.append("ref", "api::course.course")
  formData.append("refId", courseId.toString())
  formData.append("field", "Files")

  const response = await axios.post(`${strapiApiUrl}/upload`, formData, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  console.log('🎓 Course files uploaded successfully:', response.status)
}
