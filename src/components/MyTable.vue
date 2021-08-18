<template>
  <table>
    <caption v-if="title">
      {{
        title
      }}
    </caption>
    <thead>
      <tr>
        <th>{{ fromTitle }}</th>
        <th>{{ toTitle }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td :data-label="fromTitle">{{ fromValue }}</td>
        <td :data-label="toTitle">{{ toValue }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "MyTable",
  props: ["title", "fromTitle", "toTitle", "fromValue", "toValue"],
};
</script>