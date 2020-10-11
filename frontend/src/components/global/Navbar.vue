<template>
<div>

    <v-navigation-drawer dark class="blue-grey darken-3" clipped v-model="drawer" app>
        <template v-slot:prepend>
            <v-list-item two-line>
                <v-list-item-avatar>
                    <img :src="require('@/assets/users.png')">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{email}}</v-list-item-title>
                    <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item v-for="link in links" :key="link.text" link :to="link.route">
                <v-list-item-icon>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ link.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>

    <v-app-bar color="orange" dark fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>TygerCaddy Vue Frontend</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark tile text class="orange" @click="logout">
            <v-icon>mdi-lock</v-icon>
            <div class="d-none d-lg-block">logout</div>
        </v-btn>
    </v-app-bar>
</div>
</template>

<script>
export default {
    data: () => ({
        drawer: true,
        links: [{
                route: "/",
                text: "Home",
                icon: "mdi-home"
            },
            {
                route: "apps",
                text: "Applications",
                icon: "mdi-apps"
            },
            {
                route: "addresses",
                text: "Addresses",
                icon: "mdi-domain"
            },
            {
                route: "backup",
                text: "Export Config",
                icon: "mdi-application-export"
            },
            {
                route: "restart",
                text: "Restart Proxy",
                icon: "mdi-timelapse"
            }
        ]
    }),
    computed: {
        email() {
            return localStorage.getItem('email')
        }
    },
    created() {

    },
    methods: {
        logout() {

            this.$store.dispatch('logout')
            this.$router.push('Login')
        },

    }
};
</script>
