new Vue({
    el: '#vue-app',
    data: {
        health:100,
        ended:false,
    },
    methods:{
        punch:function(){

            this.health -= 10;
            console.log(this.health);
            if(this.health <= 0){
                this.ended = true;

        }
        },
        restart:function(){
            this.ended = false;
            this.health = 100;
            console.log(this.health);
            
        }
    },
    computed:{

    }
})