<template>
  <div class="dashboard-container">
    <div class="dashboard-text">&nbsp; Welcome! {{ name }}</div>
    <div class="">
      <p />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    background: #67C23A;
    color: #fff;
  }
}
</style>
