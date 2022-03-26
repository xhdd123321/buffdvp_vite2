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

export function convertRes2Blob (response) {
  // 提取文件名
  const fileName = window.decodeURI(response.headers['content-disposition'].split('=')[1].replace('utf-8', '').replace('\'\'', ''), 'UTF-8')
  console.log(fileName)
  // 将二进制流转为blob
  const blob = new Blob([response.data], { type: 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    window.navigator.msSaveBlob(blob, decodeURI(fileName))
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob)
    // 创建a标签，用于跳转至下载链接
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', decodeURI(fileName))
    // 兼容：某些浏览器不支持HTML5的download属性
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    // 挂载a标签
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    // 释放blob URL地址
    window.URL.revokeObjectURL(blobURL)
  }
}
