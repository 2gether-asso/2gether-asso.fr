
<script>
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
    }
    catch (e) {
      this.data = null
    }
  },
}
</script>

<template>
  <div>
    <!-- Data fetched at build can be rendered in HTML -->
    <div v-if="data === null">
      <ul>
        <li class="flex flex-col items-center gap-4 p-6 border border-default bg-offset">
          <h1 class="text-primary font-bold">
            {{ name }}
          </h1>
          <p>Chargement...</p>
        </li>
      </ul>
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
      <h1 class="text-primary font-bold text-center">
        {{ name }}
      </h1>
      <p v-if="data.error">Erreur : {{ data.error }}</p>
      <p v-else>Erreur inconnue.</p>
    </div>
  </div>
</template>