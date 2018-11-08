import request from "@/util/request"
var qs = require('qs');
export function save(item){
  return request.post("/follow/save", item);
}


export function findList({ customerId, contactId, page, size}){
  return request.get("/follow/findList", {
    params:{
      "contact.customer.id": customerId,
      "contact.id": contactId,
      page: page,
      size: size,
      sort: 'followTime,desc'

    }
  })
}

export function findById(id){
  return request.get("/follow/findById", {
    params:{
      id: id
    }
  });
}

export function deleteById(id){
  return request.post("/follow/deleteById",
    qs.stringify({id: id})
  );
}

export function deleteByIds(ids){
  return request.post("/follow/deleteByIds", ids);
}

export function getLastFollow(contactId){
  return request.get("/follow/getLastFollow", {
    params:{
      contactId: contactId
    }
  });
}
