import request from "@/util/request"
var qs = require('qs');
export function save(item){
  return request.post("/product/save", item);
}


export function findList( params = { name, page, size, sort}){
  return request.get("/product/findList", {
    params: params
  })
}

export function findById(id){
  return request.get("/product/findById", {
    params:{
      id: id
    }
  });
}

export function deleteById(id){
  return request.post("/product/deleteById",
    qs.stringify({id: id})
  );
}

export function deleteByIds(ids){
  return request.post("/product/deleteByIds", ids);
}


