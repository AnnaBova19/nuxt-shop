<template>
  <div>
    <client-only>
      <modal
        name="customer-cart"
        transition="pop-out"
        height="95%"
        width="95%"
        :max-width="960"
        :adaptive="true"
        :scrollable="true"
        :pivot-y="0.5"
        :reset="true"
        classes="v--modal-customer-cart"
        @before-open="beforeOpen">
        <div class="modal-wrapper content-padding">
          <div class=" header-block">
            <p class="added-product">
              Cart
            </p>
            <div class="close" @click="$modal.hide('customer-cart')">
              <CloseOrDeleteButton />
            </div>
          </div>
          <div v-if="getProductsInCart.length === 0" class="">
            <p>
              Товаров пока нет, но это легко можно исправить :)
            </p>
          </div>
          <template v-else>
            <div class="wrapper">
              <template v-if="getAddedProduct">
                <p class="h1-header">
                  You've added
                </p>
                <ProductsList class="" :products-from-cart="getAddedProduct" />
                <p v-if="getProducts.length > 0" class="h1-header">
                  Previously added products
                </p>
              </template>
              <ProductsList class="products" :products-from-cart="getProducts" />
            </div>
            <div class="total">Total: {{ getAmount | round }}</div>
          </template>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductsList from '~~/components/cart/ProductsList.vue'
import CloseOrDeleteButton from '~~/components/common/input/CloseOrDeleteButton.vue'
import round from '~~/mixins/round.js'
export default {
  components: {
    ProductsList,
    CloseOrDeleteButton
  },
  mixins: [round],
  data () {
    return {
      addedProduct: null,
      defaults: {
        addedProduct: null
      }
    }
  },

  computed: {
    ...mapGetters({
      getProductsInCart: 'cart/getProductsInCart'
    }),
    getAddedProduct () {
      const product = this.getProductsInCart.find(
        prod => prod.productId === this.addedProduct
      )
      if (product) {
        return [product]
      } else {
        return null
      }
    },
    getAmount () {
      let amount = 0
      if (this.getProductsInCart && this.getProductsInCart.length > 0) {
        this.getProductsInCart.forEach(product => {
          amount +=
            parseFloat(product.meta.pPrice) *
            parseInt(product.qty)
        })
        return amount
      } else {
        return 0
      }
    },
    getProducts () {
      if (this.addedProduct) {
        return this.getProductsInCart.filter(
          prod => prod.productId !== this.addedProduct
        )
      } else {
        return this.getProductsInCart
      }
    }

  },

  watch: {
    $route: function () {
      this.$modal.hide('customer-cart')
    },
    getProductsInCart: function (newVal, oldVal) {
      if (oldVal.length > 0) {
        if (this.getProductsInCart.length === 0) {
          this.$modal.hide('customer-cart')
        }
      }
    }
  },
  methods: {
    beforeOpen (event) {
      if (!event.params) {
        event.params = {}
      }
      if (event.params.addedProduct) {
        this.addedProduct = event.params.addedProduct
      } else {
        this.addedProduct = this.defaults.addedProduct
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-error {
  font-weight: 500;
  color: #de0d0d;
  // font-weight: 300;
  font-size: 0.7em;
}
.modal-wrapper {
  // border: 3px solid $accent-border-color;
  background: #fff;
  overflow-y: auto;
  // margin-top: 20px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
}
p.added-product {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.wrapper {
  flex-grow: 1;
  position: relative;
}
.header-block {
  flex-shrink: 0;
  position: relative;
  margin-bottom: 1rem;
  .close {
    position: absolute;
    right: 12px;
    top: 0;
  }
}

.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}

.total {
  display: flex;
  justify-content: flex-end;
  font-size: 1.3rem;
}
</style>