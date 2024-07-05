<template>
  <div style="height: 100%">
    <div class="ATopNavi">
      <TopNavi></TopNavi>
    </div>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246); height: 100%">
        <el-menu :default-openeds="['1', '3']" style="height: 100%" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="/testTable">选项1
                <router-link
                  :to="{ name: 'testTable', params: { id: 123, pageSize: this.pageSize } }">跳转到关于页面</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px; border-bottom: 1px solid #ccc">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>

          <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" round @click="showValue1()">主要按钮</el-button>
          </div>

          <br>

          <!-- 表格 -->
          <el-table :data="tableData" border>
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="phoneNumber" label="电话号码" width="180"></el-table-column>
            <el-table-column prop="regDate" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="lastDate" label="更新时间" width="180"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini">编辑</el-button>
                <el-button type="danger" size="mini" @click="doDelete(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <br>
          <!-- 分页条 -->
          <el-pagination background layout="sizes, prev, pager, next, jumper, total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :total="totalNum" :page-sizes="[5, 10, 20]">
          </el-pagination>
          <br><br>
          <el-button size="primary" @click="showMarkdown()">显示markdown编辑器</el-button>
          <el-button size="primary" @click="downloadPicture()">下载一个图片</el-button>
          <el-button size="primary" @click="showArticle()">显示文章内容</el-button>
        </el-main>
        <el-dialog title="markdown编辑器" :visible.sync="dialogFormVisible" width="80%">
          <el-form :model="form">
            <el-form-item label="编辑内容" :label-width="formLabelWidth">
              <mavon-editor ref="md" v-model="form.content" :ishljs="true" @imgAdd="imgAdd" style="margin-left: -100px;"/>
            </el-form-item>
          </el-form>
          <mavon-editor ref="md" v-model="form.content" :ishljs="true" @imgAdd="imgAdd" style="margin-left: -100px;"/>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="查看文章" :visible.sync="dialogArticleVisible" width="60%">
          <el-card>
            <div>
              <mavon-editor
                class="md"
                :value="form.content"
                :subfield="false"
                :defaultOpen="'preview'"
                :toolbarsFlag="false"
                :editable="false"
                :scrollStyle="true"
                :ishljs="true"
              />
            </div>
          </el-card>
        </el-dialog>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomeView',
  data() {
    return {
      tableData: [],
      value1: '',
      totalNum: 0,
      page: 1,
      pageSize: 10,
      dialogFormVisible: false,
      dialogArticleVisible: false,
      formLabelWidth: '200px',
      value: '',
      content: '',
      form:{
        name:'',
        region:'',
        content: '',
      }
    }
  },
  methods: {
    showValue1() {
      alert(this.value1);
    },
    showMarkdown(){
      this.dialogFormVisible = true;
      // alert(this.form.content);
    },
    showArticle(){
      this.dialogArticleVisible = true;
      // alert(this.form.content);
    },
    downloadPicture(){
      window.open(this.url);
    },
    imgAdd(pos, $file){
      let $vm = this.$refs.md;
      const formData = new FormData();
      formData.append('file', $file);
      axios({
        url: 'http://localhost:8080/api/upload',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response) => {
        // alert(response.data.url);
        $vm.$img2Url(pos, response.data.url);
      }).catch(error => {
        alert(error);
      });
    },
    fetchData() {
      axios.post('/api/userLimitInit', { page: this.page, pageSize: this.pageSize }).then(response => {
        this.tableData = response.data.userList;
        this.totalNum = response.data.totalNum;
        for(let i = 0; i < this.tableData.length; i++){
          this.tableData[i].lastDate = this.tableData[i].lastDate.substring(0,10) + " " + this.tableData[i].lastDate.substring(11,19);
          this.tableData[i].regDate = this.tableData[i].regDate.substring(0,10) + " " + this.tableData[i].regDate.substring(11,19);
        }
      }).catch(error => {
        console.error('Error fetching data:', error);
        alert("error");
      });
    },
    handleSizeChange: function (val) {
      // alert("每页记录数变化" + val);
      this.pageSize = val;
      axios.post('/api/userLimitInit', { page: this.page, pageSize: this.pageSize }).then(response => {
        this.tableData = response.data.userList;
        this.totalNum = response.data.totalNum;
      }).catch(error => {
        console.error('Error fetching data:', error);
        alert("error");
      });
    },
    handleCurrentChange: function (val) {
      // alert("页码发生变化" + val);
      this.page = val;
      axios.post('/api/userLimitInit', { page: this.page, pageSize: this.pageSize }).then(response => {
        this.tableData = response.data.userList;
        this.totalNum = response.data.totalNum;
      }).catch(error => {
        console.error('Error fetching data:', error);
        alert("error");
      });
    },
    test(id) {
      // alert(id);
      // this.$router.push({
      //   path: "/testTable",
      //   query: { pageSize: this.pageSize },
      // });
      this.$router.push({
        name: "testTable",
        params: { pageSize: id, id: 123 },
      });
    },
  },
  mounted() {
    this.fetchData();
  },

}
</script>

<style>
.ATopNavi {
  position: fixed;
  top: 0;
  z-index: 1000;
}
</style>
