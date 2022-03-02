<template>
  <el-table v-bind="$attrs" style="width: 100%"  >
    <template v-for="(item, idx) in config" :key="idx">
      <el-table-column v-bind="item"> 
        <template v-if="item.headerSlot" #header>
          <slot :name="item.headerSlot"></slot>
        </template>
        <template v-if="item.bodySlot" #default="scope">
          <slot :name="item.bodySlot" v-bind="scope"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <!-- <el-pagination
    v-model:currentPage="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[100, 200, 300, 400]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination> -->
</template>
<script>
import {
  useSlots,
  computed,
  h,
  resolveDynamicComponent,
  defineComponent
} from 'vue'
import { ElTableColumn } from 'element-plus'

export default defineComponent({
  props: {
    config: {
      type: Array,
      default: () => []
    }
  },
  setup(props, ctx) {
    console.log('--attrs--------', ctx.attrs)
    const slots = computed(() => {
      // return slotsOrigin.default()
    })
    console.log('--slots.value[0]--------', slots.value)
    const column = resolveDynamicComponent(ElTableColumn)
    // const children = () => [slots.value[2], slots.value[2], slots.value[2]]
    const result = h(column, {label: 'Date', prop: 'date'})
    console.log('--------column-------', column)

    const children = () => [result]
    return {
      // useSlots,
      // computed,
      // h,
      // resolveDynamicComponent,
      // ElTableColumn,
      // slotsOrigin,
      // slots,
      // column,
      // result,
      // children,
      columns: [{label: 'Name', prop: 'name'}],
      data1: [
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
    }
  },
})
</script>
