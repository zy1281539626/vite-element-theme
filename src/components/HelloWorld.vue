<template>
  <h1 class="text-main-color">测试文字</h1>
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
  <el-row>
    <el-button type="primary">切换主题</el-button>
  </el-row>
</template>

<script>
import { generateColors, chalk } from '@element-plus/colors'

import { useCssVar } from '@vueuse/core'
export default {
  setup(){
    const color = useCssVar('--el-color-primary')
    color.value = "red"
    
    function colorRGB2Hex(color) {
      var rgb = color.split(',');
      var r = parseInt(rgb[0].split('(')[1]);
      var g = parseInt(rgb[1]);
      var b = parseInt(rgb[2].split(')')[0]);
      var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      return hex;
    }

    let { primary, success, warning, danger, error, info } = generateColors('#aa1696')
    primary = primary.map(item=>{
      return colorRGB2Hex(item)
    })
    // console.log([primary[0],primary[3],primary[5],primary[7],primary[8],primary[9]])

    success = success.map(item=>{
      return colorRGB2Hex(item)
    })
    // console.log(success)
    // console.log(chalk)


    // ================================================================================
    const colorMix = (color1, color2, weight) => {
      weight = Math.max(Math.min(Number(weight), 1), 0)
      let r1 = parseInt(color1.substring(1, 3), 16)
      let g1 = parseInt(color1.substring(3, 5), 16)
      let b1 = parseInt(color1.substring(5, 7), 16)
      let r2 = parseInt(color2.substring(1, 3), 16)
      let g2 = parseInt(color2.substring(3, 5), 16)
      let b2 = parseInt(color2.substring(5, 7), 16)
      let r = Math.round(r1 * (1 - weight) + r2 * weight)
      let g = Math.round(g1 * (1 - weight) + g2 * weight)
      let b = Math.round(b1 * (1 - weight) + b2 * weight)
      r = ("0" + (r || 0).toString(16)).slice(-2)
      g = ("0" + (g || 0).toString(16)).slice(-2)
      b = ("0" + (b || 0).toString(16)).slice(-2)
      return "#" + r + g + b;
    }

    let colorObj = {
      '--el-color-white': '#ffffff',
      '--el-color-primary': '#409eff'
    }

    for (let i = 1; i < 10; i += 1) {
      colorObj[`--el-color-primary-light-${10 - i}`] = colorMix('#ffffff', colorObj['--el-color-primary'], i * 0.1)
    }
    // console.log(colorObj)

    // dark ================================================================
    const darkColor = (color1, color2, weight) => {
      weight = Math.max(Math.min(Number(weight), 1), 0)
      let r1 = parseInt(color1.substring(1, 3), 16)
      let g1 = parseInt(color1.substring(3, 5), 16)
      let b1 = parseInt(color1.substring(5, 7), 16)
      let r2 = parseInt(color2.substring(1, 3), 16)
      let g2 = parseInt(color2.substring(3, 5), 16)
      let b2 = parseInt(color2.substring(5, 7), 16)
      let r = Math.round(r1 + r2 * weight)
      let g = Math.round(g1 + g2 * weight)
      let b = Math.round(b1 + b2 * weight)
      r = ("0" + (r || 0).toString(16)).slice(-2)
      g = ("0" + (g || 0).toString(16)).slice(-2)
      b = ("0" + (b || 0).toString(16)).slice(-2)
      return "#" + r + g + b;
    }
    let aa = darkColor('#141414', '#409eff', 0.1)
    console.log(aa)
  }
}
</script>

<style>

</style>