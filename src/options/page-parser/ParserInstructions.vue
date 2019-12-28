<template>
  <div>
    <p>Each component of a page parser is the body of a function that takes the pathname and document of a page as arguments. Each component will be evaluated as the body of the following function once on relevant pages. The resulting data will be validated and stored.</p>
    <pre v-highlightjs><code class="javascript">function executePageParserComponent(pathname, document) { 
      // Page parser component goes here 
  }</code></pre>
    <p>Your components should return the appropriate piece of data. For example, a string for the book title and a number for the chapter number.</p>
    <p>
      You can also return the value
      <code class="javascript">'ignore_parse_result'</code> if an appropriate value does not exist on the current page. All components will be ignored if at least one component returns this value.
    </p>
  </div>
</template>

<script>
export default {
  name: "ParserInstructions"
};
</script>

<style scoped>
.instructionCard {
  margin-bottom: 20px;
}
</style>
