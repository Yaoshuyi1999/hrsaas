<template>
  <div style="margin: 0 8px">
    <svg-icon
      @click="onFullScreen"
      iconClass="fullscreen"
      className="fullscreen"
    ></svg-icon>
  </div>
</template>

<script>
import screenFull from "screenfull";
export default {
  name: "FullScreen",
  data() {
    return {};
  },

  created() {},

  methods: {
    onFullScreen() {
      if (screenFull.isEnabled) {
        screenFull.toggle();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fullscreen {
  color: #fff;
}
</style>
