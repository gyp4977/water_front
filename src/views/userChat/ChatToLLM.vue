<template>
  <div>
    <div class="chat-to-llm-fixed-header">
      <div>
        <TopNavi></TopNavi>
      </div>
    </div>
    <div class="chat-to-llm-fixed-aside">
      <div>
        <el-button
          @click="createNewChat()"
          type="primary"
          plain
          style="width: 260px"
          >新建对话</el-button
        >
      </div>
      <div
        v-for="chat in chatList"
        :key="chat.chatId"
        class="chat-to-llm-chat-box"
      >
        <div class="chat-info" @click="changeChat(chat.chatId)">
          {{ chat.chatName }}
        </div>
        <div class="chat-edit-icon" @click="editChatname(chat.chatId)">
          <i class="el-icon-edit"></i>
        </div>
        <div class="chat-delete-icon" @click="deleteChat(chat.chatId)">
          <i class="el-icon-delete"></i>
        </div>
      </div>
    </div>
    <div class="chat-to-llm-main-container">
      <!-- Main部分，内容可以滚动 -->
      <div class="chat-to-llm-scrollable-main">
        <!-- 用于演示的对话框 -->
        <div
          v-for="message in messages"
          :key="message.id"
          class="chat-to-llm-message-box"
          :class="{
            'chat-to-llm-message-box-talker-1': message.talker === 1,
            'chat-to-llm-message-box-talker-2': message.talker === 2,
          }"
        >
          {{ message.text }}
        </div>
      </div>
      <!-- 底部固定Footer -->
      <div class="chat-to-llm-fixed-footer">
        <input
          v-model="sendMessageText"
          placeholder="请输入消息内容"
          class="chat-to-llm-chat-input-box" 
          @keydown.enter="handleEnter()"
        />
        <button v-if="send_or_not" class="chat-to-llm-button" @click="chatSendMessage()" >
          发送
        </button>
        <div v-else>请等待••• </div>
      </div>
    </div>
    <el-dialog
      title="删除确认"
      :visible.sync="deletdialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmdeletChat()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="重命名"
      :visible.sync="editdialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>请重命名对话：</span>
      <input
          v-model="Chat_name"
          placeholder="  chat_name"
        />
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmeditChatname()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/createStore";
export default {
  name: "chatToLLM",
  data() {
    return {
      userId: "",
      chatId: "NaN",
      deleteChatId: "",
      editChatnameId: "",
      Chat_name:"",
      deletdialogVisible: false,
      editdialogVisible: false,
      send_or_not:true,
      sendMessageText: "",
      returnMessageText: "",
      tempMessageText: "",
      messages: [
        // { id: 1, talker: 1, text: "Message 1" },
        // { id: 2, talker: 2, text: "Message 2" },
      ],
      chatList: [{ userId: "", chatId: "", chatName: "" }],
    };
  },
  methods: {
    TestAdd() { //测试
      let newId = this.messages.length + 1;
      let newMessage = {
        id: newId,
        text: this.newMessageText,
      };
      this.messages.push(newMessage);
      this.newMessageText = "";
    },
    handleEnter() { // 问题回车发送
        this.chatSendMessage();  
      },  
    chatSendMessage() {// 问题发送
      if(isNaN(this.chatId)){
        alert("请新建对话");
        return;
      }
      let newId = this.messages.length + 1;
      this.tempMessageText = this.sendMessageText;
      let newMessage = {
        id: newId,
        talker: 1,
        text: this.tempMessageText,
      };
      this.sendMessageText = "";
      this.messages.push(newMessage);
      this.send_or_not=false;

      axios
        .post("/api/testChat", {
          query: this.tempMessageText,
          chatId: this.chatId,
        })
        .then((response) => {
          if (response.data.isok == true) {
            this.returnMessageText = response.data.returnMessageText;
            let newId = this.messages.length + 1;
            this.tempMessageText = this.returnMessageText;
            let newMessage = {
              id: newId,
              talker: 2,
              text: this.tempMessageText,
            };
            this.returnMessageText = "";
            this.messages.push(newMessage);
            this.send_or_not=true;
          } else {
            this.$message({
              message: "发送失败",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("error");
        });
    },
    chatListInit() {
      axios
        .post("/api/chatListInit", {
          userId: this.userId,
        })
        .then((response) => {
          if (response.data.isok == true) {
            if (response.data.chatListSize === 0) {
              this.chatList = [];
              this.messages = [];
              this.chatId = "NaN";
            } else {
              this.chatList = response.data.chatList;
              this.chatId =
              this.chatList[response.data.chatListSize - 1].chatId;
              this.chatMessageListInit();
            }
          } else {
            this.$message({
              message: "发送失败",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("error");
        });
    },
    createNewChat() {//新建对话
      axios
        .post("/api/createNewChat", {
          userId: this.userId,
        })
        .then((response) => {
          if (response.data.isok == true) {
            this.chatListInit();
          } else {
            this.$message({
              message: "创建失败",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("error");
        });
    },
    chatMessageListInit() {
      axios
        .post("/api/chatMessageListInit", {
          chatId: this.chatId,
        })
        .then((response) => {
          if (response.data.isok == true) {
            this.messages = response.data.chatMessageList;
          } else {
            this.$message({
              message: "失败",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("error");
        });
    },
    changeChat(chatId) {
      this.chatId = chatId;
      this.chatMessageListInit();
    },
    deleteChat(chatId) {
      this.deleteChatId = chatId;
      this.deletdialogVisible = true;
    },
    confirmdeletChat() {   //删除对话
      axios
      .post("/api/deleteChat", {
        chatId: this.deleteChatId,
      })
      .then((response) => {
        if (response.data.isok == true) {
          this.chatListInit();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "失败",
            type: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("error");
      });
      this.deletdialogVisible = false;
    },

    editChatname(chatId) {  //重命名对话
      this.editChatnameId = chatId;
      this.editdialogVisible = true;
    },
    confirmeditChatname() {
      axios
        .post("/api/editChatname", {
          chatId: this.editChatnameId,
          chatname: this.Chat_name,
        })
        .then((response) => {
          if (response.data.isok == true) {
            this.chatListInit();
            this.$message({
              message: "重命名成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "失败",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("error");
        });
        this.editdialogVisible = false;
    },
  },
  mounted() {},
  created() {
    this.chatList = [];
    this.userId = store.state.id;
    this.chatListInit();
  },
};
</script>

<style>
/* Header样式 */
.chat-to-llm-fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #e0e0e0;
  box-sizing: border-box;
}

/* Aside样式 */
.chat-to-llm-fixed-aside {
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
.chat-to-llm-main-container {
  margin-top: 80px; /* 与Header高度相同，调整根据实际需要 */
  margin-left: 300px; /* 与Aside宽度相同，调整根据实际需要 */
  height: 100%;
}

.chat-to-llm-scrollable-main {
  height: calc(100vh - 120px); /* 减去Header和Footer的高度，调整根据实际需要 */
  overflow-y: auto; /* 允许内容滚动 */
  padding: 10px;
  box-sizing: border-box;
}

.chat-to-llm-message-box {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
}

.chat-to-llm-message-box-talker-1 {
  background-color: #e0e0e0; /* 加深的灰色 */
  border: 1px solid #bdbdbd; /* 边框 */
}

.chat-to-llm-message-box-talker-2 {
  background-color: #ffffff; /* 白色 */
  border: 1px solid #bdbdbd; /* 边框 */
}

/* Footer样式 */
.chat-to-llm-fixed-footer {
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

.chat-to-llm-chat-input-box {
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.chat-to-llm-button {
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.chat-to-llm-button:hover {
  background-color: #0056b3;
}

.chat-to-llm-button:active {
  background-color: #00438a;
}

.chat-to-llm-chat-box {
  display: flex; /* 使用 Flex 布局 */
  justify-content: space-between; /* 在容器内平均分布子元素，第一个元素在最左边，第二个元素在最右边 */
  align-items: center; /* 垂直居中对齐 */
  width: 260px;
  height: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
}

.chat-delete-icon {
  cursor: pointer;
  margin-left: auto; /* 将删除图标推到右侧 */
}
.chat-edit-icon {
  cursor: pointer;
  margin-right: 5px; /* 将删除图标推到右侧 */

}
.chat-delete-icon i {
  color: red; /* 假设删除图标为红色 */
}

.chat-info {
  flex: 1; /* 让聊天信息占据剩余空间 */
  cursor: pointer;
}
</style>
