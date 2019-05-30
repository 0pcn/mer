<template>
  <div class="row">
    <app-quote v-for="(quote, index) in quotes"
               @click.native="deleteQuote(index)"
               :key="quote">{{ quote }}</app-quote>
  </div>
</template>
<script>
import Quote from '/Users/penny/vuerouter/vui/src/components/Quote/Quote.vue'

export default {
  name: 'QuoteGrid',
  props: ['quotes'],
  components: {
    appQuote: Quote
  },
  methods: {
    deleteQuote (index) {
      this.$emit('quoteDeleted', index)
    }
  }
}
</script>

<style>

</style>
