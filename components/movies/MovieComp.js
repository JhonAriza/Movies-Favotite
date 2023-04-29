let MovieComp = {
    template: ` <div class="card"  :class="{'movie-like': like}">
 
    <img :src="cover | coverURL" class="card-img-top">
    <div class="card-body">
    <h2 class="card-title">{{title | uppercase}}</h2>
    <p class="card-text">{{synopsis | excertp}}</p>
    <button class="btn" :class="btnStatus" @click="toggleLike">
    <span v-text="like ? 'Favorita' : 'Agregar a Favoritas'"></span>
    <i class="far fa-heart " :class="{
        'far': !like,
        'fas': like
    }"></i>
</button>
    </div>
    </div>


  
    `,
    props: {
        id: {
            type: Number,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },
        synopsis: {
            type: String,
            default: 'No posee Sinopsis'
        },
        cover: {
            type: String,
            required: true,
        },
        like: {
            type:Boolean,
            required: true,
            default (){
                return false
            }
        }
  
    },
    filters: {
        formatId(value){
            return  `movieCard-${value} `
        },
        uppercase (value){
            return value.toUpperCase()
        },
        reverse (value){
            let word = value.split('')
            return word.reverse().join('')
        },
        excertp (value){
            return value.substring(0 ,100)+'..'
        }
                },
    data () {
        return {
            className: {
                'btn-like': true,
                'btn-light': false,
                myclass: true
            },
            // user: 'Jhfthtru'
           
        }
    },
    watch : {
        like (newVal, oldVal){
            console.log(newVal,oldVal)
        }
    },
     computed: {
        btnStatus () {
            return this.like ? 'btn-like' : 'btn-ligth'
        }

        },
    methods: {
        toggleLike () {
        
            let movie = this.$parent.movies.find(m => m.id == this.id)
            movie.like = !this.like
            this.$parent.showFav = !this.like
              
      
           
         

       
        }
    },

}