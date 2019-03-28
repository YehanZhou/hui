<template>
  <label
    class="h-radio"
    :class="[
      border && radioSize ? 'h-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label }
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span
      class="h-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="h-radio__inner"></span>
      <input
        class="h-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      >
    </span>
    <span
      class="h-radio__label"
      @keydown.stop
    >
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
import Emitter from 'hui/mixins/emitter'

export default {
  name: 'HRadio',

  mixins: [Emitter],

  inject: {
    hForm: {
      default: ''
    },

    hFormItem: {
      default: ''
    }
  },

  componentName: 'HRadio',

  props: {
    value: {},
    label: {},
    disabled: Boolean,
    name: String,
    border: Boolean,
    size: String
  },

  data() {
    return {
      focus: false
    }
  },
  computed: {
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'HRadioGroup') {
          parent = parent.$parent
        } else {
          this._radioGroup = parent
          return true
        }
      }
      return false
    },
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('HRadioGroup', 'input', [val])
        } else {
          this.$emit('input', val)
        }
      }
    },
    _hFormItemSize() {
      return (this.hFormItem || {}).hFormItemSize
    },
    radioSize() {
      const temRadioSize =
        this.size || this._hFormItemSize || (this.$ELEMENT || {}).size
      return this.isGroup
        ? this._radioGroup.radioGroupSize || temRadioSize
        : temRadioSize
    },
    isDisabled() {
      return this.isGroup
        ? this._radioGroup.disabled ||
            this.disabled ||
            (this.hForm || {}).disabled
        : this.disabled || (this.hForm || {}).disabled
    },
    tabIndex() {
      return this.isDisabled || (this.isGroup && this.model !== this.label)
        ? -1
        : 0
    }
  },

  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit('change', this.model)
        this.isGroup && this.dispatch('HRadioGroup', 'handleChange', this.model)
      })
    }
  }
}
</script>
