<template>
  <div class="container-fluid mb-4">
    <section v-if="convention" class="row justify-content-center">
      <div class="col-12 hero-img" :style="`background-image: url(${convention.imgUrl})`">
        <section class="row justify-content-center fade-bg h-100 align-items-end">
          <div class="col-12 col-md-8">
            <div class="d-flex justify-content-between fw-bold">
              <h2>{{ convention.name }}</h2>
              <div>{{ new Date(convention.date).toLocaleDateString() }}</div>
              <button v-if="account.id == convention.creatorId" @click="deleteConvention" class="btn btn-danger"
                title="delete convention"><i class="mdi mdi-delete-forever"></i></button>
            </div>
            <p>{{ convention.description }}</p>
          </div>
        </section>
      </div>
      <div class="col-12 col-md-10 col-lg-8 ">
        <section v-if="account.orgName && account.orgUrl && account.orgColor"
          class="row bg-primary darken-50 border border-primary rounded py-2">
          <BoothForm v-if="convention.boothSpots - convention.boothCount > 0" />
          <div v-else>
            <div class="text-warning p-3">No more booth spaces available</div>
          </div>
        </section>
        <section v-else-if="account.id" class="text-center bg-primary darken-50 border border-primary rounded py-2">
          Please fill out you sponsor profile to book your booth space.
          <router-link :to="{ name: 'Account' }">manage profile</router-link>
        </section>
        <section class="row justify-content-around mb-2 mt-3">
          <div class="col-3 btn btn-primary keynote rounded-pill" @click="filter = 'keynote'">Keynotes</div>
          <div class="col-3 btn btn-primary products rounded-pill" @click="filter = 'productsForSale'">Shops</div>
          <div class="col-3 btn btn-primary appointment rounded-pill" @click="filter = 'appointmentRequired'">
            Requires Appointment
          </div>
          <div v-if="filter" class="col-1 btn btn-primary rounded-pill" @click="filter = ''"><i class="mdi mdi-close"></i>
          </div>
        </section>
        <section class="row mt-2 g-3">
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
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { conventionsService } from '../services/ConventionsService.js';
import { useRoute } from 'vue-router';
import BoothForm from '../components/BoothForm.vue';
import { router } from '../router.js';
export default {
  setup() {
    const route = useRoute();
    const filter = ref('')
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
      filter,
      account: computed(() => AppState.account),
      convention: computed(() => AppState.activeConvention),
      booths: computed(() => {
        if (filter.value) {
          return AppState.conventionBooths.filter(b => b[filter.value])
        }
        return AppState.conventionBooths
      }),
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
.keynote {
  background-image: url(https://s3-alpha-sig.figma.com/img/2745/1f3a/df21a934f08bc9e69f97443fe803df63?Expires=1682899200&Signature=ioWTxDFerKy2kgiupP1U5WkQLfWAL2~X9KD~CFFSWxE7Z5XcfbGALBRJGnu2J15BX7ZePaxhyCxwf2EQw2T1lRH7hFl3QudimSnjkVnraS~Twe3y3hrU2VDbOJb1g5n9VMTuApgkKEwC3hqHO~SNihTsac2m8r36ot0DCWWxKGP3oF6xhb333Rl5R0SxHRn2SVkxIjUUlPPIHTUZkfBp~ClcHmroyUFbRg63ZlKjJqnBwnPEf-s3NneZDOZoJGgsn40~QD3SASQPzvS3AIRut-VFOPRtzMdNo9YF-kXPqygmDMeNmLBQA4J1PltQchP6odx1h2E3rm8K~GkHTId3Wg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4);
  background-size: cover;
  background-position: center;
}

.products {
  background-image: url(https://s3-alpha-sig.figma.com/img/168f/8dd0/f81e61a6e5d0ed41b6c859b1c6563f9a?Expires=1682899200&Signature=Fs3dGwcNyxVVfhdbOL8XXAqCDk8x9lZ3mfZDdBOUoT62CMV~jvOuElfPVQqwLm4QxIsCcO4iZjCKWPxyK3n7e7gseLbEnw2LLJOj8t8UJoKUb3wRWnVAIhiLYm6N5E3F-MPjaQ0CmxK000novCSh3LtBsdHf6oevc3mbOAJmPNXKOjnIIP5ZlKaHSk9hc7VwPgm55LS4WX73hjLTd2-koViVFqAV~C4R6q5WskhHyBE-1nGx3OSWbx2rrYju4n9Z5OiJLUXaP4OhdrDL~BpfnpPD3qYjr~czs-DV8pUwnX1q2K9YvcIpdPiAizOIwXh~VZxScZ8lCsG7dFd7U4gJkQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4);
  background-size: cover;
  background-position: center;
}

.appointment {
  background-image: url(https://s3-alpha-sig.figma.com/img/b0b1/7201/7bf827d8d4df7127d8d209c95c5c8d48?Expires=1682899200&Signature=QnHUnrpBYQJ~Vt3bLN4tI8sK724VJX7BKWnfYNQkEcrJc5srat2phRUu-AMj5D2fFGMmN4eA3skgOx-tLn2HVeSCJaeQ8qM0zgRrnM6VjPSPpYgO25YGyO4fMRfiro1EHFpNO~EoIA0O0FXy3ocFYUha1WEhHHggGdbAd0aWIXIL-WLzO1wpYvunGDUaiKDwRmtl~CUlSg76lche6pifFZqQjJKEx9ZSGGy8uvh6-lqPvOBq9ShkBSN~uq~MHgQtPGVS-XTljp4CX1~rPQw5u82DQHEl~ScUtiXC~rlyyr12lhOIoDZQOUxnihPGHidqpWZGigIetZNqyQWzgBZF1Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4);
  background-size: cover;
  background-position: center;
}

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
