import { createStore } from 'vuex'

export const store = createStore({
    state () {
      return {
        loggedIn: false,
        randomGalleryState: false,
        userData: {},
        gallery: {}
      }
    }
  })