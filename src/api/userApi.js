import index from "./index";

export default {
    login(params) {
        return new index.methodPost("/login", params)
    },
    sayHello(){
        return new index.methodGet("/sayHello")
    },
    logout(){
        return new index.methodGet("/logout")
    },
}
