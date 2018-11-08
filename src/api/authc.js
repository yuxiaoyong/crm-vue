import request from "@/util/request"

export function signIn({ username, password }){
  return request.get("/accesstoken/get", {
    params: {
      username: username,
      password: password
    }
  });
}

export function signOut(){
  return request.post("/accesstoken/destroy");
}

