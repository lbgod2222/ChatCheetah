<template>
  <div class="container">
    <div class="msg_contain">
      <!-- <p v-for=""></p> -->
      <a @click.prevent="join()" class="tem">加入1号房间</a>
      <a @click.prevent="quit()" class="tem">退出登录</a>
      <p v-for="item in this.msgReceived"><span>{{item.name}}&nbsp;说:&nbsp;</span>{{item.msg}}</p>
    </div> 
    <div class="msg_send">
      <input type="text" @keyup.enter="send()" class="msg_input" v-model="msg" placeholder="Say something">
      <button class="msg_emit" @click="send()">发送</button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io.connect('192.168.2.209:3000')
export default {
  name: 'Chat',
  data () {
    return {
      msg: '',
      msgReceived: []
    }
  },
  mounted () {
    // 挂载持久性的链接
    localStorage.pub_msg = ''
    // 登录广播
    socket.emit('online', localStorage.name)
    console.log('刚刚发送emit事件')
    // 接受登陆消息
    socket.on('online', (name) => {
      console.log('刚刚接收emit事件')
      alert(name + '进入了聊天室')
    })
    // 接受大厅消息
    socket.on('Pubmsg_serve', (res) => {
      console.log('接收到大厅信息', res)
      if (localStorage.pub_msg) {
        // let msgNow = Object.entries(res)
        // console.log(msgNow)
        // msgList.push.apply(msgList, msgNow)
        // let c = msgList + ',' + res
        this.msgReceived.push(res)
        console.log(this.msgReceived)
        let msgList = JSON.stringify(this.msgReceived)
        localStorage.pub_msg = msgList
      } else {
        // let msgList = []
        // let msgNow = res
        // console.log(msgNow)
        // msgList.push.apply(msgList, msgNow)
        // let c = msgList.concat(msgNow)
        // console.log(msgNow)
        this.msgReceived.push(res)
        console.log(this.msgReceived)
        localStorage.pub_msg = JSON.stringify(this.msgReceived)
      }
    })
  },
  methods: {
    join () {
      socket.emit('join', 1)
    },
    send () {
      socket.emit('Pubmsg_client', {name: localStorage.name, msg: this.msg})
      this.msgReceived.push({name: localStorage.name, msg: this.msg})
      this.msg = ''
    },
    quit () {
      let that = this
      socket.emit('quit_log')
      console.log('成功退出')
      that.$router.push('login')
      localStorage.clear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000;
}
.msg_contain{
  width: 100%;
  height: 90%;
  overflow: auto;
}
.msg_send{
  position: fixed;
  width: 100%;
  bottom: 5px;;
}
.msg_input{
  display: inline-block;
  width: 70%;
   color: #CDB79E;
    display: inline-block;
    background-color: #000;
    font-size: 20px;
    height: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: medium;
}
.msg_emit{
  display: inline-block;
  width: 25%;
  height: 30px;
  color: #CDB79E;
  background-color: #000;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #CDB79E;
}
.tem{
  display: inline-block;
  height: 40px;
  width: 70px;
  border: 1px solid whitesmoke;
  color: darkgoldenrod;
  font-size: 14px;
  cursor: pointer;
}
.msg_contain p{
  display: block;
  text-align: left;
  font-size: 16px;
  color: #CDB79E;
  margin-top: 15px;
}
</style>
