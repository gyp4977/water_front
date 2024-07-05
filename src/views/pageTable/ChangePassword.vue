<template>
    <div>
        <div class="login-background">
            <div class="login-container">
                <div class="login-title">修改密码</div>
                <div class="login-form">
                    <div class="form-group">
                        <div class="register-label">
                            原密码
                        </div>
                        <el-input v-model="password1" maxlength="100" placeholder="请输入原密码" show-password></el-input>
                    </div>
                    <div style="height: 10px"></div>
                    <div class="form-group" style="margin-top: -7px;">
                        <div class="register-label">
                            新密码
                        </div>
                        <el-input placeholder="请输入新密码" maxlength="100" v-model="password2" show-password></el-input>
                    </div>
                    <div class="form-group">
                        <div class="register-label">
                            确认密码
                        </div>
                        <el-input placeholder="请再次输入新密码" maxlength="100" v-model="password3" show-password></el-input>
                    </div>
                </div>
                <div style="width: 250px; margin: 20px auto">
                    <el-button class="login-button" type="primary" @click="submit()">修改</el-button>
                    <el-button class="login-button" type="primary" @click="goHome()">返回</el-button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import store from '@/store/createStore';
export default {
    data() {
        return {
            password1: '',
            password2: '',
            password3: '',
            id: '',
            jwtToken: '',
        }
    },
    mounted() {

    },
    created() {
        this.jwtToken = store.state.jwtToken;
        this.id = store.state.id;
    },
    methods: {
        submit() {
            if (this.password1 == '' || this.password2 == '' || this.password3 == '') {
                this.$message.error('密码不能为空');
            } else if (this.password2 != this.password3) {
                this.$message.error('两次密码输入不一致');
            } else {
                axios.post('/api/changePassword', { id: this.id, jwtToken: this.jwtToken, password1: this.password1, password2: this.password2 }).then(response => {
                    if (response.data.isok == false) {
                        alert("后端出错");
                    } else if (response.data.passwordWrong == true) {
                        this.$message.error('密码错误');
                    } else {
                        this.$message.success('修改密码成功，请重新登录');
                        this.$router.push({
                            name: "/loginTable",
                        });
                    }
                }).catch(error => {
                    console.error('Error fetching data:', error);
                    alert("修改密码error");
                });
            }

        },
        goHome() {
            this.$router.push({
                name: "uHome",
            });
        }
    }
}
</script>