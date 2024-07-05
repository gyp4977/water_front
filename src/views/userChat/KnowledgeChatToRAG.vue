<template>
  <div>
    <div class="chat-to-rag-fixed-header">
      <div>
        <TopNavi></TopNavi>
      </div>
    </div>
    <div class="chat-to-rag-fixed-aside">知识库对话</div>
    <div class="chat-to-rag-main-container">
      <!-- Main部分，内容可以滚动 -->
      <div class="chat-to-rag-scrollable-main">
        <!-- 用于演示的对话框 -->
        <div
          v-for="message in messages"
          :key="message.id"
          class="chat-to-rag-message-box"
          :class="{
            'chat-to-rag-message-box-talker-1': message.talker === 1,
            'chat-to-rag-message-box-talker-2': message.talker === 2,
          }"
        >
          {{ message.text }}
          <div v-if="message.id === messages.length && message.talker === 2">
            <div
              v-for="docsMessage in docsMessageList"
              :key="docsMessage.docsText"
            >
              <div>
                <hr />
                <div @click="downloadText(docsMessage.docsUrl)">
                  {{ docsMessage.docsName }}
                </div>

                {{ docsMessage.docsText }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部固定Footer -->
      <div class="chat-to-rag-fixed-footer">
        <input
          v-model="sendMessageText"
          placeholder="请输入消息内容"
          class="chat-to-rag-chat-input-box"
        />
        <button class="chat-to-rag-button" @click="ragSendMessage()">
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "knowledgeChatToRAG",
  data() {
    return {
      sendMessageText: "",
      answer: "",
      tempMessageText: "",
      messages: [],
      docsNum: "",
      docsMessageList: [
        {
          docsMessageId: -1,
          docsName: "test",
          docsUrl: "test",
          docsText: "test",
        },
      ],
    };
  },
  methods: {
    ragSendMessage() {
      let newId = this.messages.length + 1;
      this.tempMessageText = this.sendMessageText;
      let newMessage = {
        id: newId,
        talker: 1,
        text: this.tempMessageText,
      };
      this.sendMessageText = "";
      this.messages.push(newMessage);
      axios
        .post("/api/testKnowledgeChat", {
          query: this.tempMessageText,
        })
        .then((response) => {
          if (response.data.isok == true) {
            this.answer = response.data.answer;
            this.docsNum = response.data.docsNum;
            this.docsMessageList = response.data.docsMessageList;
            let newId = this.messages.length + 1;
            this.tempMessageText = this.answer;
            let newMessage = {
              id: newId,
              talker: 2,
              text: this.tempMessageText,
            };
            this.answer = "";
            this.messages.push(newMessage);
          } else {
            this.$message({
              message: "发送失败",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert(error);
        });
    },
    downloadText(docsUrl) {
    //   alert(docsUrl);
      const fileUrl = docsUrl;
      // 创建一个隐藏的<a>标签
      const link = document.createElement("a");
      link.href = fileUrl;
      link.style.display = "none";
      link.setAttribute("download", ""); // 设置下载属性
      // 将<a>标签添加到DOM中
      document.body.appendChild(link);
      // 触发点击事件以下载文件
      link.click();
      // 清理
      document.body.removeChild(link);
    },
  },
  mounted() {},
  created() {},
};
</script>

<style>
/* Header样式 */
.chat-to-rag-fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #e0e0e0;
  box-sizing: border-box;
}

/* Aside样式 */
.chat-to-rag-fixed-aside {
  position: fixed;
  top: 60px; /* 与Header高度相同，调整根据实际需要 */
  left: 0;
  width: 300px;
  height: 100%;
  background-color: #ccc; /* 设置背景色 */
  padding: 10px;
  box-sizing: border-box;

  text-align: center;
}

/* Main样式 */
.chat-to-rag-main-container {
  margin-top: 80px; /* 与Header高度相同，调整根据实际需要 */
  top: 80px;
  margin-left: 300px; /* 与Aside宽度相同，调整根据实际需要 */
  height: 100%;
}

.chat-to-rag-scrollable-main {
  height: calc(100vh - 120px); /* 减去Header和Footer的高度，调整根据实际需要 */
  overflow-y: auto; /* 允许内容滚动 */
  padding: 10px;
  box-sizing: border-box;
}

.chat-to-rag-message-box {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
}

.chat-to-rag-message-box-talker-1 {
  background-color: #e0e0e0; /* 加深的灰色 */
  border: 1px solid #bdbdbd; /* 边框 */
}

.chat-to-rag-message-box-talker-2 {
  background-color: #ffffff; /* 白色 */
  border: 1px solid #bdbdbd; /* 边框 */
}

/* Footer样式 */
.chat-to-rag-fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f0f0f0;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.chat-to-rag-chat-input-box {
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.chat-to-rag-button {
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.chat-to-rag-button:hover {
  background-color: #0056b3;
}

.chat-to-rag-button:active {
  background-color: #00438a;
}
</style>
