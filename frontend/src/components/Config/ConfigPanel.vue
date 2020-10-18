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
                            <validation-provider v-slot="{ errors }" name="dns_provider_name" rules="required">
                                <v-text-field color="orange" name="dns_provider_name" label="DNS Provider Name" v-model="item.dns_provider_name" :error-messages="errors" required>
                                </v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="dns_api_token" rules="required">
                                <v-text-field color="orange" name="dns_api_token" label="DNS API Token" v-model="item.dns_api_token" :error-messages="errors" required>
                                </v-text-field>
                            </validation-provider>
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
export default {
    data() {
        return {};

    },
    props: {
        item: Object
    },
    components: {},
    methods: {},

};
</script>
