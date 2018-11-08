import request from "@/util/request"
var qs = require('qs');
export function save(item){
  return request.post("/supplier/save", item);
}


export function findList( params = { name, page, size, sort}){
  return request.get("/supplier/findList", {
    params: params
  })
}

export function findById(id){
  return request.get("/supplier/findById", {
    params:{
      id: id
    }
  });
}

export function deleteById(id){
  return request.post("/supplier/deleteById",
    qs.stringify({id: id})
  );
}

export function deleteByIds(ids){
  return request.post("/supplier/deleteByIds", ids);
}


