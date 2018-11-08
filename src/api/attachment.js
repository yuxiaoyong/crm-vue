import request from "@/util/request"
var qs = require('qs');

export function uploadFile(params){
  let formData = new FormData();
  formData.append('file', params.file);

  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress(event){
      var percent = Math.round(event.loaded / event.total * 100 | 0)
      event.percent = percent;
      params.onProgress(event)
    },
    timeout: 300000
  }
  request.post("/attachment/upload", formData, config).then((res) => {
    params.onSuccess(res);
  }).catch((err) => {
    params.onError(err);
  });
}


export function getAttachmentBaseUrl(){
  return process.env.BASE_API;
}

export function getAttachmentUrl(fileId){
  return process.env.BASE_API + "/attachment/download?fileId=" + fileId;
}
