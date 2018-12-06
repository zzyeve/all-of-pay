<template src="./index.html"></template>
<script>
import './index.less';
// import QRCode from 'qrcodejs2';
export default {
    data() {
        return {
            dataList: [],
            selectList: [],
            apiUid: '',
            selectObj: {
                packageId: '',
                packageInherentRate: '',
                packageLevel: '',
                packageName: '',
                packagePrice: ''
            }
        };
    },
    created() {
        this.apiUid = this.$store.getters.apiUid;
        this.getData();
    },
    methods: {
        getData() {
            let params = {
                apiUid: this.apiUid
            };
            this.$api.getPackageInfo(params).then(res => {
                console.log(res);
                this.selectList = res.packageInfoList;
            });
        }
    }
};
</script>
