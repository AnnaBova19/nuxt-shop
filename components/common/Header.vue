<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <div style="display: flex;">
        <nuxt-link exact active-class="active" :class="$style.logo" to="/">
          <p>
            Хвостики
          </p>
        </nuxt-link>
        <nuxt-link active-class="active" :class="$style.logo" to="/about">
          <p :class="$style.link">
            О магазине
          </p>
        </nuxt-link>
      </div>

      <CartButton />
    </div>
  </div>
</template>

<script>
import CartButton from '~~/components/header/CartButton'
export default {
  components: {
    CartButton
  }
}
</script>

<style lang="scss" module>
.wrapper {
  background-color: $basic-bg-color;
}
.header {
  @include globalWrapper;
  display: flex;
  justify-content: space-between;
}
.link {
  padding: 0 20px;
}
.logo {
  font-size: 1.5em;
  font-weight: 700;
  opacity: 1;
  color: #000;
  text-decoration: none;
}
</style>