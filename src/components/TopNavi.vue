<template>
    <div style="width: 100vw;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item @click="goChatToLLM()" style="margin-left: 600px">大模型对话</el-menu-item>
            <el-menu-item @click="goKnowledgeChatToRAG()">知识库对话</el-menu-item>
            <el-menu-item @click="goLogin()">退出登录</el-menu-item>
        </el-menu>
    </div>
</template>
<style>
.logout-button {
  float: left;
  margin-top: 20px;
  margin-left: 50px;
  font-weight: bold; /* 加粗字体 */
  cursor: pointer; /* 鼠标悬停时显示手型光标 */
  color: black; /* 默认字体颜色 */
}
.logout-button:hover {
  color: blue; /* 悬停时字体颜色变为蓝色 */
}
</style>
<script>
// import store from '@/store/createStore';
export default {
  data() {
    return {};
  },
  methods: {
    goLogin() {
      this.$router.push({
        name: "/loginTable",
      });
    },
    goChatToLLM() {
      if (this.$route.path !== "/chatToLLM") {
        this.$router.push({
          name: "chatToLLM",
        });
      }
    },
    goKnowledgeChatToRAG() {
      if (this.$route.path !== "/knowledgeChatToRAG") {
        this.$router.push({
          name: "knowledgeChatToRAG",
        });
      }
    },
  },
  mounted() {},
  created() {},
};
</script>
