<template>
<v-dialog v-model="show" max-width="700px">
    <v-card>
        <v-card-title class="orange" dark flat>
            <span class="headline white--text">Add Application</span>
        </v-card-title>

        <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <form name="form" @submit.prevent="handleSubmit(onSubmit)">
                <v-card-text>
                    <validation-provider v-slot="{ errors }" name="Name" rules="required">
                        <v-text-field name="appName" label="Name" color="orange" v-model="formData.appName" :error-messages="errors" required>
                        </v-text-field>
                    </validation-provider>

                    <validation-provider v-slot="{ errors }" name="ip_address" rules="ip|required">
                        <v-text-field name="ip_address" color="orange" v-model="formData.ip_address" :error-messages="errors" required label="IP Address">
                        </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="port_number" rules="port_number|required">
                        <v-text-field name="port_number" color="orange" v-model="formData.port_number" :error-messages="errors" required label="Port Number">
                        </v-text-field>
                    </validation-provider>
                    <v-switch 
                        color="orange" 
                        class="px-3" 
                        label="Skip SSL Verification on Backend?" 
                        v-model="formData.verify_ssl"               
                        hint="If your backend does not use HTTPS leave this OFF"
                        input-value="true"
                        persistent-hint>
                    </v-switch>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" @click="close">Cancel</v-btn>
                    <v-btn color="orange" dark type="submit">Save</v-btn>
                </v-card-actions>

            </form>
        </validation-observer>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                appName: "",
                ip_address: "",
                port_number: "",
                verify_ssl: false
            }
        };
    },
    props: {
        value: Boolean
    },
    model: {
        prop: "value",
        event: "showhide"
    },
    computed: {
        show: {
            get: function () {
                return this.value;
            },
            set: function (value) {
                this.$emit("showhide", value);
            }
        }
    },
    methods: {
        close() {
            //this.value = false
            this.show = false;
            this.resetForm();
        },
        onSubmit() {
            let data = {
                app: {
                    name: this.formData.appName,
                    ip_address: this.formData.ip_address,
                    port_number: this.formData.port_number,
                    verify_ssl: this.formData.verify_ssl,
                }
            };

            this.$store.dispatch("addApp", data);
            this.show = false;
            this.step = 1;
            this.resetForm();
            this.close();
        },
        resetForm() {
            this.formData = {
                name: "",
                ip_address: "",
                port_number: "",
                verify_ssl: false
            };
        },
    }
};
</script>
