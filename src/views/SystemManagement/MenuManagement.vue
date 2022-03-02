<template>
  <div class="menu-mgnt">
    <el-row class="add-menu-btn-wrapper">
      <el-button class="login-new-user-btn" type="primary" @click="handleRegisterUser">
        + 添加菜单
      </el-button>
    </el-row>
    <my-table :data="tableData" :config="tableConfig" :height="100">
      <template #addressHeader="{row}">
        addddd
      </template>
      <template #addressBody="{row}">
        ---{{row.address}}---
      </template>
      <template #opsH>
        <el-input size="small" placeholder="Type to search" />
      </template>
      <template #opsB>
          <el-button size="small"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            >Delete</el-button
          >
        </template>
    </my-table>
  </div>
</template>


<script>
import { postLogin } from '@/api/auth'
import { reactive, toRefs, defineComponent, unref, ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'
// import MyTable from '@/components/shared/MyTable'
import {getMenu, saveMenu} from '@/api/menu'
import { sessionStore } from '@/stores/sessionStore'
export default defineComponent({
  // components: {
  //   MyTable
  // },
  setup(props, ctx) {
    const search = async() => {
      const store = sessionStore()
      const params = {
        params: {
          account: store.account,
        }
      }
      console.log('---store--', store.account)
      const {data: res} = await getMenu({params: params})
      if (res.errorCode === '0') {
        console.log('-------get menu res--------', res)
      }
    }
    const state = reactive({
      searchContent: '',
      tableConfig: [
        { label: 'date', prop: 'date', align: 'right'},
        { label: 'Ops', name: 'ops', headerSlot:'opsH', bodySlot:'opsB'},
        { label: 'address', prop: 'address', headerSlot:'addressHeader', bodySlot:'addressBody'},
        { label: 'name', prop: 'name'},
      ],
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'John',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Morgan',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Jessy',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]
    })

    onMounted(() => {
      // search()
    })
    return {
      search,
      ...toRefs(state)
    }
  },
})
</script>
<style>
.add-menu-btn-wrapper{
  position:relative;
  height:40px;
}
.login-new-user-btn {
  position: absolute;
  right: 0;
}
</style>
