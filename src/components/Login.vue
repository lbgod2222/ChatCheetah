<template>
  <div class="background">
      <input type="text" v-model.trim="name" placeholder="您的昵称？">
      <button @click="confirm">确认</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    confirm () {
      localStorage.name = this.name
      if (this.name === '') {
        alert('你必须输入昵称')
        return
      } else {
        this.$router.push('chat')
      }
    }
  }
}
</script>

<style scoped>
.background{
    padding-top: 40%;
    position: fixed;
    width: 100%;
    min-height: 600px;
    height: 100%;
    background-color: black;
    text-align: center;
}
.background button{
    display: block;
    margin: 70px auto 0 auto;
    width: 18vw;
    height: 30px;
    background-color: #6A5ACD;
    font-size: 24px;
    line-height: 100%;
    text-align: center;
    border-radius: 12px;
    border: none;
}
.background input{
    color: #CDB79E;
    display: inline-block;
    background-color: #000;
    font-size: 20px;
    height: 30px;
    width: 80%;
    border: none;
    border-bottom: 1px solid #fff;
    outline: medium;
}
</style>


