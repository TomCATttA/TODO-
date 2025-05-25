<script setup>
import scrollTitle from "./components/scrollTitle.vue";
import { ref } from "vue";
//1.表单对象
const form = ref({
  user: "",
  password: "",
});
//2.规则对象
const rules = {
  user: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 14, message: "密码长度在6-14以内", trigger: "blur" },
  ],
};
</script>

<template>
  <div class="login">
    <div class="title">
      <scrollTitle />
    </div>
    <div class="form">
      <el-form :model="form" :rules="rules">
        <el-form-item prop="user">
          <p class="user">
            <span>用户:</span>
            <el-input
              v-model="form.user"
              style="width: 240px"
              placeholder="请输入用户名"
            />
          </p>
        </el-form-item>
        <el-form-item prop="password">
          <p>
            <span>密码:</span>
            <el-input
              v-model="form.password"
              style="width: 240px"
              type="password"
              placeholder="请输入密码"
              show-password
            />
          </p>
        </el-form-item>
        <p>
          <span class="check"><input type="checkbox" />下次自动登录</span>
          <el-button color="#002FA7" class="btn">登录</el-button>
        </p>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: url("@/assets/img/bg.png");
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  .title {
    margin-top: 70px;
    margin-bottom: 10px;
    margin-left: 280px;
  }
  .form {
    margin-bottom: 60px;
    width: 700px;
    height: 450px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.286);
    box-shadow: 5px 5px 5px rgba(179, 178, 178, 0.286);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    .user {
      margin-top: 60px;
    }
    p {
      color: #002fa7;
      font-size: 20px;
      font-family: 微软雅黑;
      font-weight: bold;
      span {
        margin-right: 30px;
      }
    }
    input:not([type="checkbox"]) {
      border: none;
      outline: none;
      border-radius: 5px;
      height: 30px;
      width: 300px;
    }
    .check {
      margin-right: 30px;
      font-size: 15px;
      color: #ffffff;
      font-weight: 200;
    }
    .btn {
      width: 100px;
    }
  }
}
</style>