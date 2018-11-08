import request from "@/util/request"
var qs = require('qs');
export function save(item){
  return request.post("/purchase/save", item);
}


export function findList( params = { serialNum, page, size, sort}){
  return request.get("/purchase/findList", {
    params: params
  })
}

export function findById(id){
  return request.get("/purchase/findById", {
    params:{
      id: id
    }
  });
}

export function deleteById(id){
  return request.post("/purchase/deleteById",
    qs.stringify({id: id})
  );
}

export function deleteByIds(ids){
  return request.post("/purchase/deleteByIds", ids);
}


