import { writable} from "svelte/store";
import createAuth0Client from "@auth0/auth0-spa-js";

function createAuthStore () {
  const { subscribe, update } = writable({
    isAuthenticated : false,
    user : null,
    loading: null,
    popupOpen: null,
    loginWithPopup: null,
    getIdTokenClaims: null,
    getTokenSilently: null,
    getTokenWithPopup: null,
    appState: null
  });
  return {
    subscribe,
    handleRedirectCallback: async (search) => {
     let newAppState;
      const auth0 = await createAuth0Client({
        domain: 'devlin.auth0.com',
        client_id: 'KfNd25r5D3bExtUdYVp32eKlusjKS3kv',
        redirect_uri: 'http://detailed-fruit.surge.sh/callback'
      });
      const query = search;
      if (query.includes("code=") && query.includes("state=")) {
        const {appState} = await auth0.handleRedirectCallback();
        newAppState = appState;
        window.history.replaceState({}, document.title, "/");
      }
      const isAuthenticated = await auth0.isAuthenticated();
      const user = await auth0.getUser();
      const getIdTokenClaims = await auth0.getIdTokenClaims();
      const getTokenSilently = await auth0.getTokenSilently();
      console.log('USER: ', user)
      console.log('TOKEN_CLAIMS: ', getIdTokenClaims)
      update( state => (state = {...state, getIdTokenClaims, getTokenSilently, isAuthenticated, user, appState: newAppState}));
    },

    loginWithRedirect: async (...p) => {
      update(state => (state = { ...state, loading: true }));
     try {
       const auth0 = await createAuth0Client({
         domain: 'devlin.auth0.com',
         client_id: 'KfNd25r5D3bExtUdYVp32eKlusjKS3kv',
         redirect_uri: 'http://detailed-fruit.surge.sh/callback'
       });
       update(state => (state = { ...state, loading: false }));
       return auth0.loginWithRedirect(...p)
     } catch (e) {
       console.log(e.message);
       alert('Something happened. Please try again.')
     }
    },

    logout: async (origin) => {
      update(state => (state = { ...state, loading: true }));
      try {
      const auth0 = await createAuth0Client({
        domain: 'devlin.auth0.com',
        client_id: 'KfNd25r5D3bExtUdYVp32eKlusjKS3kv',
        redirect_uri: 'http://detailed-fruit.surge.sh/callback'
      });
      update(state => (state = { ...state, isAuthenticated: false, loading: false }));
      await auth0.logout({
        returnTo: origin
      })
      } catch (e) {
        console.log(e.message);
        alert('Something happened. Please try again.')
      }
    }
  }
}

export const authStore = createAuthStore();
