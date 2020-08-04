<template>
    <div>
        <v-subheader>Histori Belanja</v-subheader>
        <v-card flat>
            <v-container>
                <v-card v-for="item in items" :key="item.id" :to="'detail-order/' + item.id" style="margin-bottom:8px">
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    Invoice : {{ item.invoice_number }}
                                    <div class="success--text title">Rp. {{ item.total_price.toLocaleString('id-ID') }}</div>
                                    <small>date: {{ item.updated_at }}. courier: {{ item.courier_service }}</small>
                                </v-list-item-subtitle>
                                {{ item.status }}
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data() {
            return {
                items: []
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        },
        methods: {
            ...mapActions({
                setAlert: 'alert/set'
            })
        },
        mounted() {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.user.api_token
                }
            }
            this.axios.get('/my-order', config)
                .then((response) => {
                    let { data } = response.data
                    this.items = data
                })
                .catch((error) => {
                    let { data } = error.response
                    this.setAlert({
                        status: true,
                        text: data.message,
                        color: 'error'
                    })
                })
        }
    }
</script>