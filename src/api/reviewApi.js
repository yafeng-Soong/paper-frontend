import {methodPost} from "./index";

export default {
  getPaperList(params) {
    return methodPost('/admin/list', params)
  },
  check(params) {
    return methodPost('/admin/check', params)
  }
}
