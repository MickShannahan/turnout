<template>
  <router-link :to="{
    name: 'Convention Details', params: { conventionId: convention.id }
  }">
    <div
      class="card bg-dark position-relative rounded border border-primary glow overflow-hidden selectable text-primary">
      <img class="convention-img" :src="convention.imgUrl" alt="" srcset="">
      <div class="position-absolute description">
        <span class="bg-dark px-2 py-1 rounded-top border-top border-end border-primary">
          {{ convention.name }}
        </span>
        <span class="d-flex border-bottom border-primary"></span>
        <div class="bg-dark w-100 p-1">
          <div class="text-info">
            {{ convention.tags }}
          </div>
          <div class="text-end text-grey">
            {{ new Date(convention.date).toLocaleDateString() }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
const props = defineProps({ convention: { type: Object, required: true } })

</script>


<style lang="scss" scoped>
.convention-img {
  height: 400px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.description {
  bottom: 0;
  left: 0;
  right: 0;
}

.glow {
  box-shadow: 0px 0px 24px #6b45f380;
}
</style>
