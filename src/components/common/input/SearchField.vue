<template>
    <a-select
    v-if="mode"
    :getPopupContainer="triggerNode => triggerNode.parentNode"
    v-model:value="value"
    :mode="mode"
    style="width: 100%"
    placeholder="Search..."
    @change="handle" 
    size="large" >
        <template #suffixIcon><smile-outlined /></template>
    </a-select>
    <a-input-search v-else v-model:value="value" :placeholder="palcholder?palcholder:'Search...'" style="width: 100%"  @input="handleChange" size="large" />
</template>

<script>
import {
    defineComponent,
    ref,
} from 'vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex"
export default defineComponent({
    props: {
        endPoint: {
            required: true,
            type: String
        },
        commit:String,
        palcholder:String,
        otherParam:String,
        mode:String,
        loader:String,
       
    },
    components:{
        SmileOutlined
    },
    setup(props) {
        const store = useStore()
       
        let timeout = ''
        let endPoints= ref(props.endPoint)
        const search = ref(null)
        const route = useRoute()

        const handleChange = value => {
            
           
                if (timeout && value.target.value != '') {
                    clearTimeout(timeout);
                    timeout = null;
                }
                search.value = value.target.value;
                fake()            
                timeout = setTimeout(fake, 600);
            
        }

        function fake() {
            let ordring = store.getters.orderTable.value 
            let filter= route.query.filter ? '&filter='+route.query.filter : '&filter='
            let date = store.getters.otherFilters.value ? store.getters.otherFilters.value :  route.query.fromDate && route.query.toDate ? "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "&fromDate=&toDate=" 
            store.dispatch("searchTableData", {
                data:search.value,
                endPoint:endPoints.value,
                field:props.otherParam?props.otherParam+ordring.data:''+ordring.data,
                filter:filter+date,
                commit:props.commit,
                loader:props.loader
                
            })
            store.dispatch("searchTable",'&search='+search.value)
        }
        const handle= value => {
            search.value = value
            fake()
        }
        return {
            value: ref(undefined),
            handleChange,
            handle
        };
    },

});
</script>
