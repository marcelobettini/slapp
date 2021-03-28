<template>
    <div>
<div class="container-fluid">
    <div class="row">
        <div class="col-5 col-md-3 sidebar">
            <h2 class="text-white">SLAPP!</h2>
            <hr>
            <button class="btn btn-outline-light" @click="logout">Logout</button>

        </div>
        <div class="col-7 col-md-9 content">
content goes here
        </div>
    </div>
</div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
    export default {
        name: 'chat',
        methods: {
            logout() {
                firebase.auth().signOut()
                this.$store.dispatch('setUser', null)
                this.$router.push('/')
            }
        }
    }
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

</style>