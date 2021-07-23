import { getStore } from '../store/index'
export default function ({ store, route, redirect }) {
    const { loggedIn } = getStore()
    if (!loggedIn && route.path !== '/login') {
        return redirect('/login')
    }
    else if (loggedIn && route.path !== '/posts') {
        return redirect('/posts')
    }
}