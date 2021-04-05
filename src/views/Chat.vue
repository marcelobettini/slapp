<template>
  <div>
    <div class="container-fluid">        
      <div class="row">
        <div class="col-12 col-md-4 sidebar">
         <side-bar> </side-bar>
        </div>
        <div class="col-12 col-md-8 content">
          <messages></messages>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Messages from '../components/messages/Messages'
export default {
  name: "chat",
  components: { SideBar, Messages }
  
};
</script>

<style scoped>
.sidebar {  
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.877);
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
