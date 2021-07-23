<template>
  <div class="container" style="max-width: 700px">
    <nav class="navbar navbar-expand-lg" style="justify-content: space-between">
      <div class="fs-2">Posts</div>
      <div>
        <button class="btn btn-primary" @click="addingPost = true">
          Add New Post
        </button>
        <button class="btn btn-outline-primary" @click="logout">Logout</button>
      </div>
    </nav>

    <div v-show="addingPost" class="mb-5">
      <h5>Add your post</h5>
      <input
        class="mt-3"
        v-model="postTitle"
        placeholder="Post title"
        style="width: 100%"
      /><br />
      <textarea
        class="mt-3"
        v-model="postBody"
        placeholder="Post body"
        style="width: 100%"
      />
      <div class="mt-3">
        <button @click="addPost" class="btn btn-primary">Add</button>
        <button @click="addingPost = false" class="btn">Cancel</button>
      </div>
    </div>
    <template v-for="post in posts">
      <section
        :key="post.id"
        style="
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 10px;
          padding: 24px;
          margin-bottom: 16px;
        "
      >
        <header class="fs-4">{{ post.title }}</header>
        <p>{{ post.body }}</p>
        <div>{{ (post.comments || []).length }} comment(s)</div>
        <div>
          <textarea :ref="`${post.id}_newComment`" style="width: 100%" /><br />
          <button
            @click="addComment(post.id)"
            class="btn btn-outline-primary btn-sm my-2"
          >
            Add comment
          </button>
        </div>
        <div v-for="(comment, i) in post.comments" :key="i">
          <div
            class="mb-1 p-2"
            style="background: rgba(0, 0, 0, 0.05); border-left: 1px solid"
          >
            {{ comment }}
          </div>
        </div>
      </section>
    </template>
    <div v-show="!posts.length" class="text-center mt-5">
      You have not created any post
    </div>
  </div>
</template>

<script>
import { getStore } from "../store/index";
export default {
  name: "Posts",
  data() {
    return {
      postTitle: "",
      postBody: "",
      posts: [],
      addingPost: false,
      newComment: "",
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$nextTick(() => this.$router.push("/"));
    },
    addPost() {
      if ((this.postTitle || "").length && (this.postBody || "").length) {
        const _post = {
          title: this.postTitle,
          body: this.postBody,
          id: this.posts.length,
          comments: [],
        };
        this.$store.commit("setPosts", _post);
        this.$nextTick(() => {
          this.addingPost = false;
          this.posts.push(_post);
          this.postTitle = "";
          this.postBody = "";
        });
      }
    },
    getPosts() {
      this.posts = getStore().posts || [];
    },
    addComment(postId) {
      const comment = ((this.$refs[`${postId}_newComment`] || {})[0] || {})
        .value;
      if (!(comment || "").length) return;
      this.$store.commit("setComment", { postId, comment });
      this.posts.find((e) => e.id === postId).comments.push(comment);
      this.$nextTick(() => {
        this.newComment = "";
      });
    },
  },
};
</script>
