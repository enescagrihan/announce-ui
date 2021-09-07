import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Filter from '../packages/filter'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    FullName: '',
    Content : '',
    allAnnounces: []
  },

  mutations: {
    setFullName(state, payload) {
        state.FullName = payload
    },

    setContent(state, payload) {
        state.Content = payload
    },

    setAllAnnounces(state, payload) {
        state.allAnnounces = payload;
    },

    emptyFullNameAndContent(state) {
        state.FullName = ''
        state.Content = ''
    }
  },

  actions: {
      async getAllAnnounces({state, commit }) {
      let localAnnounceArray = []
      await axios.get('https://localhost:44307/')
        .then((response) => {
            for (const item in response.data) {
                if (Object.hasOwnProperty.call(response.data, item)) {
                    localAnnounceArray.unshift(response.data[item])
                }
            }
            commit('setAllAnnounces', localAnnounceArray)
            console.log(state.allAnnounces);
        });
    },

    async insertNewAnnounce({ state, commit, dispatch }, loading) {
      loading.classList.add("is-loading")
      await axios.post('https://localhost:44307/', {FullName: Filter.clean(state.FullName), Content : Filter.clean(state.Content)})
      .then((response) => {
            console.log(response);
            commit('emptyFullNameAndContent')
            setTimeout(() => {
                loading.classList.remove("is-loading")
            }, 250);
            setTimeout(() => {
                loading.classList.add("")
            }, 3000);
        })
        .catch((err) => {
            console.log(err);
        })
        dispatch('getAllAnnounces')
    },
  },
});
