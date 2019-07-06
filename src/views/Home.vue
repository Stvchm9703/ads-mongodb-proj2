<template lang="pug">
  div.home
    img( alt="Vue logo" src="../assets/logo.png")
    HelloWorld( msg="Welcome to Your Vue.js App")
    button(@click="buttonClick") this is async
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import {mapActions} from 'vuex';
export default {
    name: 'home',
    components: {
        HelloWorld
    },
    mounted () {
        this.d();
    },
    methods: {
        SendSyncD: async function () {
            let t =0;
            return t;
        },
        buttonClick: function (e) {
            this.SendSyncD().then(res => {
                console.log(res);
                console.log('async finish');
            });
        },
        ...mapActions({
            d : 'MainMod/getMainProcess',
            e : 'MainMod/_getModelKey'
        })
    }
};
</script>
