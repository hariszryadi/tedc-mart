<template>
    <div class="about">
        <v-container>
            <v-subheader class="title">{{ product.name }}</v-subheader>
            <v-img v-if="product.cover" :src="getImage(product.cover)" height="200px"></v-img>
            <v-subheader>Information</v-subheader>
            <table class="v-data-table">
                <tbody>
                    <tr>
                        <th class="text-xs-left">Price</th><td v-if="product.price">Rp. {{ product.price.toLocaleString('id-ID') }}</td>
                    </tr>
                    <tr>
                        <th class="text-xs-left">Weight</th><td>{{ product.weight }} kg</td>
                    </tr>
                    <tr>
                        <th class="text-xs-left">Stock</th><td>{{ product.stock }}</td>
                    </tr>
                    <tr>
                        <th class="text-xs-left">Categories</th>
                        <td>
                            <template v-for="category in product.categories" v-key="category.id">
                                {{ category.name }},
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
            <v-subheader>Description</v-subheader>
            <p class="body-2">{{ product.description }}</p>
            <div style="position:relative">
                <v-btn block color="warning" @click="buy" :disabled="product.stock==0">
                    <v-icon>save_alt</v-icon> &nbsp;BUY
                </v-btn>
            </div>
        </v-container>
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
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                product: {}
            }
        },
        methods: {
            ...mapActions({
                addCart: 'cart/add',
                setAlert: 'alert/set'
            }),
            buy() {
                this.addCart(this.product)
                this.setAlert({
                    status : true,
                    text : 'Added to cart',
                    type : 'success'
                })
            }
        },
        created() {
            let slug = this.$route.params.slug
            this.axios.get('/products/slug/' + slug)
                .then((response) => {
                    let product = response.data.data
                    this.product = product
                })
                .catch((error) => {
                    let response = error.response
                    console.log(response)
                })
        }
    }
</script>