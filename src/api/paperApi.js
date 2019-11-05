import {methodPost} from "./index";

export default {
  paperFileUpload(params){
    return new methodPost("/paper/fileUpload", params)
  },
  paperSubmit(params){
    return new methodPost("/paper/submit", params)
  }
}
