<script>
import Emitter from '../../../mixins/emitter'

export default {
  name: 'HCheckboxGroup',

  componentName: 'HCheckboxGroup',

  mixins: [Emitter],

  inject: {
    hFormItem: {
      default: ''
    }
  },

  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String
  },

  computed: {
    _hFormItemSize() {
      return (this.hFormItem || {}).hFormItemSize
    },
    checkboxGroupSize() {
      return this.size || this._hFormItemSize || (this.$ELEMENT || {}).size
    }
  },

  watch: {
    value(value) {
      this.dispatch('HFormItem', 'h.form.change', [value])
    }
  }
}
</script>

<template>
  <div
    class="h-checkbox-group"
    role="group"
    aria-label="checkbox-group"
  >
    <slot></slot>
  </div>
</template>
