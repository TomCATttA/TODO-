<script setup>
import { ref } from 'vue'
const input = ref('')
</script>

<template>
  <div class="nav">
    <div class="nav-top">
      <ul>
        <li>
          <div class="img"> 
          </div>
          <div class="useinfo">
            <p class="usename">aizhu</p>
            <p class="email">1688888888@qq.com</p>
          </div>
        </li>
        <li>
          <el-input
      v-model="input"
      style="width: 190px"
      placeholder="搜索..."
    >
      <template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
    </el-input>
        </li>
        <li><i class="iconfont icon-taiyang"></i>我的一天</li>
        <li><i class="iconfont icon-shoucang"></i>重要</li>
        <li><i class="iconfont icon-jihua"></i>计划内</li>
        <li><i class="iconfont icon-yifenpei"></i>已分配给我</li>
        <li><i class="iconfont icon-home"></i>任务</li>
      </ul>
    </div>
    <div class="nav-bottom">
      <button class="btn1"><i class="iconfont icon-jiahao"></i><span>新建列表</span></button>
      <button class="btn2"><i class="iconfont icon-zubie"></i></button>
    </div>
  </div>
</template>


<style scoped lang="scss">
  .nav{
    width: 210px;
    height: 100%;
    background: rgba(240, 239, 239, 0.815);
    box-shadow: 5px 0 5px -2px #e3e3e3;
    border-radius: 10px;
    position: relative;
    .nav-bottom{
       position: absolute;
       bottom: 0;
       display: flex;
       .btn1{
        border: 0;
        width: 170px;
        height: 40px;
        display: flex;
        align-items: center;
        transition: 0.3s;
       i.iconfont {
  margin-right: 30px; 
  margin-left: 10px;
        }
        &:hover{
          background: #e3e3e3;
          cursor: pointer;
        }
       }
       .btn2{
        width: 40px;
        height: 40px;
        border: 0;
         &:hover{
          background: #e3e3e3;
          cursor: pointer;
        }
       }
       span{
        color: black;

       }
    }
    .nav-top{
      border-bottom:2px solid #e9e6e6
    }
     ul{
        margin: 0;  
        padding: 0; 
        list-style: none; 
        li:nth-child(1){
          height: 70px;
          display: flex;
          padding: 15px 10px 10px 10px;
        }
        li:nth-child(n+3):nth-child(-n+7) {
          line-height: 45px;
          transition: 0.3s linear;
          cursor: pointer;
          &:hover{
            background: #e3e3e3;
          }
        }
        li{
          height: 45px;
          padding-left:10px;
          font-size: 15px;
          .iconfont{
            padding-right:10px;
            font-size:18px
          }
          .img{
            border-radius: 50%;
            background: rgb(0, 255, 242);
            width: 60px;
            height: 60px;
          }
          .useinfo{
            width: 125px;
            height: 70px;
            padding-top: 10px;
            margin-left: 5px;
            .usename{
              color: black;
              margin: 0;
            }
            .email{
              color: #7f7f7f;
              white-space: nowrap;
              font-size: 13px;
              margin: 0;
              overflow: hidden;      
              text-overflow: ellipsis; 
            }
          }
        }
      }

  }
</style>