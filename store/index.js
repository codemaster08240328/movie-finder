// const API_URL =
//   'http://www.omdbapi.com/?apikey=33ef09a9&type=movie&plot=full&s=';

export const state = () => ({
  searchKeyWorkd: '',
  searchPage: 0,
});

export const actions = {
  setSearchKey({ commit }, keyword) {
    commit('SET_SEARCH_KEYWORD', keyword);
  },
  setSearchPage({ commit }, page) {
    commit('SET_SEARCH_PAGE', page);
  },

  // async search({ commit }, keyword) {
  //   const url = `${API_URL}${keyword}`;
  //   const response = await fetch(url).then((res) => {
  //     return res.json();
  //   });
  //   console.log(response);

  //   if (response.Error) {
  //     commit('SET_SEARCH_RESULTS', []);
  //     commit('SET_SEARCH_ERROR', response.Error);
  //   } else {
  //     commit(
  //       'SET_SEARCH_RESULTS',
  //       response.Search.map((item) => item.imdbID)
  //     );
  //     commit('SET_SEARCH_ERROR', '');
  //   }

  //   return response.Search;
  // },
};

export const mutations = {
  SET_SEARCH_KEYWORD(state, data) {
    state.searchKeyWorkd = data;
  },

  SET_SEARCH_PAGE(state, data) {
    state.searchPage = data;
  },
};

export const getters = {
  searchKeyword(state) {
    return state.searchKeyWorkd;
  },

  searchPage(state) {
    return state.searchPage;
  },
};
