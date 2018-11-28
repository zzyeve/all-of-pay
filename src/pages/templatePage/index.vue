<template src="./index.html"></template>
<script>
import './index.less';
import {feedbackList} from './../../mock/index.js';
// import QRCode from 'qrcodejs2';
export default {
    data() {
        return {
            dataList: []
        };
    },
    created() {
        this.getData();
        // this.$nextTick (function () {
        //     this.qrcode();
        // });
    },
    methods: {
        getData() {
            console.log(feedbackList);
        }
        // qrcode () {
        //     let qrcode = new QRCode('qrcode', {
        //         width: 232,
        //         height: 232,
        //         text: 'https://baidu.com'
        //     });
        //     console.log(qrcode);
        // }
    }
};
</script>
