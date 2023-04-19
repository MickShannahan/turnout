<template>
  <div class="container-fluid mb-4">
    <section v-if="convention" class="row justify-content-center">
      <div class="col-12 hero-img" :style="`background-image: url(${convention.imgUrl})`">
        <section class="row justify-content-center fade-bg h-100 align-items-end">
          <div class="col-12 col-md-8">
            <div class="d-flex justify-content-between fw-bold">
              <h2>{{ convention.name }}</h2>
              <div>{{ convention.date }}</div>
              <button @click="deleteConvention" class="btn btn-danger" title="delete convention"><i
                  class="mdi mdi-delete-forever"></i></button>
            </div>
            <p>{{ convention.description }}</p>
          </div>
        </section>
      </div>
      <div class="col-12 col-md-10 col-lg-8">
        <section v-if="account.sponsorName && account.sponsorImgUrl && account.sponsorColor" class="row">
          <BoothForm v-if="convention.boothSpots - convention.boothCount > 0" />
          <div v-else class="bg-primary darken-50 border border-primary">
            <div class="text-warning p-3">No more booth spaces available</div>
          </div>
        </section>
        <section class="row mt-5 g-3">
          <div class="col-6 col-md-4" v-for="b in booths">
            <BoothCard :booth="b" />
          </div>
        </section>
      </div>
    </section>

    <div v-else>loading...</div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { conventionsService } from '../services/ConventionsService.js';
import { useRoute } from 'vue-router';
import BoothForm from '../components/BoothForm.vue';
import { router } from '../router.js';
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      getConventionById();
      getConventionBooths();
    });
    async function getConventionById() {
      try {
        await conventionsService.getConventionById(route.params.conventionId);
      }
      catch (error) {
        Pop.error(error, "get convention by Id");
      }
    }
    async function getConventionBooths() {
      try {
        await conventionsService.getConventionBooths(route.params.conventionId);
      }
      catch (error) {
        Pop.error(error, "Get convention booths");
      }
    }
    return {
      account: computed(() => AppState.account),
      convention: computed(() => AppState.activeConvention),
      booths: computed(() => AppState.conventionBooths),
      async deleteConvention() {
        try {
          if (await Pop.confirm()) {
            await conventionsService.deleteConvention(route.params.conventionId)
            router.push({ name: 'Home' })
          }
        } catch (error) {
          Pop.error(error, 'delete convention')
        }
      }
    };
  },
  components: { BoothForm }
};
</script>


<style lang="scss" scoped>
.hero-img {
  min-height: 30vh;
  background-size: cover;
  background-position: center;
}

.fade-bg {
  background: linear-gradient(0deg, rgba(9, 15, 24, 1) 0%, rgba(9, 15, 24, 0) 100%);
  ;
}
</style>
