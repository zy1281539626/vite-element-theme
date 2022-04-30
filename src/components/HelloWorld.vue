<template>
  <div>
    <h1 class="text-main-color">测试文字</h1>
    <div style="display: flex">
      Primary:
      <el-color-picker v-model="primary" @change="changeColor('primary')" />
      <el-row> 黑暗主题<el-switch v-model="changeDark"></el-switch> </el-row>
    </div>

    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
      <el-button>中文</el-button>
    </el-row>
    <el-row class="mb-4">
      <el-button plain>Plain</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="info" plain>Info</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
    </el-row>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { useCssVar } from "@vueuse/core";
import {
  generateMainColors,
  generateTextColors,
  generateBorderColors,
  generateFillColors,
  generateBgColors,
  generateMaskColors,
  generateBoxShadowColors,
} from "../utils/color";
import _ from "lodash-es";

export default {
  setup() {
    const primary = ref("#cd2a86");

    const changeDark = ref(false);
    const defineColor = reactive({
      primary: { light: "#cd2a86", dark: "#cd2a86" },
    });

    const themeMode = computed(() => {
      return changeDark.value === true ? "dark" : "light";
    });

    const a = computed(() => generateMainColors(defineColor));
    const b = computed(() => generateTextColors());
    const c = computed(() => generateBorderColors());
    const d = computed(() => generateFillColors());
    const e = computed(() => generateBgColors());
    const f = computed(() => generateMaskColors());
    const g = computed(() => generateBoxShadowColors());

    const resColorsss = computed(() => {
      return _.merge(
        {},
        a.value,
        b.value,
        c.value,
        d.value,
        e.value,
        f.value,
        g.value
      );
    });

    watch(
      [themeMode, defineColor],
      ([newValue]) => {
        const themeColor = resColorsss.value;
        document.getElementById("custom-theme")?.remove();

        let currentTheme = themeColor[newValue];
        let styleEl = document.createElement("style");
        styleEl.setAttribute("id", "custom-theme");
        currentTheme["color-scheme"] = newValue;
        styleEl.innerHTML =
          ":root" +
          JSON.stringify(currentTheme).replace(/\,/g, ";").replace(/\"/g, "");
        document.head.append(styleEl);
      },
      {
        immediate: true,
        deep: true,
      }
    );

    function changeColor(color) {
      defineColor[color]["light"] = primary.value;
      defineColor[color]["dark"] = primary.value;
    }

    return {
      changeDark,
      primary,
      changeColor,
    };
  },
};
</script>

<style></style>
