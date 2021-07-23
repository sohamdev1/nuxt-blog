<template>
  <div class="container">
    <div
      class="card py-5"
      style="
        width: 300px;
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <h5 class="card-title text-center">Blog</h5>
      <div class="card-text mt-4 mx-auto">
        <div>Enter username</div>
        <input v-model="username" @keyup.enter="login" /><br />
        <button @click="login" class="btn btn-primary mt-4 mb-2">Login</button
        ><br /><span v-if="loginError" style="color: rgba(255, 80, 80, 1)"
          >Couldn't find that user</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  data() {
    return {
      loginError: false,
      username: "",
    };
  },
  methods: {
    login() {
      if (!(this.username || "").length) return;
      this.$axios
        .$get(`/users?username=${this.username}`)
        .then((r) => {
          if (r.length) {
            this.$store.commit("login", true);
            this.$store.commit("setUser", r);
            this.$router.push("/posts");
          } else {
            this.loginError = true;
          }
        })
        .catch((_) => {
          this.loginError = true;
        });
    },
  },
};
</script>
