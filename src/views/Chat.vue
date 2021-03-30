<template>
  <div>
    <div class="container-fluid">        
      <div class="row">
        <div class="col-5 col-md-3 sidebar">
         <side-bar> </side-bar>
        </div>
        <div class="col-7 col-md-9 content">
          content goes here
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
export default {
  name: "chat",
  components: { SideBar}
  
};
</script>

<style scoped>
.sidebar {
  width: 33.5vw;
  height: 100vh;
  background-color: #000;
}
hr {
  border: 1px solid whitesmoke;
}
img {
  max-width: 32px;  
}
#logout {
  margin-top: 2em;
}
</style>
