import {methodPost, methodPut} from "./index";

export default {
  paperFileUpload(params){
    return new methodPost("/paper/fileUpload", params)
  },
  paperSubmit(params){
    return new methodPost("/paper/submit", params)
  },
  paperSearchAll(params){
    return new methodPost("/paper/all", params)
  },
  paperCancel(params){
    return new methodPost("/paper/cancel", params)
  },
  paperUpdate(params){
    return new methodPut("/paper/reSubmit", params)
  }
}