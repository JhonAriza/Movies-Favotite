const APIKEY = '40fddecbab890365ae15a4c7872d2c00'
const BASEURL = 'https://api.themoviedb.org/3/'
Vue.component("movie-app", {
    template: `
            <div class="container">
            <h5>Bienvenido 2{{ user.name }}  {{ user.lastname }}</h5>
            <SearchComp v-model="searchMovies"/>
            <div v-show="! Object.keys(searchMovies).length">
            <h1>Peliculas app</h1>
            <div class="row">
                <div class="col-12  col-md-4 col-lg-3 py-3" v-for="(movie, key) in movies" 
                :key="key">
                    <MovieComp 
                    :id="movie.id" 
                    :title="movie.name" 
                    :synopsis="movie.overview" 
                    :cover="movie.poster_path"
                    :like="movie.like"
                    @toggleLike="onToggleLike"
                    />
                </div>
            </div>

            <div class="row">
            <a  :href="'?page='+n" class="btn m-1" :class="{
                'btn-light': n != page,
                'btn-primary': n == page
            }" v-for="(n, index) in total_pages" :key="index">
                {{n}}
               
            </a>
        </div> 

            </div>

            <div v-show="Object.keys(searchMovies).length">
            <h1>resultados</h1>
            <div class="row">
                <div class="col-12  col-md-6 col-lg-4 py-3" v-for="(movie, key) in searchMovies.results" 
                :key="key"
                >
                    <MovieComp 
                    :id="movie.id" 
                    :title="movie.name" 
                    :synopsis="movie.overview" 
                    :cover="movie.poster_path"
                    :like="movie.like"
                    @toggleLike="onToggleLike"
                    />
                </div>
            </div>

            </div>
            <MovieFav :show.sync="showFav"/>
                </div>
        `,
    data() {
      return {
        user : {
          name : 'Jhon Alexander ',
          lastName : 'Ariza Duarte'
        },
        oldUser : null,
        
        movies: [ 
        ],
        searchMovies : {

        },
        showFav : false,
        page : 1,
        total_pages: null
      };
    },
    watch :{
        page (){
            this.getPopularMovies()
        }
    },
     
    components: {
      MovieComp,
      MovieFav,
      SearchComp
    },
    methods: {

      onToggleLike (data) {
        let movieLike = this.movies.find(movie => movie.id == data.id)
        movieLike.like = data.like
        this.showFav = data.like

      },
      getPopularMovies () {
        const URL = `${BASEURL}tv/popular?api_key=${APIKEY}&language=es-MX&page=${this.page}`
     fetch(URL)
     .then(response => response.json())
    .then(({results ,page, total_pages }) => {
        this.total_pages = total_pages
        this.movies = results.map(m => {
            m.like = false
            return m
        })
    })
    
 
    
    },
 },
 mounted(){
    let locationURL = new URL(window.location.href)
    this.page = locationURL.searchParams.get('page') || 1
    this.getPopularMovies()
 },
  });
  