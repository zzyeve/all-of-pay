<template src="./index.html"></template>
<script>
import './index.less';
export default {
    data() {
        return {
            dataList: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            // console.log(feedbackList);
        }
    }
};
</script>
