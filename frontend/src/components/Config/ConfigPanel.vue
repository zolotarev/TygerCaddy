<template>
<div>
    <v-layout row wrap>
        <v-flex xs12 sm12 pa-3>
            <v-card flat class="blue-grey lighten-5">
                <v-toolbar color="orange" dark flat>
                    <v-toolbar-title>System Config</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-icon large color="white">mdi-domain</v-icon>
                </v-toolbar>
                <v-card-title primary-title>
                    <v-row class="mb-6" no-gutters>
                        <v-col class="d-none d-lg-block">
                            <h2 class="blue-grey--text darken-4">Settings</h2>
                        </v-col>
                    </v-row>
                </v-card-title>
                <validation-observer ref="observer" v-slot="{ handleSubmit }">
                    <form name="form" @submit.prevent="handleSubmit(onSubmit)">
                        <v-card-text>
                            <validation-provider v-slot="{ errors }" name="server_name" rules="required">
                                <v-text-field color="orange" name="server_name" label="Server Name" v-model="item.server_name" :error-messages="errors" required>
                                </v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="automatic_https" rules="required">
                                <v-switch color="orange" class="px-3" label="Automatic HTTPS?" v-model="item.automatic_https" :error-messages="errors"></v-switch>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="redirect_https" rules="required">
                                <v-switch color="orange" class="px-3" label="Automatic HTTPS Redirect?" v-model="item.redirect_https" :error-messages="errors"></v-switch>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="use_dns_verification" rules="required">
                                <v-switch color="orange" class="px-3" label="Use DNS Verification?" v-model="item.use_dns_verification" :error-messages="errors"></v-switch>
                            </validation-provider>
                            <v-combobox v-model="item.dns_provider_name" color="orange" :items="dns" item-text="name" item-value="name" label="Select a DNS provider:"></v-combobox>
                            <v-text-field color="orange" name="dns_api_token" label="DNS API Token" v-model="item.dns_api_token">
                            </v-text-field>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="orange" dark type="submit">Save</v-btn>
                        </v-card-actions>
                    </form>
                </validation-observer>
            </v-card>
        </v-flex>
    </v-layout>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            data: {}
        };

    },
    props: {
        item: Object
    },

    components: {},
    computed: {
        ...mapGetters({
            dns: 'showDNS'
        })
    },
    methods: {
        resetForm() {
            this.data = {}
        },

        onSubmit() {
            this.data.server_name = this.item.server_name;
            this.data.automatic_https = this.item.automatic_https;
            this.data.redirect_https = this.item.redirect_https;
            this.data.use_dns_verification = this.item.use_dns_verification;
            this.data.dns_provider_name = this.item.dns_provider_name;
            this.data.dns_api_token = this.item.dns_api_token;
            this.$store.dispatch('updateConfig', this.data)
            this.resetForm();
        },
    },

};
</script>
