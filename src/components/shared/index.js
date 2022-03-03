import MyTable from './MyTable'
import Pagination from './Pagination'

export default {
  install(app) {
    app.use(MyTable)
    app.use(Pagination)
  }
}