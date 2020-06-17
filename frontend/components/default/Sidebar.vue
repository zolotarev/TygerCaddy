<template>
  <div>
    <v-navigation-drawer
          v-model="drawer"
          :mini-variant.sync="miniVariant"
          :src="require('~/assets/sidebar-background.jpg')"
          color="orange"
          dark
          clipped
          app
        >
          <v-list dense
          nav
              class="py-0">
              <v-list-item two-line :class="miniVariant && 'px-0'">
                <v-list-item-avatar>
                  <img :src=loggedInUser.avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ loggedInUser.firstname }} {{ loggedInUser.lastname }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <span v-for="(role,index) in loggedInUser.roles" :key="index">{{role}}, </span>
                    </v-list-item-subtitle>

                </v-list-item-content>

              </v-list-item>
              <v-divider></v-divider>
            <v-list-item link to="/dashboard">
              <v-list-item-action>
                <v-icon>mdi-home</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

      <v-list-group
        prepend-icon="mdi-apps"
        value=""
        nav
        no-action
        color="white"

      >
        <template v-slot:activator>
          <v-list-item-title>Applications</v-list-item-title>
        </template>
          <v-list-item
            link
            @click.stop="showAddApp=true"
          >
                      <v-list-item-icon>
              <v-icon>mdi-server-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add Application</v-list-item-title>

          </v-list-item>
          <v-list-item
            link
            @click.stop="showAddApp=true"
          >
                      <v-list-item-icon>
              <v-icon>mdi-server</v-icon>
            </v-list-item-icon>
            <v-list-item-title>All Applications</v-list-item-title>

          </v-list-item>
      </v-list-group>
       <v-list-group
        prepend-icon="mdi-link-box-variant-outline"
        value=""
        nav
        no-action
        color="white"

      >
        <template v-slot:activator>
          <v-list-item-title>Addresses</v-list-item-title>
        </template>
          <v-list-item link @click.stop="showAddAddress=true">
            <v-list-item-icon>
              <v-icon>mdi-earth-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add Address</v-list-item-title>
          </v-list-item>
                    <v-list-item link @click.stop="showAddAddress=true">
            <v-list-item-icon>
              <v-icon>mdi-earth</v-icon>
            </v-list-item-icon>
            <v-list-item-title>All Addresses</v-list-item-title>
          </v-list-item>
      </v-list-group>
      <v-list-group
        prepend-icon="mdi-cog"
        value=""
        nav
        no-action
        color="white"

      >
        <template v-slot:activator>
          <v-list-item-title>Config</v-list-item-title>
        </template>
          <v-list-item
            link
            to="/config"
          >
                      <v-list-item-icon>
              <v-icon>mdi-earth-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title >View/Edit Config</v-list-item-title>

          </v-list-item>

      </v-list-group>
      <v-list-group
        prepend-icon="mdi-table-settings"
        value=""
        nav
        no-action
        color="white"

      >
        <template v-slot:activator>
          <v-list-item-title>Utility</v-list-item-title>
        </template>
          <v-list-item
            link
          >
                      <v-list-item-icon>
              <v-icon>mdi-earth-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Backup & Restore</v-list-item-title>

          </v-list-item>

      </v-list-group>

    </v-list>

        </v-navigation-drawer>
  <Topbar @toggle-sidebar="miniVariant = !miniVariant"/>
  <NewAddress v-model="showAddAddress"/>
  <NewApp v-model="showAddApp"/>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import Topbar from '../../components/default/Topbar'
import NewAddress from '../../components/default/addresses/NewAddress'
import NewApp from '../../components/default/apps/NewApp'
export default {
  components:{
    Topbar,
    NewAddress,
    NewApp
  },
    name: 'Sidebar',
        data () {
      return {
        drawer: true,
        showAddAddress: false,
        showAddApp: false,
        miniVariant: false,
      }
    },
    computed: {
    ...mapGetters(['loggedInUser'])
    },
  }
</script>
