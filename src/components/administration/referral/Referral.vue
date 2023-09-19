<template>
<div class="common-bg">
    <a-row>
        <a-col :span="12">
            <h2 class="pageTittle">
                Referrals
            </h2>
        </a-col>
        <div class="commonTags">
            <a-tag v-if="route.query.filter" closable @close="remove('filter')">{{referral.length > 0 ? getName(route.query.filter) :route.query.filter}}</a-tag>
            <a-tag v-if="route.query.toDate && route.query.fromDate" closable @close="remove('date')">
                {{timeStampFormate(route.query.fromDate,globalDateFormat) }} To {{timeStampFormate(route.query.toDate,globalDateFormat)}}
            </a-tag>
        </div>
    </a-row>
    <a-row>
        <a-col :span="12" v-if="arrayToObjact(screensPermissions,409)">
            <SearchField endPoint="referral" />
        </a-col>
        <a-col :span="12" v-if="arrayToObjact(screensPermissions,406)">
            <div class="text-right mb-24">
                <ExportToExcel @click="exportExcel('referral_report','?fromDate=&toDate='+search)" />
            </div>
        </a-col>
        <a-col :span="24">
            <ReferralTable />
        </a-col>
    </a-row>
</div>
</template>
<script>
import ReferralTable from "@/components/administration/referral/table/ReferralTable";
import { onUnmounted, onMounted} from "vue";
import SearchField from "@/components/common/input/SearchField";
import { arrayToObjact,exportExcel ,timeStampFormate,globalDateFormat} from "@/commonMethods/commonMethod";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
import {
    useStore
} from "vuex"
import { useRoute, useRouter } from 'vue-router';
export default {
    components: {
        ReferralTable,
        SearchField,
        ExportToExcel,
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        onMounted(() => {
            if (route.query.filter || route.query.fromDate) {
                let filter = route.query.filter ? route.query.filter : ''
                let date = route.query.fromDate && route.query.toDate ? "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "&fromDate=&toDate="
                store.dispatch("referral", "?filter=" + filter + date)

            } else {
                store.dispatch("referral")
            }
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            store.commit("referralColumns")
        })
        onUnmounted(() => {
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            store.commit("filter", '')
            store.commit("dateFilter", '')
        })
        const referral = store.getters.referral
        function getName(name) {
            let idToName = referral.value.find(data=>data.referralId==name)
            return idToName ? idToName.name : ''
        }
        function remove(event) {
            if (event == "filter") {
                let from = route.query.fromDate
                if (route.query.fromDate && route.query.toDate) {
                    store.dispatch("referral", "?fromDate=" + from + "&toDate=" + route.query.toDate)
                    setTimeout(() => {
                        router.replace({
                            query: {
                                fromDate: from,
                                toDate: route.query.toDate,
                            }
                        })
                    }, 1000)
                } else {
                    router.replace({
                        query: {}
                    })
                    store.dispatch("referral")
                }
            } else {
                if (route.query.filter) {
                    router.replace({
                        query: {
                            filter: route.query.filter
                        }
                    })
                    store.dispatch("referral", "?filter=" + route.query.filter)
                } else {
                    router.replace({
                        query: {}
                    })
                    store.dispatch("referral")
                }
            }

        }
        return {
            remove,
            exportExcel,
            screensPermissions: store.getters.screensPermissions,
            arrayToObjact,
            search: store.getters.searchTable,
            timeStampFormate,
            globalDateFormat,
            route,
            getName,
            referral,
        };
    },
};
</script>