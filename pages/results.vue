<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 container>
      <v-card class="w-100">
        <v-card-title class="headline">
          Results searched by "{{ searchKeyword }}"
          <v-spacer />
          <v-btn to="/" outlined color="success">Search Again</v-btn>
        </v-card-title>
        <v-card-text class="">
          <v-row class="row movies-area">
            <v-col cols="12" class="row align-start">
              <div v-if="!!error" class="alert alert-danger col" role="alert">
                {{ error }}
              </div>
              <movie
                v-for="(id, index) in searchedMovies"
                :key="index"
                class="ma-2"
                :imdbID="id"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <infinite-loading
        :identifier="infiniteId"
        @infinite="getResults"
      ></infinite-loading>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Movie from '@/components/Movie.vue';
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';

export default {
  name: 'SearchResults',
  data() {
    return {
      infiniteId: +new Date(),
      searchedMovies: [],
      error: '',
    };
  },
  computed: {
    ...mapGetters(['searchKeyword', 'searchPage']),
  },
  async mounted() {
    const url = `${process.env.movieListApi}${this.searchKeyword}`;
    try {
      const movies = await axios(url).then((res) => res.data);

      if (!movies.Error) {
        this.searchedMovies = movies.Search.map((item) => item.imdbID);
      } else {
        this.error = movies.Error;
      }
    } catch (e) {
      console.log(e);
      this.error = e.message;
    }
  },
  components: {
    Movie,
    InfiniteLoading,
  },

  methods: {
    ...mapActions(['setSearchPage']),
    async getResults($state) {
      const url = `${process.env.movieListApi}${this.searchKeyword}&page=${
        this.searchPage + 1
      }`;
      try {
        const movies = await axios(url).then((res) => res.data);
        console.log(movies);
        if (!movies.Error) {
          this.searchedMovies = [
            ...this.searchedMovies,
            ...movies.Search.map((item) => item.imdbID),
          ];
          $state.loaded();
          this.setSearchPage(this.searchPage + 1);
        } else {
          this.error = movies.Error;
          $state.complete();
        }
      } catch (e) {
        console.log(e);
        $state.complete();
      }
    },
  },
};
</script>

<style>
.movies-area {
  justify-content: space-around;
  align-items: flex-start;
}
</style>
