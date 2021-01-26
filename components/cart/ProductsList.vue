<template>
  <div v-if="productsFromCart.length > 0" :class="$style.wrapper">
    <div
      v-for="product in productsFromCart"
      :key="product.productId"
      :class="$style.product"
    >
      <template>
        <CloseOrDeleteButton
          :class="$style.remove"
          button-type="delete"
          @click.native="onRemoveClickHandler(product)"
        />
        <nuxt-link :to="`/product/${product.meta.pSlug}`">
          <img
            v-lazy="product.image"
            :class="$style.image"
          />
        </nuxt-link>
        <nuxt-link :class="$style.pName" :to="`/product/${product.meta.pSlug}`">
          <p>{{ product.meta.pName }}</p>
        </nuxt-link>
        <div>
          <p>Price: </p>
          <p>{{ product.meta.pPrice }}</p>
        </div>
        <div>
          <p>Quantity:</p>
          <div :class="$style.quantity">
            <button @click="changeProductQuantity(product, -1)">-</button>
            <input
              :value="product.qty"
              :class="$style.input"
              type="number"
              :min="1"
              :max="1000"
              ref="productQty"
              @change.prevent="onQuantityChangeHandler($event, product)"
            />
            <button @click="changeProductQuantity(product, 1)">+</button>
          </div>
        </div>
        <div>
          <p>Amount:</p>
          <p>{{ (product.meta.pPrice * product.qty) | round }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CloseOrDeleteButton from '~~/components/common/input/CloseOrDeleteButton.vue'
import round from '~~/mixins/round'
import { mapActions } from 'vuex'
import debounce from 'lodash.debounce'

export default {
  components: {
    CloseOrDeleteButton
  },
  mixins: [round],
  props: {
    productsFromCart: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapActions({
      setProductQuantity: 'cart/setProductQuantity',
      removeProduct: 'cart/removeProduct'
    }),
    onRemoveClickHandler (product) {
      this.removeProduct(product.productId)
    },
    onQuantityChangeHandler: debounce(function onQuantityChangeHandler (e, product, batch) {
      let qty = batch ? Number(e) + batch : Number(e.target.value)
      this.setProductQuantity({ productId: product.productId, qty })
    }, 400),
    changeProductQuantity(product, val) {
      this.onQuantityChangeHandler(this.$refs.productQty[0].value, product, val)
    }
  }
}
</script>

<style lang="scss" module>
.input {
  height: 20px;
}
.remove {
  top: -15px;
  position: absolute;
  left: -15px;
  z-index: 1;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .product {
    position: relative;
    margin: 1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    * {
      margin-right: 10px;
    }
    .pName {
      width: 150px;
    }
  }

  p {
    max-width: 270px;
    height: 35px;
  }
}
.image {
  width: 75px;
  height: 75px;
  object-fit: cover;
}
.quantity {
  display: flex;
}
</style>