<template>
  <div>
    <h1>Интернет-магазин "Хвостики"</h1>
    <!-- $nuxt helper -->
    <div v-if="$nuxt.isOnline">You are online</div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <CategoriesList :categories="categories" />
  </div>
</template>

<script>
import CategoriesList from '~~/components/common/CategoriesList'
import { mapState } from 'vuex'
export default {
  components: {
    CategoriesList
  },
  // This hook can only be placed on page components
  async asyncData ({ app, route, params, error, store }) {
    try {
      await store.dispatch('getCategoriesList')
    } catch (err) {
      console.log(err)
      return error({
        statusCode: 404,
        message: 'Категории не найдены или сервер не доступен'
      })
    }
  },
  computed: {
    ...mapState({
      categories: 'categoriesList'
    })
  }
}
</script>