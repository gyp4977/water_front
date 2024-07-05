<template>
    <div class="login-background">
        <div class="login-container">
            <div class="login-title">登&nbsp;&nbsp;录</div>
            <div class="login-form">
                <div class="form-group">
                    <div class="label">
                        用户名
                    </div>
                    <el-input v-model="username" maxlength="100" placeholder="请输入用户名" @keydown.enter="handleEnter()"></el-input>
                </div>
                <div style="height: 10px"></div>
                <div class="form-group">
                    <div class="label">
                        密码
                    </div>
                    <el-input placeholder="请输入密码" maxlength="100" v-model="password" show-password @keydown.enter="handleEnter()"></el-input>
                </div>
            </div>
            <div style="width: 250px; margin: 20px auto">
                <el-button class="login-button" type="primary" @click="handleSubmit()">登录</el-button>
                <el-button class="login-button" type="primary" @click="handleReg()">注册</el-button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginTable',
    data() {
        return {
            username: "",
            password: "",
        };
    },
    beforeMount() {
        this.$store.commit("logout");
    },
    methods: {
        handleEnter() { // 回车登陆
        this.handleSubmit();  
      },  
        handleSubmit() {
            const { username, password } = this;
            if (username && password) {
                this.$store.dispatch("login", {
                    username: username,
                    password: password,
                }).catch(() => {
                    this.$message({
                        message: "用户名或密码错误",
                        type: "error",
                    });
                });
            } else {
                this.$message({
                    message: "用户名或密码不能为空",
                    type: "error",
                });
            }
        },
        handleReg() {
            this.$router.push({
                name: "registerTable",
            });
        }
    }
}
</script>

<style>
.login-background {
    height: 100vh;
    background: url('../../assets/img/background3.jpg') no-repeat;
    background-image: url('../../assets/img/background4.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 400px;
    height: 300px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;

    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    height: auto;
    text-align: center;
}

.login-title {
    margin: 0px auto 10px auto;
    text-align: center;
    color: #505458;
    font: 30px 'Microsoft YaHei';

    margin: 0px auto 20px auto;
    color: #505458;
    font: 30px 'Microsoft YaHei';
}

.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.label {
    flex: 0 0 auto;
    margin-right: 10px;
    font-weight: bold;
    color: #333;
    width: 50px;
    text-align: justify;
    text-align-last: justify;
}

.login-button {
    width: 120px;
    background-color: rgba(0, 123, 255, 0.5);
}
</style>