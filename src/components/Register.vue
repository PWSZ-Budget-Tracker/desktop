<template>
    <div class="register">
        <v-container>
            <v-row class="justify-center justify-md-center align-center">
                <v-col
                        cols="12"
                        md="6"
                >

                    <v-card
                            class="ma-2"
                            max-width="600"
                    >
                        <v-form
                                ref="form"
                                v-model="valid"
                                md="6"
                        >
                            <h1 class="pt-8">Budget Tracker</h1>
                            <h2 class="pt-2">Tworzenie konta</h2>

                            <v-text-field
                                    class="pa-5 pb-0"
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    single-line
                                    outlined
                                    required
                            ></v-text-field>

                            <v-text-field
                                    class="pa-5 pb-0 pt-0"
                                    :value="password"
                                    label="Hasło"
                                    :type="'password'"
                                    :rules="[rules.password]"
                                    @input="_=>password=_"
                                    single-line
                                    outlined
                                    required
                            ></v-text-field>

                            <v-text-field
                                    class="pa-5 pt-0"
                                    :value="passwordConfirmation"
                                    v-model="passwordConfirmation"
                                    label="Powtórz hasło"
                                    :type="'password'"
                                    :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                                    single-line
                                    outlined
                                    required
                            ></v-text-field>

                            <v-row class="pb-5 justify-center">

                                <v-btn
                                        :disabled="!valid"
                                        color=#9090ee
                                        class="mr-5 mb-6"
                                        @click="validate"
                                >
                                    Zarejestruj się
                                </v-btn>

                                <v-btn
                                        color=#3eb4a7
                                        class="mr-5 mb-6"
                                        @click="reset"
                                >
                                    Wyczyść dane
                                </v-btn>
                            </v-row>

                            <hr>

                            <v-row class="pt-7 pb-7 justify-center">
                                <p class="pr-5 pt-2">Masz konto?</p>

                                <v-btn
                                        outlined
                                        color="#3eb4a7"
                                        to="/login"
                                >
                                    Zaloguj się
                                </v-btn>

                            </v-row>

                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                password: "",
                valid: true,
                value: true,
                email: "",
                passwordConfirmation: "",
                emailRules: [
                    v => !!v || 'E-mail jest wymagany',
                    v => /.+@.+\..+/.test(v) || 'E-mail musi być prawidłowy',
                ],
                rules: {
                    required: value => !!value || "Hasło jest wymagane",
                    password: value => {
                        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
                        return (
                            pattern.test(value) ||
                            "8 znaków, co najmniej jedna wielka litera, cyfra oraz znak specjalny"
                        );
                    }
                },
                confirmPasswordRules: [
                    v => !!v || 'Potwierdzenie hasła jest wymagane',
                ]
            }
        },

        methods: {
            validate() {
                if(this.$refs.form.validate())
                {
                    this.$store.dispatch('userRegister', {
                        email: this.email,
                        password: this.password,
                        passwordConfirmation: this.passwordConfirmation
                    })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            reset() {
                this.$refs.form.reset()
            },
        },

        computed: {
            passwordConfirmationRule() {
                return () =>
                    this.password === this.passwordConfirmation || "Hasło musi być takie same";
            }
        },
    }
</script>

<style scoped>
    h1 {
        text-align: center;
    }

    h2 {
        text-align: center;
    }
</style>