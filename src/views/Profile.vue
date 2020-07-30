<template>
    <div>
        <v-subheader>Your Profile</v-subheader>
        <v-card flat>
            <v-container>
                <v-simple-table>
                    <tbody>
                        <tr>
                            <th>Nama</th><td>{{ user.name }}</td>
                        </tr>
                        <tr>
                            <th>Email</th><td>{{ user.email }}</td>
                        </tr>
                        <tr>
                            <th>Alamat</th><td>{{ user.address }}</td>
                        </tr>
                        <tr>
                            <th>ID Kota</th><td>{{ user.city_id }}</td>
                        </tr>
                        <tr>
                            <th>ID Provinsi</th><td>{{ user.province_id }}</td>
                        </tr>
                        <tr>
                            <th>Telepon</th><td>{{ user.phone }}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-container>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12 text-center>
                        <v-btn color="success" @click="go()">
                            Edit Profile
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                'user': 'auth/user'
            })
        },
        methods: {
            go(){
                this.$router.push('/edit-profile')
            }
        }
    }
</script>