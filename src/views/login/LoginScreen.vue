<template>
  <div class="flex flex-col justify-center items-center min-h-screen px-4">
    <div class="w-full max-w-md">
      <div class="bg-white p-8 shadow-lg rounded-lg">
        <div class="text-center mb-4">
          <h1 class="text-4xl font-bold">FaceBlog</h1>
        </div>
        <div
          class="text-white text-center font-bold p-4 mb-4 rounded"
          v-if="login_show_alert"
          :class="login_alert_variant"
        >
          {{ login_alert_message }}
        </div>
        <Form @submit="login" :validation-schema="schema">
          <div class="mb-3">
            <Field
              name="username"
              class="w-full p-2 border rounded-md"
              placeholder="Username or Email"
            />
            <error-message name="username" class="text-red-600"></error-message>
          </div>
          <div class="mb-3">
            <Field
              name="password"
              type="password"
              class="w-full p-2 border rounded-md"
              placeholder="Password"
            />
            <error-message name="password" class="text-red-600"></error-message>
          </div>
          <div class="mb-3">
            <input
              class="w-full bg-green-500 text-white py-2 rounded-md cursor-pointer"
              type="submit"
              value="Log In"
              :disabled="login_in_submission"
            />
          </div>
          <p class="text-center">
            Forgot Password?
            <a href="#" class="text-blue-500">Click here</a>
          </p>
          <p class="text-center">
            Don't have an account?
            <a href="#" class="text-blue-500">Sign up</a>
          </p>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useUserStore from '@/stores/user.js'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'

const router = useRouter()
const store = useUserStore()

let login_in_submission = ref(false)
let login_show_alert = ref(false)
let login_alert_variant = ref('bg-blue-500')
let login_alert_message = ref('Your credentials are being submitted...')

const schema = {
  username: 'min:3|max:100',
  password: 'min:8|max:50',
}

const login = async (values) => {
  login_in_submission.value = true
  login_show_alert.value = true
  login_alert_variant.value = 'bg-blue-500'
  login_alert_message.value = 'Your credentials are being submitted...'

  try {
    await store.login(values)
    await router.push({name: 'home'})
  } catch (error) {
    login_in_submission.value = false
    login_alert_variant.value = 'bg-red-500'
    console.log(error)
    if(error.request.status === 401) {
      login_alert_message.value = 'The login information you entered is incorrect, please try again.'
    }
    else {
      login_alert_message.value = 'Something went wrong, try again later.'
    }
  }
}
</script>

<style scoped></style>
