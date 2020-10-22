<template>
<v-container>
    <h2 class="blue-grey--text darken-5 pa-2">System Config</h2>
    <v-layout row wrap>
        <v-flex xs12 sm12 pa-3>
            <config-panel :item="settings"></config-panel>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import ConfigPanel from "../components/Config/ConfigPanel.vue";
export default {
    data() {
        return {

        };
    },

    components: {
        ConfigPanel,
    },
    methods: {

    },
    computed: {
        ...mapGetters({
            settings: 'showConfig'
        })
    },
    mounted() {
        this.$store.dispatch('getConfig')
        this.$store.dispatch('getDnsProviders')
    }
};
</script>
