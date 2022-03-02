<template>
    <svg class="svg-icon" aria-hidden="true" :style="`fill: ${calcColor};`">
      <use :xlink:href="iconName" />
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
    },
    isColorVariable: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  computed: {
    iconName() {
      return `#${this.iconname}`
    },
    calcColor() {
      if (this.isColorVariable) {
        return this.$style[this.color]
      } else {
        return this.color
      }
    }
  }
}
</script>
<style module lang="scss" src="@/assets/styles/export.scss"></style>

<style lang="scss">
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    color: $dark-brown;
    // fill: currentColor;
    overflow: hidden;
}
</style>
