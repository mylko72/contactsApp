import Constant from '../constant'
import CONF from '../Config.js'

// 상태 데이터 등록
export default {
  currentView : null,
  mode : 'add',
  contact : { no:0, name:'', tel:'', address:'', photo:'' },
  contactlist : {
      pageno:1, pagesize: CONF.PAGESIZE, totalcount:0, contacts:[]
  }
}
