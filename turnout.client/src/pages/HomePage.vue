<template>
  <div class="container-fluid">
    <section class="row p-3">
      <h1>THIS IS THE APP THAT JOINS PEOPLE TO PLACES</h1>
    </section>
    <section class="row justify-content-center mt-5">
      <div class="col-12 col-md-8">
        <h5>upcoming conventions</h5>
      </div>
      <div class="col-12 col-md-8">
        <section class="row">

          <div class="col-12 col-md-6 col-lg-3 mb-2" v-for="c in conventions">
            <ConventionCard :convention="c" />
          </div>

        </section>
      </div>


    </section>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { conventionsService } from '../services/ConventionsService.js'
import { onMounted } from 'vue';
import ConventionCard from '../components/ConventionCard.vue';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';

export default {
  setup() {
    onMounted(() => {
      getConventions();
    });
    async function getConventions() {
      try {
        await conventionsService.getConventions();
      }
      catch (error) {
        Pop.error(error, "get conventions");
      }
    }
    return {
      conventions: computed(() => AppState.conventions)
    };
  },
  components: { ConventionCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
