import MyTable from './MyTable'
import Pagination from './Pagination'
import Modal from './Modal'

export default {
  install(app) {
    app.use(MyTable)
    app.use(Pagination)
    app.use(Modal)
  }
}
