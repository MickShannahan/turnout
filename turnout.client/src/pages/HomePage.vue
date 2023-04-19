<template>
  <div class="container-fluid">
    <section class="row p-5">
      <h1 class="picture-text">THIS IS THE APP THAT JOINS PEOPLE TO PLACES</h1>
    </section>
    <section class="row justify-content-center mt-5">
      <div class="col-12 col-md-8">
        <h5>upcoming conventions</h5>
      </div>
      <div class="col-12 col-md-8">
        <section class="conventions">

          <div class="" v-for="c in conventions">
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
.picture-text {
  max-width: 12em;
  font-size: 64px;
  font-weight: bold;
  background-position: bottom;
  background-size: 170%;
  background-image: url(https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: contrast(.8) brightness(1.05) saturate(1.1);
}

.conventions {
  display: grid;
  // justify-content: center;
  grid-template-columns: repeat(auto-fill, 270px);


  &>div {
    margin: .55em;
    grid-area: auto;
  }
}
</style>
