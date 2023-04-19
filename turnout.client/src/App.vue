<template>
  <header>
    <Navbar />
    <div class="gradient-border"></div>
  </header>
  <main>
    <router-view />
  </main>
  <Modal id="convention-form">
    <template #title>Book you convention</template>
    <template #body>
      <ConventionForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import ConventionForm from './components/ConventionForm.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ConventionForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

body {
  background: linear-gradient(116.82deg, #0b0b17 0%, #1D1D46 100%);
}

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.gradient-border {
  height: 1px;
  background-image: linear-gradient(90deg, #6C75F7 -0.28%, #9284D1 100.27%);


}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
