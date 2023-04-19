<template>
  <form class="row" @submit.prevent="createConvention">
    <div class="mb-3 col-6">
      <label for="" class="form-label">Name</label>
      <input v-model="editable.name" type="text" class="form-control" name="" id="" aria-describedby="helpId"
        placeholder="">
    </div>
    <div class="mb-3 col-6">
      <label for="" class="form-label">Tags</label>
      <input v-model="editable.tags" type="text" class="form-control" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small>comma separated</small>
    </div>
    <div class="mb-3 col-12">
      <label for="" class="form-label">Description</label>
      <textarea v-model="editable.description" type="text" class="form-control" name="" id="" aria-describedby="helpId"
        placeholder=""></textarea>
    </div>
    <div class="mb-3 col-12">
      <label for="" class="form-label">Cover Image</label>
      <input v-model="editable.imgUrl" type="url" class="form-control" name="" id="" aria-describedby="helpId"
        placeholder="">
    </div>
    <div class="mb-3 col-4">
      <label for="" class="form-label">Start Date</label>
      <input v-model="editable.date" type="date" class="form-control" name="" id="" aria-describedby="helpId"
        placeholder="">
    </div>
    <div class="mb-3 col-4">
      <label for="" class="form-label">Days running {{ editable.days || 1 }}</label>
      <input v-model="editable.days" type="range" class="form-control" min="1" max="10" aria-describedby="helpId"
        placeholder="">
    </div>
    <div class="mb-3 col-4">
      <label for="" class="form-label">Booth Spaces</label>
      <input v-model="editable.boothSpots" type="number" class="form-control" min="1" max="200" aria-describedby="helpId"
        placeholder="">
    </div>
    <button class="btn btn-primary">submit</button>
  </form>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { conventionsService } from '../services/ConventionsService.js';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
const editable = ref({})
const router = useRouter()

async function createConvention() {
  try {
    const con = await conventionsService.createConvention(editable.value)
    editable.value = {}
    Modal.getOrCreateInstance('#convention-form').hide()
    router.push({ name: 'Convention Details', params: { conventionId: con.id } })
  } catch (error) {
    Pop.error(error, 'create convention')
  }
}
</script>


<style lang="scss" scoped></style>
