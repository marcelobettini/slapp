<template>
  <div>
    <button
      class="btn btn-outline-primary"
      data-toggle="modal"
      data-target="#channelModal"
    >
      Add Channel
    </button>
    <!-- show list of channels -->
    <div class="list-group mt-5">
      <!-- :class declaration sets active Bootstrap class if condition true -->
      <button
        v-for="channel in channels"
        :key="channel.id"
        class="list-group-item list-group-item-action"
        type="button"
        :class="{ active: setActiveChannel(channel) }"
        @click="changeChannel(channel)"
      >
        {{ channel.name }}
      </button>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="channelModal"
      tabindex="-1"
      aria-labelledby="channelModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="channelModal">Create a channel</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <input type="text" class="form-control" v-model="new_channel" id="new_Channel" name="new_Channel" placeholder="Input channel name"/>
              </div>
              <!-- errors -->
              <ul class="list-group" v-if="hasErrors">
                <li
                  class="list-group-item text-danger"
                  v-for="error in errors"
                  :key="error"
                >
                  {{ error }}
                </li>
              </ul>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              @click="addChannel"
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
            >
              Add Channel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/database";
export default {
  name: "channels",
  mounted() {
    console.log('mounted')
    this.addListeners();
  },
  unmounted() {
    console.log('unmounted')
    this.detachListeners();
  },
  data() {
    return {
      new_channel: "",
      errors: [],
      channelsRef: firebase.database().ref("channel"),
      channels: [],
    };
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    },
    ...mapGetters(["currentChannel"]),
  },
  methods: {
    addChannel() {
      this.errors = [];
      //get key to newly created channel
      let key = this.channelsRef.push().key;
      //we need al least id and name to create a new channel
      let newChannel = { id: key, name: this.new_channel };
      //create new channel in Firebase DB
      this.channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
          this.new_channel = null; //reset input field
        })
        .catch((err) => {
          this.errors = [];
          this.errors.push(err.code);
        });
    },
    addListeners() {
      this.channelsRef.on("child_added", (snapshot) => {        
        this.channels.push(snapshot.val());
        console.log(snapshot.val())
        //set current channel
        if (this.channels.length > 0) {
          //set first one as current channel
          this.channel = this.channels[0];
          //dispatch current channel to store
          this.$store.dispatch("setCurrentChannel", this.channel);
        }
      });
      /*(Firebase doc): The child_added event is typicallly used when retrieving a list of items from the database. Unlike value
       which returns the entire contents of the location, child_added is triggered once for each existing child
       and then again every time a new child is added to the specified path. The event callback is passed a snapshot
       containing the new shild's data.*/
    },
    detachListeners() {
      this.channelsRef.off();
    },
    changeChannel(channel) {
      this.$store.dispatch("setCurrentChannel", channel);
    },
      setActiveChannel(channel) {
        return channel.id === this.currentChannel.id;
      },
  },
};
</script>

<style scoped></style>
