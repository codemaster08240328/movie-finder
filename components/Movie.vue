<template>
  <v-card>
    <v-progress-circular
      v-if="!title"
      indeterminate
      color="primary"
      class="progress-bar"
    ></v-progress-circular>

    <v-card-title v-if="!!title" class="headline">
      {{ title }}
    </v-card-title>

    <v-card-text v-if="!!title">
      <img
        v-if="poster !== 'N/A'"
        class="card-img-top"
        :src="poster"
        :alt="title"
      />
      <p class="card-text">Directed by: {{ director }}</p>
      <p class="card-text">Published at: {{ year }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    imdbID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      poster: '',
      title: '',
      year: '',
      director: ''
    };
  },
  async mounted() {
    const url = `${process.env.movieGetApi}${this.imdbID}`;
    try {
      const result = await axios.get(url).then((res) => res.data);

      this.year = result.Year;
      this.director = result.Director;
      this.poster = result.Poster;
      this.title = result.Title;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style scoped>
.progress-bar {
  margin: 10px;
}
</style>
