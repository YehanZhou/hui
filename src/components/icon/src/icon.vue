<template>
  <i :class="'h-icon-' + name"></i>
</template>

<script>
export default {
  name: 'HIcon',

  props: {
    name: String
  }
}
</script>
