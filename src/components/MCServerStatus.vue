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
    <h1>MC STATUS: {{ name }}</h1>

    <div v-if="data === null">
      <p>Chargement...</p>
    </div>
    <div v-else-if="data.online">
      <img v-if="data.favicon" :src="data.favicon" />
      <ul>
        <li>Status : {{ data.online ? '🟢 Online' : '🔴 Offline' }}</li>
        <li>IP : {{ data.address }}</li>
        <li v-if="data.players">Players : {{ data.players.online }} / {{ data.players.max }}</li>
        <li v-if="data.version">Version : {{ data.version }}</li>
      </ul>
    </div>
    <div v-else>
      <p v-if="data.error">Erreur : {{ data.error }}</p>
      <p v-else>Erreur inconnue.</p>
    </div>
    <br>
  </div>
</template>