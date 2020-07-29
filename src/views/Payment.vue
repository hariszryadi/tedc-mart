<template>
    <div class="payment">
        <v-subheader>Payment Information</v-subheader>
        <v-card flat>
            <v-container v-if="payment">
                <v-simple-table>
                    <tr>
                        <th class="text-xs-left">Order ID</th>
                        <td>{{ payment.order_id }}</td>
                    </tr>
                    <tr>
                        <th class="text-xs-left">Invoice Number</th>
                        <td>{{ payment.invoice_number }}</td>
                    </tr>
                    <tr>
                        <th class="text-xs-left">Total Bill</th>
                        <td>Rp. {{ payment.total_price.toLocaleString('id-ID') }}</td>
                    </tr>
                </v-simple-table>
            </v-container>
        </v-card>

        <v-subheader>Transfer To</v-subheader>
        <v-card flat>
            <v-container>
                <v-simple-table>
                    <tr>
                        <td><img src="img/bca.png" width="150" height="120"></td>
                        <td>BCA KCP Cimahi Rek 123456789</td>
                    </tr>
                    <tr>
                        <td><img src="img/mandiri.png" width="150" height="120"></td>
                        <td>BANK MANDIRI KCP Cimahi Rek 987654321</td>
                    </tr>
                </v-simple-table>
            </v-container>
        </v-card>

        <!-- <v-subheader></v-subheader> -->
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12 text-center>
                        <v-btn color="success" @click="finish">
                            Finish
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<style scoped>
    .text-xs-left {
        text-align: left !important;
        padding-bottom: 20px;
        padding-right: 20px;
    }
    td {
        padding-bottom: 20px;
    }
</style>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                payment: 'payment'
            })
        },
        methods: {
            finish(){
                this.$router.push('/')
            }
        }
    }
</script>