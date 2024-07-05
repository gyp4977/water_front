<template>
    <div>
        <h1>About Page</h1>
        <p>传入id: {{ this.id }}</p>
        <p>传入pageSize: {{ this.pageSize }}</p>
        <p>store中的count: {{ this.count }}</p>
        <p>?</p>
        <div>
            <TestCom></TestCom>
        </div>
        <br>
        <div>
            <TestCom2></TestCom2>
        </div>
    </div>
</template>

<script>
import store from '@/store/createStore.js'
export default {
    name: 'testTable',
    data() {
        return {
            id: '',
            pageSize: '',
            count: store.state.count,
        };
    },
    methods: {

    },
    
    created() {
        this.id = this.$route.params.id;
        this.pageSize = this.$route.params.pageSize;
    },
}
</script>
@/store/createStore.js