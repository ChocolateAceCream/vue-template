<template>
  <div class="menu-mgnt">
    <el-row class="add-menu-btn-wrapper">
      <el-button
        class="login-new-user-btn"
        type="primary"
        @click="handleRegisterUser"
      >
        + 添加菜单
      </el-button>
    </el-row>
    <my-table
      :data="tableData"
      :config="tableConfig"
    >
      <template #addressHeader="{row}">
        addddd
      </template>
      <template #addressBody="{row}">
        ---{{ row.address }}---
      </template>
      <template #opsH>
        <el-input
          size="small"
          placeholder="Type to search"
        />
      </template>
      <template #opsB>
        <el-button size="small">Edit</el-button>
        <el-button
          size="small"
          type="danger"
        >Delete</el-button>
      </template>
    </my-table>
    <pagination
      v-model:currentPage="pageCurge"
      v-model:pageSize="pageSize"
      :total="total"
      style="justify-content: end"
      @change="handlePageChange"
    />
    <modal
      ref="modalRef"
      @close="onModalClose"
      @confirm="onModalConfirm"
    >
      <div>this is body</div>
      <template #title>
        <div>this is title</div>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="dialogFormVisible = false"
          >Confirm</el-button>
        </span>
      </template>
    </modal>
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
          account: store.userInfo.account,
        }
      }
      console.log('---store--', store.userInfo.account)
      const { data: res } = await getMenu({ params: params })
      if (res.errorCode === '0') {
        console.log('-------get menu res--------', res)
      }
    }
    const handleRegisterUser = () => {
      modalState.onModalOpen()
    }

    const modalState = reactive({
      modalRef: null,
      onModalOpen() {
        modalState.modalRef.openModal()
      },
      onModalClose() {
        modalState.modalRef.closeModal()
        console.log('-------onCancel------')
      },
      onModalConfirm() {
        modalState.modalRef.closeModal()
        console.log('-------onModalConfirm------')
      }
    })

    const handlePageChange = () => {
      console.log('------handlePageChange-----------')
    }

    const state = reactive({
      pageCurge: 2,
      pageSize: 20,
      total: 100,
      searchContent: '',
      tableConfig: [
        { label: 'date', prop: 'date', align: 'right' },
        { label: 'Ops', name: 'ops', headerSlot: 'opsH', bodySlot: 'opsB' },
        { label: 'address', prop: 'address', headerSlot: 'addressHeader', bodySlot: 'addressBody' },
        { label: 'name', prop: 'name' },
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
      console.log('-------onMounted----', onMounted)
    })
    return {
      search,
      handlePageChange,
      handleRegisterUser,
      ...toRefs(state),
      ...toRefs(modalState)
    }
  }
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
