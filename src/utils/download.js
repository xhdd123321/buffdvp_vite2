import request from '@/utils/request'

// 下载图片会直接浏览，但可以不同源
export function downloadWithUrl (url, fileName) {
  const aLink = document.createElement('a')
  aLink.style.display = 'none'
  aLink.href = url
  aLink.download = fileName
  aLink.target = '_parent'
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink) // 下载完成移除元素
}

// 可下载图片，需要同源
export async function downloadFile (fileUrl, fileName) {
  if (!fileUrl) return
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  const res = await request({
    method: 'get',
    url: fileUrl.replace(/^http:\/\/[^/]+/, ''),
    responseType: 'blob',
    config
  })
  const newUrl = window.URL.createObjectURL(res.data)
  const a = document.createElement('a')
  a.href = newUrl
  a.download = fileName
  a.click()
  a.remove()
  // 在资源下载完成后 可以人工清除createObjectURL 占用的缓存资源
  window.URL.revokeObjectURL(newUrl)
}
