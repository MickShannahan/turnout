<template>
  <div class="container">
    <form @submit.prevent="editAccount" class="row justify-content-center">
      <div class="col-12 col-md-6">
        <h5>Edit your sponsor profile</h5>
        <div class="mb-3">
          <label class="form-label">Sponsor Name</label>
          <input v-model="editable.orgName" type="text" class="form-control" name="" id="" aria-describedby="helpId"
            placeholder="">
        </div>
        <div class="mb-3">
          <label class="form-label">Sponsor Image</label>
          <input v-model="editable.orgUrl" type="Url" class="form-control" name="" id="" aria-describedby="helpId"
            placeholder="">
        </div>
        <div class="mb-3">
          <label class="form-label">Sponsor Color</label>
          <input v-model="editable.orgColor" type="Color" class="form-control" name="" id="" aria-describedby="helpId"
            placeholder="">
        </div>
        <button class="btn btn-success">save changes</button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop.js'
import { accountService } from '../services/AccountService.js'
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...AppState.account }
    })
    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          await accountService.updateAccount(editable.value)
        } catch (error) {
          Pop.error(error, 'edit account')
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
