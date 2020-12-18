<template>
  <div :class="$style.footer">
    <n-link :class="$style.logo" to="/">
      <p>
        Footer
      </p>
    </n-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" module>
.footer {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: green;
}
.logo {
  font-size: 1.5em;
  font-weight: 700;
  opacity: 1;
  color: #000;
  text-decoration: none;
}
</style>