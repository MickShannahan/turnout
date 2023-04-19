<template>
  <form @submit.prevent="createBooth" class="row ">
    <div class="col-12">
      <h3>Book a booth for {{ account.orgName }}</h3>
      <h5 class="text-light">{{ convention.boothSpots - convention.boothCount }} spots still open</h5>
    </div>
    <div class="col-6 mb-3">
      <label for="" class="form-label">Name</label>
      <input type="text" class="form-control" v-model="editable.name" required maxlength="25" aria-describedby="helpId"
        placeholder="enter a name">
    </div>
    <div class="col-6 mb-3">
      <label for="" class="form-label">Image</label>
      <input type="url" class="form-control" v-model="editable.imgUrl" required maxlength="200" aria-describedby="helpId"
        placeholder="enter an image url">
    </div>
    <div class="col-12 mb-3">
      <label for="" class="form-label">Description</label>
      <textarea type="text" class="form-control" v-model="editable.description" required maxlength="255"
        aria-describedby="helpId" placeholder="whats going on at your booth"></textarea>
    </div>
    <div class="col-12 mb-3">
      <div>Will there be...</div>
      <div class="row">
        <div class="col-4">
          <label for="" class="form-label me-1">A Keynote</label>
          <input type="checkbox" v-model="editable.keynote" aria-describedby="helpId">
        </div>
        <div class="col-4">
          <label for="" class="form-label me-1">Items for Sale</label>
          <input type="checkbox" v-model="editable.productsForSale" aria-describedby="helpId">
        </div>
        <div class="col-4">
          <label for="" class="form-label me-1">Appointments required for entry</label>
          <input type="checkbox" v-model="editable.appointmentRequired" aria-describedby="helpId">
        </div>
      </div>
    </div>
    <div class="text-end">
      <button class="btn btn-primary px-4"> Book now</button>
    </div>
  </form>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { boothsService } from '../services/BoothsService.js';
import { useRoute } from 'vue-router';
const editable = ref({})
const route = useRoute()
const convention = computed(() => AppState.activeConvention)
const account = computed(() => AppState.account)
watchEffect(() => {
  const boothData = editable.value
  boothData.imgUrl = account.value.orgUrl
  boothData.name = account.value.orgName + "'s booth."
})
async function createBooth() {
  try {
    const boothData = editable.value
    boothData.keynote = boothData.keynote ? boothData.keynote : false
    boothData.productsForSale = boothData.productsForSale ? boothData.productsForSale : false
    boothData.appointmentRequired = boothData.appointmentRequired ? boothData.appointmentRequired : false
    boothData.conventionId = route.params.conventionId
    await boothsService.createBooth(boothData)
    Pop.toast('Booth Created', 'success')
    editable.value = {}
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<style lang="scss" scoped></style>
