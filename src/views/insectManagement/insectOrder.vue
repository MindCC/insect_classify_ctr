<template>
  <div class="containner">
    <el-row type="flex" justify="start">
      <el-col :span="6" :offset="2">
        <span class="">昆虫提交</span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-divider />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="2">
        <el-input
          v-model="query"
          placeholder="关键字搜索"
          @change="getOrderTable"
          @input="getOrderTable"
        />
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input-number
          v-model="supportCount"
          :min="0"
          label="点赞数筛选"
          @change="getOrderTable"
          @input="getOrderTable"
        />

      </el-col>
      <!-- <el-col :span="4" :offset="1">
        <el-button type="primary">添加昆虫</el-button>
      </el-col> -->
    </el-row>
    <el-row style="margin-top: 1%">
      <el-col :span="20" :offset="2">
        <el-table
          :data="orders"
          stripe
          border
          fit
          highlight-current-row
        >
          <el-table-column
            align="center"
            prop="orderId"
            label="id"
            width="50"
            fixed
          />
          <el-table-column
            align="center"
            prop="typeName"
            label="审批类型"
            fixed
            min-width="120"
            :filters="[{text: '修改', value: '修改'}, {text: '新增', value: '新增'}]"
            :filter-method="filterHandler"
          />
          <el-table-column
            align="center"
            prop="stateName"
            label="状态"
            min-width="100"
            fixed
            :filters="[{text: '已提交', value: '已提交'}, {text: '已驳回', value: '已驳回'}, {text: '已同意', value: '已同意'}]"
            :filter-method="filterHandler"
          />
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="insectName"
            label="昆虫名"
          />
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="scientificName"
            label="别名"
          />
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="insectAlias"
            label="学名"
          />
          <el-table-column
            align="center"
            prop="order"
            label="目"
          />
          <el-table-column
            align="center"
            prop="family"
            label="科"
          />
          <el-table-column
            align="center"
            prop="genus"
            label="属"
          />
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="description"
            label="介绍"
            width="200"
          />
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="feature"
            label="特征"
            width="200"
          />
          <el-table-column
            align="center"
            prop="creator"
            label="创建人"
            width="200"
          />
          <el-table-column
            align="center"
            prop="createTimeStr"
            label="创建时间"
            width="200"
          />
          <el-table-column
            align="center"
            prop="supportCount"
            label="点赞数"
          />
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="150"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.state === undoState.code">
                <el-link type="primary" @click="confirmAproval(scope.row.orderId,'AGREE')">同意</el-link>
                <el-link type="danger" @click="confirmAproval(scope.row.orderId,'REJECT')">驳回</el-link>
              </template>
              <template v-else><svg-icon icon-class="no-option" /></template>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12" />
      <el-pagination
        :total="total"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        @size-change="getOrderTable"
        @current-change="getOrderTable"
      />
      <el-col :span="2" />
    </el-row>
  </div>
</template>
<script>
import { getInsectOrderList, orderOption } from '@/api/insect'
import { state } from '@/utils/insect-order-state'
export default {
  data() {
    return {
      undoState: state['SUBMIT'],
      orders: [],
      query: '',
      total: 1,
      currentPage: 1,
      pageSize: 10,
      supportCount: 10
    }
  },
  created: function() {
    this.getOrderTable()
  },
  methods: {
    filterHandler: function(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    getOrderTable: function() {
      getInsectOrderList({ query: this.query, pageSize: this.pageSize, currentPage: this.currentPage, supportCount: this.supportCount }).then(res => {
        if (res.code === 20000) {
          this.orders = res.data
          this.total = res.total
          this.currentPage = res.currentPage
          this.pageSize = res.pageSize
        }
      })
    },
    confirmAproval: function(orderId, option) {
      this.$confirm('确认操作：' + state[option].message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderOption({ orderId, option: state[option].code }).then(res => {
          if (res.code === 20000) {
            this.getOrderTable()
          }
        })
      }).catch(() => {
        console.log('取消')
      })
    }
  }
}
</script>
<style>
  span {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-weight: bolder
  }
  .containner{
    align-content: center;
    margin-top: 2%;
  }
  .el-tooltip__popper {
    max-width: 400px;
    line-height: 180%;
  }
</style>
