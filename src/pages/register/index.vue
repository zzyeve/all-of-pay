<template src="./index.html"></template>
<script>
import './index.less';
import {feedbackList} from './../../mock/index.js';
export default {
    data() {
        return {
            dataList: [],
            checked: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            console.log(feedbackList);
        },
        goLogin() {
            window.location.href = '#/login';
        }
    }
};
</script>
