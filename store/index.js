export const getStore = () => JSON.parse(localStorage.getItem('nuxt-blog') || null) || {}
const setStore = data => localStorage.setItem('nuxt-blog', JSON.stringify({ ...getStore(), ...data }))

export const state = () => ({ ...getStore() })

export const mutations = {
    login(state, payload) {
        state.loggedIn = !!payload
        setStore({ ...state })
    },
    logout(state) {
        state.loggedIn = false
        setStore({ ...state })
    },
    setUser(state, payload) {
        state.user = payload
        setStore({ ...state })
    },
    setPosts(state, payload) {
        state.posts = state.posts || []
        state.posts.push({ id: state.posts.length, ...payload })
        setStore({ ...state })
    },
    setComment(state, { postId, comment }) {
        ((state.posts.find(e => e.id === postId) || {}).comments || []).push(comment);
        setStore({ ...state })
    }
}
