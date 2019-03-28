<template>
  <div
    :class="[
    type === 'textarea' ? 'h-textarea' : 'h-input',
    inputSize ? 'h-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'h-input-group': $slots.prepend || $slots.append,
      'h-input-group--append': $slots.append,
      'h-input-group--prepend': $slots.prepend,
      'h-input--prefix': $slots.prefix || prefixIcon,
      'h-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
    }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div
        class="h-input-group__prepend"
        v-if="$slots.prepend"
      >
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="h-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        :value="nativeInputValue"
        ref="input"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <span
        class="h-input__prefix"
        v-if="$slots.prefix || prefixIcon"
      >
        <slot name="prefix"></slot>
        <i
          class="h-input__icon"
          v-if="prefixIcon"
          :class="prefixIcon"
        >
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="h-input__suffix"
        v-if="$slots.suffix || suffixIcon || showClear || showPassword || validateState && needStatusIcon"
      >
        <span class="h-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible">
            <slot name="suffix"></slot>
            <i
              class="h-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon"
            >
            </i>
          </template>
          <i
            v-if="showClear"
            class="h-input__icon h-icon-circle-close h-input__clear"
            @click="clear"
          ></i>
          <i
            v-if="showPwdVisible"
            class="h-input__icon h-icon-view h-input__clear"
            @click="handlePasswordVisible"
          ></i>
        </span>
        <i
          class="h-input__icon"
          v-if="validateState"
          :class="['h-input__validateIcon', validateIcon]"
        >
        </i>
      </span>
      <!-- 后置元素 -->
      <div
        class="h-input-group__append"
        v-if="$slots.append"
      >
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="h-textarea__inner"
      :value="nativeInputValue"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
  </div>
</template>
<script>
import emitter from 'hui/mixins/emitter'
import Migrating from 'hui/mixins/migrating'
import calcTextareaHeight from './calcTextareaHeight'
import merge from 'hui/utils/merge'

export default {
  name: 'HInput',

  componentName: 'HInput',

  mixins: [emitter, Migrating],

  inheritAttrs: false,

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data() {
    return {
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isOnComposition: false,
      passwordVisible: false
    }
  },

  props: {
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
          console.warn(
            "[Element Warn][Input]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead."
          )
        return true
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : ''
    },
    needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false
    },
    validateIcon() {
      return {
        validating: 'h-icon-loading',
        success: 'h-icon-circle-check',
        error: 'h-icon-circle-close'
      }[this.validateState]
    },
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, { resize: this.resize })
    },
    inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : this.value
    },
    showClear() {
      return (
        this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.nativeInputValue &&
        (this.focused || this.hovering)
      )
    },
    showPwdVisible() {
      return (
        this.showPassword &&
        !this.inputDisabled &&
        !this.readonly &&
        (!!this.nativeInputValue || this.focused)
      )
    }
  },

  watch: {
    value(val) {
      this.$nextTick(this.resizeTextarea)
      if (this.validateEvent) {
        this.dispatch('HFormItem', 'el.form.change', [val])
      }
    }
  },

  methods: {
    focus() {
      this.getInput().focus()
    },
    blur() {
      this.getInput().blur()
    },
    getMigratingConfig() {
      return {
        props: {
          icon: 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          click: 'click is removed.'
        }
      }
    },
    handleBlur(event) {
      this.focused = false
      this.$emit('blur', event)
      if (this.validateEvent) {
        this.dispatch('HFormItem', 'el.form.blur', [this.value])
      }
    },
    select() {
      this.getInput().select()
    },
    resizeTextarea() {
      if (this.$isServer) return
      const { autosize, type } = this
      if (type !== 'textarea') return
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        }
        return
      }
      const minRows = autosize.minRows
      const maxRows = autosize.maxRows

      this.textareaCalcStyle = calcTextareaHeight(
        this.$refs.textarea,
        minRows,
        maxRows
      )
    },
    handleFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    handleComposition(event) {
      if (event.type === 'compositionstart') {
        this.isOnComposition = true
      }
      if (event.type === 'compositionend') {
        this.isOnComposition = false
        this.handleInput(event)
      }
    },
    handleInput(event) {
      if (this.isOnComposition) return

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return

      this.$emit('input', event.target.value)

      // set input's value, in case parent refuses the change
      // see: https://github.com/ElemeFE/element/issues/12850
      this.$nextTick(() => {
        let input = this.getInput()
        input.value = this.value
      })
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    calcIconOffset(place) {
      let elList = [].slice.call(
        this.$el.querySelectorAll(`.h-input__${place}`) || []
      )
      if (!elList.length) return
      let el = null
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i]
          break
        }
      }
      if (!el) return
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      }

      const pendant = pendantMap[place]
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${
          this.$el.querySelector(`.h-input-group__${pendant}`).offsetWidth
        }px)`
      } else {
        el.removeAttribute('style')
      }
    },
    updateIconOffset() {
      this.calcIconOffset('prefix')
      this.calcIconOffset('suffix')
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
      this.focus()
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea
    }
  },

  created() {
    this.$on('inputSelect', this.select)
  },

  mounted() {
    this.resizeTextarea()
    this.updateIconOffset()
  },

  updated() {
    this.$nextTick(this.updateIconOffset)
  }
}
</script>
