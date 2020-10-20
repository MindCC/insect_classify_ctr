<template>
  <div class="containner">
    <el-row type="flex" justify="start">
      <el-col :span="6" :offset="2">
        <span class="">模型管理</span>
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
          @change="getTable"
          @input="getTable"
        />
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button type="primary" @click="confirmTraining">训练</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1%">
      <el-col :span="20" :offset="2">
        <el-table
          :data="models"
          stripe
          border
          fit
          highlight-current-row
        >
          <el-table-column
            align="center"
            prop="modelId"
            label="模型id"
            width="100"
          />
          <el-table-column
            align="center"
            prop="name"
            label="名称"
          />
          <el-table-column
            align="center"
            prop="trainTime"
            label="训练时间"
            width="200"
          />
          <el-table-column
            align="center"
            prop="remark"
            label="备注"
            min-width="200"
          />
          <el-table-column
            align="center"
            label="使用情况"
          >
            <template slot-scope="scope">
              <div :class="scope.row.useModel ? 'dot active' : 'dot'" />
              {{ scope.row.useModel ? '使用中' : '未使用' }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.useModel">
                <svg-icon icon-class="no-option" />
              </template>
              <template v-else>
                <el-link type="primary" @click="confirmSetUsing(scope.row.modelId)">使用</el-link>
                <template v-if="scope.row.modelPath !== 'default/'">
                  <el-link type="danger" @click="confirmDelete(scope.row.modelId)">删除</el-link>
                </template>
              </template>
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
        @size-change="getTable"
        @current-change="getTable"
      />
      <el-col :span="2" />
    </el-row>
  </div>
</template>
<script>
import { getModelList, setUsing, deleteModel, training } from '@/api/model'
export default {
  data() {
    return {
      models: [],
      query: '',
      total: 1,
      currentPage: 1,
      pageSize: 10
    }
  },
  created: function() {
    this.getTable()
  },
  methods: {
    getTable: function() {
      getModelList({ query: this.query, currentPage: this.currentPage, pageSize: this.pageSize }).then(res => {
        if (res.code === 20000) {
          this.models = res.data
          this.currentPage = res.currentPage
          this.pageSize = res.pageSize
          this.total = res.total
        }
      })
    },
    confirmSetUsing: function(modelId) {
      this.$confirm('确认设置为使用', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setUsing({ modelId }).then(res => {
          this.getTable()
        })
      }).catch(() => {
        console.log('取消')
      })
    },
    confirmDelete: function(modelId) {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteModel({ modelId }).then(res => {
          this.getTable()
        })
      }).catch(() => {
        console.log('取消')
      })
    },
    confirmTraining: function(name) {
      this.$prompt('请输入模型名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        training({ name: value }).then(res => {
          this.getTable()
        })
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
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    background:#F56C6C;
  }
  .active {
    background: #67C23A;
  }
</style>
