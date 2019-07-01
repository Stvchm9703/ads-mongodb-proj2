<template lang="pug">
  div.home
    img( alt="Vue logo" src="../assets/logo.png")
    HelloWorld( msg="Welcome to Your Vue.js App")

    button(@click="buttonClick") this is async
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import {mapActions} from 'vuex';
import { ipcRenderer } from 'electron';
export default {
    name: 'home',
    components: {
        HelloWorld
    },
    mounted () {
        let y = ipcRenderer.sendSync('log', 'arg');
        console.log(y);
        this.d();
        // this.e().then((f)=>{
        //     console.log(f);
        // });

    },
    methods: {
        SendSyncD: async function () {
            let t = await ipcRenderer.sendSync('log1', 'arg1');
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
