<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="6" sm="4" md="4">
          <v-btn v-if="showProfileCard" block dark color="orange" @click="edit()">Edit Profile</v-btn>
          <v-btn v-if="showEditProfile" block dark color="orange" @click="edit()">View Profile</v-btn>
        </v-col>
        <v-col cols="6" sm="4" md="4">
          <v-btn dark block color="orange" @click="changePassword()">Change Password</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <ProfileCard v-model="showProfileCard" />
        <EditProfileCard v-model="showEditProfile" :item="editProfile" />
      </v-row>
    </v-container>
  </div>
</template>
<script>
import EditProfileCard from "../components/default/profile/EditProfileCard";
import ProfileCard from "../components/default/profile/ProfileCard";
export default {
  components: {
    ProfileCard,
    EditProfileCard,
  },
  data() {
    return {
      showProfileCard: true,
      showEditProfile: false,
      editProfile: {},
    };
  },
  layout: "default",
  middleware: "auth",

  mounted() {
    this.showEditProfile = false;
    this.showProfileCard = true;
  },
  methods: {
    edit() {
      this.showEditProfile = !this.showEditProfile;
      this.showProfileCard = !this.showProfileCard;

      this.editProfile = Object.assign({}, this.$store.state.auth.user);
      console.log(this.$store.state.auth.user);
    },
  },
};
</script>
