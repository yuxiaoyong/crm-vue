import request from "@/util/request"
var qs = require('qs');

export const ROOT_MENU_ID = 1
/**
 * 添加或更新菜单信息
 * @param item
 * @returns {AxiosPromise<any> | * | void}
 */
export function save(item){
  return request.post("/menu/save", item);
}

/**
 * 根据条件分页查询菜单信息
 * @param name 菜单名称
 * @param page 当前页码
 * @param size 每页数量
 * @returns {*}
 */
export function findList({ name, page, size}){
  return request.get("/menu/findList", {
    params:{
      name: name,
      page: page,
      size: size
    }
  })
}

/**
 * 根据Id查询菜单信息
 * @param id 菜单ID
 * @returns {*}
 */
export function findById(id){
  return request.get("/menu/findById", {
    params:{
      id: id
    }
  });
}

export function findRootMenu(){
  return findById(ROOT_MENU_ID);
}

/**
 * 根据ID删除菜单信息
 * @param id 菜单ID
 * @returns {AxiosPromise<any> | * | void}
 */
export function deleteById(id){
  return request.post("/menu/deleteById",
    qs.stringify({id: id})
  );
}

/**
 * 根据ID数组删除菜单信息
 * @param ids 菜单ID数组
 * @returns {AxiosPromise<any> | * | void}
 */
export function deleteByIds(ids){
  return request.post("/menu/deleteByIds", ids);
}


