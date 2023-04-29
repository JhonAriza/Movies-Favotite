let SearchComp = {
    template: `
        <div>
            <!-- Search form -->
            <form @submit.prevent="search" class="form-inline md-form form-sm mt-0">
                <div class="input-group md-form form-sm form-2 pl-0 w-100">
                    <div v-show="query" class="input-group-append">
                        <span class="btn btn-danger">
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                    <input class="form-control my-0 py-1 green-border" 
                        type="text" 
                        placeholder="Buscar" 
                        aria-label="Buscar"  v-model="query">
                    <div class="input-group-append">
                        <button class="input-group-text green">
                            <i class="fas fa-search text-grey"
                            aria-hidden="true">
                            </i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `,
    data () {
        return {
            query: '',
            page: 1,
        }
    },
    methods: {
        search () {
     let URL = `${BASEURL}search/company?api_key=${APIKEY}&language=es-MX&query=${this.query}`


          //  let URL = `${BASEURL}tv/popular/search/?api_key=${APIKEY}&language=es-MX&query=${this.query}`
       
            // https://api.themoviedb.org/3/search/movie?api_key=40fddecbab890365ae15a4c7872d2c00&query=luna
//        const URL = `${BASEURL}tv/popular?api_key=${APIKEY}&page=${this.page}`
   // const URL = `${BASEURL}discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=${this.page}`
 //  const URL = `${BASEURL}tv/popular?api_key=${APIKEY}&page=${this.page}`
            fetch(URL)
                .then(res => res.json())
                .then(data  => {
                    this.$emit('input', data)
                })
        },
        // setPage (page) {
        //     this.page = page
        //     this.search()
        // }, 
        // resetSearch () {
        //     this.query = ''
        //     this.page = 1
        //     this.$emit('input', {})
        // }
    },
      
}