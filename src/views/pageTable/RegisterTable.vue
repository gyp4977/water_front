<template>
    <div>
        <div class="login-background">
            <div class="login-container">
                <div class="login-title">注&nbsp;&nbsp;册</div>
                <div class="login-form">
                    <div class="form-group">
                        <div class="register-label">
                            用户名
                        </div>
                        <el-input v-model="username" maxlength="100" placeholder="请输入用户名"></el-input>
                    </div>
                    <div style="height: 10px"></div>
                    <div class="form-group" style="margin-top: -7px;">
                        <div class="register-label">
                            密码
                        </div>
                        <el-input placeholder="请输入密码" maxlength="100" v-model="password" show-password></el-input>
                    </div>
                    <div class="form-group">
                        <div class="register-label">
                            确认密码
                        </div>
                        <el-input placeholder="请再次输入密码" maxlength="100" v-model="password2" show-password></el-input>
                    </div>
                </div>
                <div style="width: 250px; margin: 20px auto">
                    <el-button class="login-button" type="primary" @click="handleReg()">注册</el-button>
                    <el-button class="login-button" type="primary" @click="goLoginTable()">返回</el-button>
                </div>

            </div>
        </div>
    </div>
</template>
<style>
.register-label {
    flex: 0 0 auto;
    margin-right: 10px;
    font-weight: bold;
    color: #333;
    width: 75px;
    text-align: justify;
    text-align-last: justify;
}
</style>

<script>
import axios from 'axios';
export default {
    name: 'RegisterTable',
    data() {
        return {
            username: '',
            password: '',
            password2: '',
        }
    },
    methods: {
        handleReg() {
            if (this.password != this.password2) {
                this.$message.error('两次输入的密码不一致');
                return;
            }
            if(this.password == ''){
                this.$message.error('密码不能为空');
                return;
            }
            if(this.username == ''){
                this.$message.error('用户名不能为空');
                return;
            }
            const { username, password } = this;
            if (username && password) {
                axios.post('/api/registerUser', { username: username, password: password }).then(response => {
                    var isok = response.data.isok;
                    if (isok == true) {
                        this.$message({
                            message: "注册成功",
                            type: "success",
                        });
                        this.$router.push('/');
                    } else {
                        this.$message({
                            message: "该用户名已经被使用过",
                            type: "error",
                        });
                    }
                }).catch(error => {
                    console.error('Error fetching data:', error);
                    alert("注册error");
                });
            } else {
                this.$message({
                    message: "用户名或密码不能为空",
                    type: "error",
                });
            }
        },
        goLoginTable() {
            this.$router.push({
                name: "/loginTable",
            });
        }
    },
    mounted() {
        this.username = '',
            this.password = ''
    }
}
</script>