<template>
  <div class="booth-card rounded" :style="`box-shadow: 0px 0px 30px ${booth.sponsor.orgColor}66`">
    <section class="rounded hovering" :style="`background-color: ${booth.sponsor.orgColor}`">
      <img :src="booth.imgUrl" class="rounded" :alt="booth.name">
      <div class="sponsor-divider rounded-bottom"></div>
      <div class="description rounded p-1 text-white d-flex flex-column justify-content-between">
        <div class="p-1">{{ booth.description }}</div>
        <div class="d-flex justify-content-between"><span>sponsored by</span> <span class="fw-bold"><i
              class="mdi mdi-account"></i><router-link
              :to="{ name: 'Sponsor Details', params: { sponsorId: booth.sponsorId } }">{{ booth.sponsor.orgName
              }}</router-link></span>
        </div>
      </div>
    </section>
    <div class="fw-bold py-1 px-2 d-flex justify-content-between">
      <span>
        {{ booth.name }}
      </span>
      <span class="text-end w-25">
        <i v-if="booth.keynote" class="mdi mdi-account-key text-secondary lighten-20" title="keynote"></i>
        <i v-if="booth.productsForSale" class="mdi mdi-shopping text-success lighten-20" title="shop"></i>
        <i v-if="booth.appointmentRequired" class="mdi mdi-clipboard text-warning lighten-20"
          title="appointment needed"></i>
      </span>
    </div>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue'; true
const props = defineProps({ booth: { type: Object, required: true } })


</script>


<style lang="scss" scoped>
.booth-card {
  background-color: rgb(2, 0, 5);

  img {
    height: 225px;
    width: 100%;
    object-fit: cover;
    object-position: center;
    padding: 0;
  }

  .sponsor-divider {
    height: 5px;
  }
}

.hovering {
  position: relative;

  .description {
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.582);
    backdrop-filter: blur(10px);
  }

  &:hover .description {
    opacity: 1;
    transition: all .2s ease;
  }
}
</style>
