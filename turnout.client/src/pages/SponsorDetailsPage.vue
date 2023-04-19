<template>
  <div v-if="sponsor" class="container-fluid">
    <section class="row justify-content-center">
      <div class="col-12 col-md-8">
        <img class="img-fluid sponsor-img" :src="sponsor.sponsorImgUrl" alt="">
        <h2 class="text-center border-bottom border-primary pb-2 text-white">{{ sponsor.sponsorName }}</h2>
        <section class="row g-3">
          <div class="col-12 fw-bold mb-3">
            Conventions {{ sponsor.sponsorName }} is going to
          </div>
          <div v-for="b in booths" class="col-12 col-md-3">
            <SponsorBoothCard :sponsorBooth="b" />
          </div>
        </section>
      </div>
    </section>
  </div>
  <div v-else>loading...</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { sponsorsService } from '../services/SponsorsService.js'
import SponsorBoothCard from '../components/SponsorBoothCard.vue';
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      getSponsorData();
    });
    async function getSponsorData() {
      try {
        await sponsorsService.getSponsorById(route.params.sponsorId);
        await sponsorsService.getSponsorBooths(route.params.sponsorId);
      }
      catch (error) {
        Pop.error(error, "getting sponsor data");
      }
    }
    return {
      account: computed(() => AppState.account),
      sponsor: computed(() => AppState.activeSponsor),
      booths: computed(() => AppState.sponsorBooths)
    };
  },
  components: { SponsorBoothCard }
};
</script>


<style lang="scss" scoped>
.sponsor-img {
  height: 30vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
