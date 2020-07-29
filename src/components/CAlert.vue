<template>
    <v-snackbar v-model="alert" :color="type" top>
        {{ text }}
        <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="close">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'c-alert',
        computed: {
            ...mapGetters({
                status: 'alert/status',
                text: 'alert/text',
                type: 'alert/type'
            }),
            alert: {
                get() {
                    return this.status
                },
                set(value) {
                    this.setAlert({
                        status : value,
                        text : 'test',
                        type : 'error'
                    })
                }
            }
        },
        methods: {
            ...mapActions({
                setAlert: 'alert/set'
            }),
            close() {
                this.setAlert({
                    status: false
                })
            }
        }
    }
</script>