<template>
    <svg class="svg-icon" aria-hidden="true" :style="`color: ${color};`">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
  name: 'IconSvg',
  props: {
    iconname: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false
    }
  },
  computed: {
    iconName() {
      return `#${this.iconname}`
    }
  }
}
</script>

<style lang="scss">
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    color: $icon-fill-color;
    // fill: currentColor;
    overflow: hidden;
}
</style>
