<template>
    <div>
        <v-card flat>
            <v-container>
                <v-subheader>Detail Order</v-subheader>
                <v-card flat>
                    <v-list three-line>
                        <template v-for="(item, index) in detail">
                            <v-list-item :key="index">
                                <v-list-item-avatar>
                                    <v-img :src="getImage(item.cover)"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-html="item.name"></v-list-item-title>
                                    <v-list-item-subtitle>
                                        Rp. {{ item.price.toLocaleString('id-ID') }}
                                        ({{ item.weight }} kg)
                                        <v-spacer></v-spacer>
                                        Quantity
                                        <span style="float:right">
                                            {{ item.quantity }}
                                        </span>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
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
                name: '',
                address: '',
                phone: '',
                province_id: 0,
                city_id: 0,
                courier: '',
                detail: [],
                shippingCost: 0,
                totalPrice: 0,
                dialogConfirm: false
            }
        },
         computed: {
            ...mapGetters({
                user: 'auth/user',
            }),
        },
        ...mapActions({
            setAuth: 'auth/set',
        }),
        created() {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.user.api_token
                }
            }
            let orderId = this.$route.params.orderId
            this.axios.get('/detail-order/' + orderId, config)
                .then((response) => {
                    let detail = response.data.data
                    this.detail = detail
                })
                .catch((error) => {
                    let response = error.response
                    console.log(response)
                })
        }   
    }
</script>