import {methodGet,methodPost} from "./index";

export default {
    login(params) {
        return new methodPost("/login", params)
    },
    register(params) {
        return new methodPost('/user/signUp', params)
    },
    resetPassword(params) {
        return new methodGet('/user/resetPassword', {email: params})
    },
    sayHello(){
        return new methodGet("/sayHello")
    },
    selectPageList(params){
        return new methodPost("/user/selectPageList", params)
    },
    updateUserInfo(params){
        return new methodPost('/user/updateUser', params)
    },
    uploadHeadImage(params){
        return new methodPost('/upload/header', params)
    },
    logout(){
        return new methodGet("/logout")
    },
}
