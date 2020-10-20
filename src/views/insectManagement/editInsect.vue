<template>
  <div class="containner">
    <el-row type="flex" justify="start">
      <el-col :span="6" :offset="2">
        <span class="head">{{ form.insectId?'编辑昆虫信息':'添加昆虫信息' }}</span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-divider />
      </el-col>
    </el-row>
    <el-form ref="editForm" :model="form" :rules="!form.insectId ? rulesAdd : rulesUpdate">
      <el-row type="flex" justify="start">
        <el-col :span="6" :offset="2">
          <el-form-item label="昆虫名：" prop="insectName">
            <el-col :span="18">
              <el-input v-model="form.insectName" :readonly="readOnly" maxlength="64" show-word-limit />
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="学名：" prop="scientificName">
            <el-col :span="18">
              <el-input v-model="form.scientificName" :readonly="readOnly" maxlength="128" show-word-limit />
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="别名：" prop="insectAlias">
            <el-col :span="18">
              <el-input v-model="form.insectAlias" :readonly="readOnly" maxlength="128" show-word-limit />
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :span="6" :offset="2">
          <el-form-item label="目：" prop="order">
            <el-col :span="18">
              <el-input v-model="form.order" :readonly="readOnly" maxlength="64" show-word-limit />
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="科：" prop="family">
            <el-col :span="18">
              <el-input v-model="form.family" :readonly="readOnly" maxlength="64" show-word-limit />
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="属：" prop="genus">
            <el-col :span="18">
              <el-input v-model="form.genus" :readonly="readOnly" maxlength="64" show-word-limit />
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :span="8" :offset="2">
          <el-form-item label="介绍：" prop="description">
            <el-col :span="18">
              <el-input v-model="form.description" :readonly="readOnly" maxlength="1024" show-word-limit type="textarea" :rows="4" />
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form-item label="特征习性：" prop="feature">
            <el-col :span="18">
              <el-input v-model="form.feature" :readonly="readOnly" maxlength="1024" show-word-limit type="textarea" :rows="4" />
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-divider />
      </el-col>
    </el-row>
    <el-row v-if="!form.insectId">
      <el-col :span="2" :offset="2"><span>图片上传：</span></el-col>
      <el-col :span="16">
        <el-upload
          :action="actionUrl()"
          list-type="picture-card"
          multiple
          :auto-upload="false"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="submitAddForm">提交</el-button>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col :span="4" :offset="2">
        <el-button type="primary" @click="handleSubmitUpdateForm">提交表单</el-button>
        <el-button type="primary" @click="handleEditPic">编辑图片</el-button>
      </el-col>
      <el-col :span="12">
        <span>注：编辑图片时，表单将提交且不能修改，因为图片将根据表单信息保存</span>
      </el-col>
    </el-row>
    <el-row v-if="editPic" style="margin-top:2%;margin-buttom:5%">
      <el-col :span="22" :offset="1">
        <el-col v-for="(url, index) in pic" :key="index" :span="3" style="margin-top: 1%">
          <el-image
            :class="currentSort==index ? 'imgStyle active':'imgStyle'"
            :src="url"
            @mouseenter="handlePicMouseEnter(index)"
            @mouseleave="handlePicMouseLeave(index)"
          />
          <span style="font-size: 12px">{{ url.split('/')[url.split('/').length - 1] }}</span>
          <el-button type="danger" size="mini" @click="handleDeletePic(url)">删除</el-button>
        </el-col>
      </el-col>
    </el-row>
    <el-row v-if="editPic" style="margin-bottom:100px;margin-top:2%">
      <el-col :span="6" :offset="2">
        <el-upload
          ref="picUpdate"
          list-type="picture"
          style="margin-left:1%"
          multiple
          action=""
          :auto-upload="false"
          :file-list="updatePicList"
          :on-change="handlepicUpdateChange"
        >
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-col>
      <el-col :span="1">
        <el-button size="small" type="primary" @click="handlePicUpdateUpload">上传</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { getInsectById, deleteInsectPic, updateInsect } from '@/api/insect'
export default {
  data() {
    return {
      form: {
        insectId: this.$route.query.insectId,
        insectName: '',
        insectAlias: '',
        scientificName: '',
        order: '',
        family: '',
        genus: '',
        description: '',
        feature: '',
        classId: 0,
        className: ''
      },
      rulesAdd: {
        insectName: { required: true, message: '请填写昆虫名', trigger: 'blur' },
        insectAlias: { required: true, message: '请填写昆虫别名', trigger: 'blur' },
        scientificName: { required: true, message: '请填写昆虫学名', trigger: 'blur' },
        order: { required: true, message: '请填写昆虫目类', trigger: 'blur' },
        family: { required: true, message: '请填写昆虫科类', trigger: 'blur' },
        genus: { required: true, message: '请填写昆虫属类', trigger: 'blur' },
        description: { required: true, message: '请填写昆虫描述', trigger: 'blur' },
        feature: { required: true, message: '请填写昆虫特征习性', trigger: 'blur' }
      },
      rulesUpdate: {
        insectName: { required: true, message: '请填写昆虫名', trigger: 'blur' },
        scientificName: { required: true, message: '请填写昆虫学名', trigger: 'blur' },
        order: { required: true, message: '请填写昆虫目类', trigger: 'blur' },
        description: { required: true, message: '请填写昆虫描述', trigger: 'blur' }
      },
      fileList: [],
      updatePicList: [],
      pic: [],
      editPic: false,
      readOnly: false,
      dialogImageUrl: '',
      dialogVisible: false,
      picMouseEnter: false,
      currentSort: -1
    }
  },
  created: function() {
    this.getInsctInfo()
  },
  methods: {
    getInsctInfo() {
      if (this.form.insectId) {
        getInsectById({ insectId: this.form.insectId }).then(res => {
          if (res.code === 20000) {
            this.form = res.data
            if (res.data.pic !== '') {
              this.pic = res.data.pic.split(';')
            }
          }
        })
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    actionUrl() {
      return '/insect-info/insect-add'
    },
    header() {
      return { 'Content-Type': 'multipart/form-data' }
    },
    submitAddForm() {
      this.$refs['editForm'].validate((validate, obj) => {
        if (validate) {
          if (this.fileList.length > 0) {
            const formdata = new FormData()
            if (!this.insectId) {
              formdata.append('insectId', 0)
            }
            formdata.append('insectName', this.form.insectName)
            formdata.append('insectAlias', this.form.insectAlias)
            formdata.append('scientificName', this.form.scientificName)
            formdata.append('order', this.form.order)
            formdata.append('family', this.form.family)
            formdata.append('genus', this.form.genus)
            formdata.append('description', this.form.description)
            formdata.append('classId', this.form.classId)
            formdata.append('className', this.form.className)

            this.fileList.forEach((file, index) => {
              formdata.append('files', file.raw)
              console.log(file)
            })
            axios.post('insect-info/insect-add', formdata,  { headers: { 'token': getToken() }}).then(res => {
              if (res.data.code === 20000) {
                this.$message({
                  message: '新增成功',
                  type: 'success',
                  duration: 5 * 1000
                })
                this.$router.go(-1)
              }
            })
          } else {
            this.$message({
              message: '请至少选择一张图片',
              type: 'warning',
              duration: 5 * 1000
            })
          }
        }
      })
    },
    handlePicMouseEnter: function(index) {
      this.currentSort = index
    },
    handlePicMouseLeave: function(index) {
      this.currentSort = -1
    },
    handleEditPic: function() {
      this.editPic = !this.editPic
      if (this.readOnly) {
        return
      }
      this.handleSubmitUpdateForm()
    },
    handleSubmitUpdateForm: function() {
      if (!this.readOnly) {
        // 提交表单
        console.log(this.form)
        updateInsect(this.form).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: '更新成功',
              type: 'success',
              duration: 5 * 1000
            })
          }
        })
        this.readOnly = true
      }
    },
    handleDeletePic(path) {
      deleteInsectPic({ path }).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1 * 1000
          })
          this.getInsctInfo()
        }
      })
    },
    handlepicUpdateChange(file, fileList) {
      this.updatePicList = fileList
    },
    handlePicUpdateUpload() {
      const updatePicFormData = new FormData()
      updatePicFormData.append('insectId', this.form.insectId)
      this.updatePicList.forEach((file, index) => {
        updatePicFormData.append('files', file.raw)
      })
      if (!this.updatePicList.length > 0) {
        this.$message({
          message: '请选择图片',
          type: 'warning',
          duration: 5 * 1000
        })
        return
      }
      axios.post('/insect-info/insect-pic-update', updatePicFormData, { headers: { 'token': getToken() }}).then(res => {
        console.log(res)
        if (res.data.code === 20000) {
          this.$message({
            message: '新增成功',
            type: 'success',
            duration: 3 * 1000
          })
          this.getInsctInfo()
          this.updatePicList = []
        }
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
  .imgStyle {
        width: 142px;
        height: 142px;
        margin-left: 1%;
        border: 3px solid #DCDFE6;
        border-radius: 4px;
  }
  .active {
    border: 3px solid #409EFF;
  }
</style>
