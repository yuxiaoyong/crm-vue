import request from "@/util/request"
var qs = require('qs');
export function save(item){
  return request.post("/contact/save", item);
}


export function findList( params = { page, size, sort, keyword, status, productId}){
  return request.get("/contact/findList", {
    params: params
  })
}

export function findById(id){
  return request.get("/contact/findById", {
    params:{
      id: id
    }
  });
}

export function deleteById(id){
  return request.post("/contact/deleteById",
    qs.stringify({id: id})
  );
}

export function deleteByIds(ids){
  return request.post("/contact/deleteByIds", ids);
}

export function importContact(file){
  let formData = new FormData();
  formData.append('file', file);

  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 300000
  }
  return request.post("/contact/import", formData, config);
}

