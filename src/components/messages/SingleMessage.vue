<template>    
        <div class="list-group mt-1 mb-3 messages-list p-3">
            <div v-for="message in messages" :key="message.id">
                <div class="media">
                    <img :src="message.user.avatar" class="rounded-circle align-self-start mr-3">
                    <div class="media-body">
                        <h6 class="mt-0">
                            <a href="#">{{message.user.name}}</a> - {{message.timestamp}}
                        </h6>
                        <p>{{message.content}}</p>
                    </div>
                </div>
            </div>
        </div>    
</template>

<script>
    export default {
        name: 'single-message',
        props: {
            messages: {
                type: Array,
                required: true,
            },
        }
    }
</script>
<style>
.messages-list {        
    height: 91vh;
    border-radius: 0.5%;
}
</style>