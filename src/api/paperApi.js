import {methodPost, methodPut, methodGet} from "./index";

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
  },
  paperDownload(params) {
      return new methodGet('/paper/download', {paperId: params})
  },
  paperOperationDetail(params){
    return new methodPost("/paper/operation/detail", params)
  },
  pay(params){
      return new methodPost("/paper/pay", params)
  }
}
