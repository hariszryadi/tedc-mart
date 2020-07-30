<template>
    <div>
        <v-subheader>Edit Profile</v-subheader>
        <div>
            <v-card flat>
                <v-container>
                    <!-- form -->
                    <v-form ref="form" lazy-validation>
                        <v-text-field label="Name" v-model="name" required append-icon="person"></v-text-field>
                        <v-text-field label="Email" v-model="email" required append-icon="email"></v-text-field>
                        <v-textarea label="Address" v-model="address" required auto-grow rows="3"></v-textarea>
                        <v-select v-model="province_id" :items="provinces" item-text="province" item-value="id" label="Province" persistent-hint single-line></v-select>
                        <v-select v-model="city_id" v-if="province_id>0" :items="citiesByProvince" item-text="city" item-value="id" label="City" persistent-hint single-line></v-select>
                        <v-text-field label="Phone" v-model="phone" required append-icon="phone"></v-text-field>
                    </v-form>
                    <v-card-actions>
                        <v-btn color="success" dark @click="updateProfile">
                            <v-icon>save</v-icon> &nbsp; Update
                        </v-btn>
                    </v-card-actions>
                </v-container>
            </v-card>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data() {
            return {
                name: '',
                email: '',
                address: '',
                province_id: 0,
                city_id: 0,
                phone: ''
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                provinces: 'region/provinces',
                cities: 'region/cities'
            }),
            citiesByProvince() {
                let province_id = this.province_id
                return this.cities.filter(function (city) {
                    if (city.province_id==province_id) {
                        return city
                    }
                })
            }
        },
        methods: {
            ...mapActions({
                setAlert: 'alert/set',
                setAuth: 'auth/set',
                setProvinces: 'region/setProvinces',
                setCities: 'region/setCities',
            }),
            updateProfile() {
                let formData = new FormData()
                formData.set('name', this.name)
                formData.set('email', this.email)
                formData.set('address', this.address)
                formData.set('phone', this.phone)
                formData.set('province_id', this.province_id)
                formData.set('city_id', this.city_id)
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.user.api_token
                    }
                }
                this.axios.post('/update-profile', formData, config)
                    .then((response) => {
                        this.setAuth(response.data.data)
                        this.setAlert({
                            status: true,
                            text: response.data.message,
                            type: 'warning'
                        })
                        this.$router.push('/profile')
                    })
                    .catch((error) => {
                        let responses = error.response
                        this.setAlert({
                            status: true,
                            text: responses.data.message,
                            type: 'error'
                        })
                    })
            },
        },
        created() {
            this.name = this.user.name
            this.email = this.user.email
            this.address = this.user.address
            this.phone = this.user.phone
            this.province_id = this.user.province_id
            this.city_id = this.user.city_id
            if (this.provinces && this.provinces.length==0) {
                this.axios.get('/provinces')
                    .then((response) => {
                        this.setProvinces(response.data.data)
                    })
                this.axios.get('/cities')
                    .then((response) => {
                        this.setCities(response.data.data)
                    })
            }
        }
    }
</script>