<template>
  <div class="svg-icon-block">
    <img src="~~/assets/images/baseline-close.png"
      :class="{'svg-icon-delete': buttonType === 'delete'}"/>
  </div>
</template>

<script>
export default {
  props: {
    buttonType: {
      type: String,
      default: 'close'
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon-block {
  display: block;
  cursor: pointer;
}
.svg-icon-delete {
  width: 20px;
}
</style>