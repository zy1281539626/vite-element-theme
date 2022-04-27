<template>
  <div>
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
  </div>
</template>

<script>
import { generateColors, chalk } from '@element-plus/colors'

import { useCssVar } from '@vueuse/core'
export default {
  setup(){
    const color = useCssVar('--el-color-primary')
    color.value = "red"
    
    // function colorRGB2Hex(color) {
    //   var rgb = color.split(',');
    //   var r = parseInt(rgb[0].split('(')[1]);
    //   var g = parseInt(rgb[1]);
    //   var b = parseInt(rgb[2].split(')')[0]);
    //   var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    //   return hex;
    // }
    // let { primary, success, warning, danger, error, info } = generateColors('#aa1696')
    // primary = primary.map(item=>{
    //   return colorRGB2Hex(item)
    // })
    // success = success.map(item=>{
    //   return colorRGB2Hex(item)
    // })


    function generateElementColor(mode, color){
      // color mix
      const colorMix = (color1, color2, weight, isDark) => {
        weight = Math.max(Math.min(Number(weight), 1), 0)
        let r1 = parseInt(color1.substring(1, 3), 16)
        let g1 = parseInt(color1.substring(3, 5), 16)
        let b1 = parseInt(color1.substring(5, 7), 16)
        let r2 = parseInt(color2.substring(1, 3), 16)
        let g2 = parseInt(color2.substring(3, 5), 16)
        let b2 = parseInt(color2.substring(5, 7), 16)
        let r = Math.round(r1 * ((mode !== 'dark' || isDark) ? (1 - weight) : weight) + r2 * ((mode !== 'dark' || isDark) ? weight : (1-weight)))
        let g = Math.round(g1 * ((mode !== 'dark' || isDark) ? (1 - weight) : weight) + g2 * ((mode !== 'dark' || isDark) ? weight : (1-weight)))
        let b = Math.round(b1 * ((mode !== 'dark' || isDark) ? (1 - weight) : weight) + b2 * ((mode !== 'dark' || isDark) ? weight : (1-weight)))
        r = ("0" + (r || 0).toString(16)).slice(-2)
        g = ("0" + (g || 0).toString(16)).slice(-2)
        b = ("0" + (b || 0).toString(16)).slice(-2)
        return "#" + r + g + b;
      }
      let colorObj = {}
      if(mode !== 'dark'){
        colorObj[`--el-color-primary-dark-2`] = colorMix(color, '#000000', 0.2, true)
      }else{
        colorObj[`--el-color-primary-dark-2`] = colorMix(color, '#ffffff', 0.2, true)
      }
      for (let i = 1; i < 10; i += 1) {
        colorObj[`--el-color-primary-light-${mode === 'dark' ? i : 10 - i}`] = colorMix(mode === 'dark' ? '#141414' : '#ffffff', color, i * 0.1)
      }
      return colorObj
    }

    // Primary
    // console.log('light:', generateElementColor('light', '#409eff'))
    // console.log('dark:', generateElementColor('dark', '#409eff'))

    // Success
    // console.log('light:', generateElementColor('light', '#67c23a'))
    // console.log('dark:', generateElementColor('dark', '#59b259'))

    // Warning
    // console.log('light:', generateElementColor('light', '#e6a23c'))
    // console.log('dark:', generateElementColor('dark', '#d6a356'))

    // Danger
    // console.log('light:', generateElementColor('light', '#f56c6c'))
    // console.log('dark:', generateElementColor('dark', '#cc5e5e'))

    // Info
    console.log('light:', generateElementColor('light', '#909399'))
    console.log('dark:', generateElementColor('dark', '#606266'))
  }
}
</script>

<style>

</style>