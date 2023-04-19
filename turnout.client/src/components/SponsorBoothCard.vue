<template>
  <div class="sponsor-booth-card rounded border border-secondary overflow-hidden">
    <img class="booth-img" :src="sponsorBooth.imgUrl" alt="">
    <div class="booth-description row text-center bg-dark p-2">
      <div class="col-12">
        {{ sponsorBooth.name }}<span class="fw-bold text-primary lighten-20">@</span>{{ sponsorBooth.convention.name }}
      </div>
      <div class="col-12 ps-2">
        <i v-if="sponsorBooth.keynote" class="mdi mdi-account-key text-secondary lighten-20" title="keynote"></i>
        <i v-if="sponsorBooth.productsForSale" class="mdi mdi-shopping text-success lighten-20" title="shop"></i>
        <i v-if="sponsorBooth.appointmentRequired" class="mdi mdi-clipboard text-warning lighten-20"
          title="appointment needed"></i>
      </div>
    </div>
    <div v-if="account.id == sponsorBooth.sponsorId" class="delete-btn ">
      <button @click="deleteBooth" class="btn btn-danger" title="delete booth"><i
          class="mdi mdi-delete-forever"></i></button>
    </div>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { boothsService } from '../services/BoothsService.js';
const props = defineProps({ sponsorBooth: { type: Object, required: true } })
const account = computed(() => AppState.account)
async function deleteBooth() {
  try {
    if (await Pop.confirm()) {
      await boothsService.deleteBooth(props.sponsorBooth.id)
    }
  } catch (error) {
    Pop.error(error, 'deleting booth')
  }
}
</script>


<style lang="scss" scoped>
.sponsor-booth-card {
  position: relative;

  img {
    height: 200px;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  .booth-description {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .delete-btn {
    position: absolute;
    top: 2px;
    right: 2px;
  }
}
</style>
