import ElSelectDict from './ElSelectDict'
import ElSelectRank from './ElSelectRank'
import ElPopPanel from './ElPopPanel'
import ElUploadFile from './ElUploadFile'

export default {
  install: function(Vue){
    Vue.component('ElSelectDict', ElSelectDict);
    Vue.component('ElSelectRank', ElSelectRank);
    Vue.component('ElPopPanel', ElPopPanel);
    Vue.component('ElUploadFile', ElUploadFile);
  }
}
