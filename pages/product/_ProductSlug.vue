<template>
  <div :class="$style.page">
    <div :class="$style.topBlock">
      <div :class="$style.topLeftBlock">
        <!-- <a :href="product.images.imgXL" target="_blank"> -->
          <img
            v-lazy="product.image"
            :class="$style.image"
          />
        <!-- </a> -->
      </div>
      <div :class="$style.topRightBlock">
        <h1>{{ product.pName }}</h1>
        <p>Цена: {{ product.pPrice }}</p>
        <BuyButton :product="product" />
      </div>
    </div>
    <h2>Описание</h2>
    <p>{{ product.pDesc }}</p>
    <h2>С этим товаром также покупают</h2>
    <ProductsList :products="product.alsoBuyProducts" />
    <h2>Возможно вам будет интересно</h2>
    <ProductsList :products="product.interestingProducts" />
  </div>
</template>

<script>
import BuyButton from '~~/components/common/BuyButton'
import ProductsList from '~~/components/common/ProductsList'
import { mapState } from 'vuex'
export default {
  components: {
    BuyButton,
    ProductsList
  },
  async asyncData ({ app, params, route, error }) {
    try {
      await app.store.dispatch('getCurrentProduct', { route })
    } catch (err) {
      console.log(err)
      return error({
        statusCode: 404,
        message: 'Товар не найдена или сервер не доступен'
      })
    }
  },
  computed: {
    ...mapState({
      product: 'currentProduct'
    })
  },
  head () {
    return {
      title: this.product.pTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.product.pMetaDescription
        }
      ]
    }
  }
}
</script>
<style lang="scss" module>
.page {
  @include globalWrapper;
}
.image {
  width: 400px;
  height: auto;
}
.topBlock {
  padding-top: 2em;
  display: flex;
  .topLeftBlock {
    display: flex;
  }
  .topRightBlock {
    padding-left: 2em;
    display: flex;
    flex-direction: column;
  }
}
</style>