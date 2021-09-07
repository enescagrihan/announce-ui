<template>
  <div class="announce">
    
    <!-- HEADER -->
    <header class="announce-header">
      <h1 class="title is-1">Public Announce</h1>
      <h2 class="title is-4">Announce Something</h2>
    </header>

    <!-- FORM -->
    <main>
      <form class="announce-form container">
        <div class="field column is-half">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter your name" v-model="FullName" ref="FullName" :disabled="isFormElementDisabled">
        </div>
      </div>
      <div class="field column is-6">
        <label class="label">Message</label>
        <div class="control">
          <textarea class="textarea" placeholder="Type you announce..." v-model="Content" ref="Content" :disabled="isFormElementDisabled"></textarea>
        </div>
      </div>
      </form>

      <!-- BUTTONS -->
      <div class="field is-grouped container">
        <div class="control">
          <button class="button is-link" ref="btn-announce" @click="AnnounceInsert" :disabled="(FullName  == '') || (Content == '') ? true : false">
            Announce
          </button>
        </div>
        <div class="control">
          <button class="button is-link is-light" @click="emptyFullNameAndContent">Clear</button>
        </div>
      </div>

      <!-- ANNOUNCES -->

      <div class="announce-list column is-5">
        <div class="card announce-list-item" v-for="item in allAnnounces" :key="item.id">
          <div class="card-content">
            <p class="title">
              {{ item.content}}
            </p>
            <p class="subtitle">
              <small>{{ item.date }} </small>
            </p>
            <p class="subtitle">
              {{ item.fullName }}
            </p>
          </div>
        </div>
        <!-- <div class="announce-list-item" v-for="item in allAnnounces" :key="item.id">
          <h3>{{ item.fullName }}</h3>
          <p>{{ item.content }}</p> 
        </div> -->
      </div>
    </main>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'App',
  created () {
    this.getAllAnnounces();
  },
  data () {
    return {
      isFormElementDisabled: false,
    }
  },
  computed: {
    ...mapState(['allAnnounces']),
    FullName: {
      get () {
        return this.$store.state.FullName
      },
      set (value) {
        this.setFullName(value)
      }
    },
    Content: {
      get () {
        return this.$store.state.Content
      },
      set (value) {
        this.setContent(value)
      }
    },
  },
  methods: {
    ...mapActions(['getAllAnnounces', 'insertNewAnnounce']),
    ...mapMutations(['setFullName', 'setContent', 'emptyFullNameAndContent']),
    AnnounceInsert() { 
      this.insertNewAnnounce(this.$refs["btn-announce"])
          this.isFormElementDisabled = true
        setInterval( () => {
          this.isFormElementDisabled = false
        }, 3000);
    },
    loadMoreAnnounces() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.getAllAnnounces()
        }
      }
    }
  },
};
</script>

<style lang="scss">

.announce {

  &-header {
    text-align: center;
    margin-top: 50px;
  }

  &-form {
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-list {
    margin-right: auto;
    margin-left: auto;
    margin-top: 76px;

    &-item {
      & + & {
        margin-top: 25px;
      }
    }
  }
}
</style>
