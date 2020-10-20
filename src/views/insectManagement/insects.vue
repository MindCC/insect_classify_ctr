<template>
  <div class="containner">
    <el-row type="flex" justify="start">
      <el-col :span="6" :offset="2">
        <span class="head">昆虫信息</span>
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
          @change="handleSearchChange"
          @input="handleSearchChange"
        />
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button type="primary" @click="addInsect">添加昆虫</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1%;margin-bottom:1%">
      <el-col :span="20" :offset="2">
        <el-table
          :data="insects"
          stripe
          border
          fit
          highlight-current-row
        >
          <el-table-column
            align="center"
            prop="insectId"
            label="昆虫id"
          />
          <el-table-column
            align="center"
            prop="insectName"
            label="昆虫名"
          />
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="scientificName"
            label="学名"
          />
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="insectAlias"
            label="别名"
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
            label="介绍"
            width="150"
          >
            <span slot-scope="scope">{{ scope.row.description }}</span>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="feature"
            label="特征"
          />
          <el-table-column
            align="center"
            label="操作"
          >
            <el-link slot-scope="scope" type="primary" @click="editInsect(scope.row.insectId)">编辑</el-link>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-bottom:1%">
      <el-col :span="12" />
      <el-pagination
        background
        :total="total"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-col :span="2" />
    </el-row>
  </div>
</template>
<script>
import { getInsectList } from '@/api/insect'
export default {
  data() {
    return {
      insects: [],
      query: '',
      total: 1,
      currentPage: 1,
      pageSize: 10
    }
  },
  created: function() { this.getTable() },
  methods: {
    getTable: function() {
      getInsectList({ query: this.query, pageSize: this.pageSize, currentPage: this.currentPage }).then(
        response => {
          if (response.code === 20000) {
            this.insects = response.data
            this.currentPage = response.currentPage
            this.pageSize = response.pageSize
            this.total = response.total
          }
        }
      )
    },
    handleCurrentChange: function() {
      this.getTable()
    },
    handleSizeChange: function() {
      this.getTable()
    },
    handleSearchChange: function() {
      this.getTable()
    },
    addInsect: function() {
      this.$router.push('/insectManagement/insects/edit')
    },
    editInsect: function(insectId) {
      console.log(insectId)
      this.$router.push({
        path: '/insectManagement/insects/edit',
        query: { insectId }
      })
    }
  }
}
</script>
<style>
  .head {
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
