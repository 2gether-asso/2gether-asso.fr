
<script lang="ts">
export default {
  props: ['name'],
  data() {
    return {
      data: null
    }
  },
  async created () {
    try {
      const response = await fetch(`https://api.2gether-asso.fr/mc/${this.name}`)
      const data = await response.json()
      this.data = data
    } catch (error: any) {
      this.data = { error: error.message }
    }
  },
}
</script>

<template>
  <div>

    <!-- Data fetched at build can be rendered in HTML -->
    <div v-if="data === null">

      <div class="flex justify-center items-center bg-gray-200 w-16 h-16 border-2 border-secondary rounded-2xl overflow-hidden mx-auto mb-2">
				<svg class="w-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <!-- Copyright 2022 Fonticons, Inc. -->
          <path d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z" />
        </svg>
      </div>

      <h1 class="text-primary font-bold text-center">
        {{ name }}
      </h1>

      <p class="text-center">Chargement...</p>

    </div>
    <div v-else-if="data.online">

      <div v-if="data.icon" class="w-16 h-16 border-2 border-secondary rounded-2xl overflow-hidden mx-auto mb-2">
        <img :src="data.icon" />
      </div>

      <h1 class="text-primary font-bold text-center">
        {{ name }}
      </h1>

      <p>IP : {{ data.address }}</p>
      <p>Status : {{ data.online ? '🟢 En ligne' : '🔴 Hors Ligne' }}</p>
      <br />

      <p v-if="data.players">Joueurs : {{ data.players.online }} / {{ data.players.max }}</p>
      <p v-if="data.version">Version : {{ data.version }}</p>
      <p v-if="data.seed">Seed : {{ data.seed }}</p>

    </div>
    <div v-else>

      <div class="flex justify-center items-center bg-gray-200 w-16 h-16 border-2 border-secondary rounded-2xl overflow-hidden mx-auto mb-2">
        <svg class="w-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
        </svg>
      </div>

      <h1 class="text-primary font-bold text-center">
        {{ name }}
      </h1>

      <p v-if="data.error">Erreur : {{ data.error }}</p>
      <p v-else>Erreur inconnue.</p>

    </div>
  </div>
</template>