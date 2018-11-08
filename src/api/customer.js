import request from "@/util/request"
let qs = require('qs');
export function save(item){
  return request.post("/customer/save", item);
}


export function findList(params = { name, page, size, sort}){
  return request.get("/customer/findList", {
    params: params
  })
}

export function findById(id){
  return request.get("/customer/findById", {
    params:{
      id: id
    }
  });
}

export function deleteById(id){
  return request.post("/customer/deleteById",
    qs.stringify({id: id})
  );
}

export function deleteByIds(ids){
  return request.post("/customer/deleteByIds", ids);
}


