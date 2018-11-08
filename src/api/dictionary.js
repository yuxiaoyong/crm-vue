import request from "@/util/request"
var qs = require('qs');

/**
 * 添加或更新字典信息
 * @param item
 * @returns {AxiosPromise<any> | * | void}
 */
export function save(item){
  return request.post("/dict/save", item);
}

/**
 * 根据条件分页查询字典信息
 * @param type 字典类型
 * @param page 当前页码
 * @param size 每页数量
 * @returns {*}
 */
export function findList(params = { dictType, page, size}){
  return request.get("/dict/findList", {
    params:params
  })
}

/**
 * 根据Id查询字典信息
 * @param id 字典ID
 * @returns {*}
 */
export function findById(id){
  return request.get("/dict/findById", {
    params:{
      id: id
    }
  });
}

/**
 * 根据ID删除字典信息
 * @param id 字典ID
 * @returns {AxiosPromise<any> | * | void}
 */
export function deleteById(id){
  return request.post("/dict/deleteById",
    qs.stringify({id: id})
  );
}

/**
 * 根据ID数组删除字典信息
 * @param ids 字典ID数组
 * @returns {AxiosPromise<any> | * | void}
 */
export function deleteByIds(ids){
  return request.post("/dict/deleteByIds", ids);
}

/**
 * 根据字典类型和字典值查询字典信息
 * @param type 字典类型
 * @param value 字典值
 * @returns {*}
 */
export function findByTypeAndValue({ type, value }){
  return request.get("/dict/findByTypeAndValue", {
    params:{
      type: type,
      value: value
    }
  })
}

export function cacheAllDict(){
  findList({type: null, page: 0, size: 1000}).then(function(res){
    console.log(res);
  });
}

