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
      <!-- <el-button type="primary">切换主题</el-button> -->
      黑暗主题<el-switch v-model="changeDark"></el-switch>
    </el-row>
  </div>
</template>

<script>
// import { generateColors, chalk } from '@element-plus/colors'
import { computed, ref, watch } from 'vue'
import { useCssVar } from '@vueuse/core'
export default {
  setup(){
    const changeDark = ref(false)

    function generateElementColor(mode, color, type){
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
      // main color
      let colorObj = {
        [`--el-color-${ type }`]: color
      }
      // dark color
      if(mode !== 'dark'){
        colorObj[`--el-color-${ type }-dark-2`] = colorMix(color, '#000000', 0.2, true)
      }else{
        colorObj[`--el-color-${ type }-dark-2`] = colorMix(color, '#ffffff', 0.2, true)
      }
      // lighter color
      for (let i = 1; i < 10; i += 1) {
        colorObj[`--el-color-${ type }-light-${mode === 'dark' ? i : 10 - i}`] = colorMix(mode === 'dark' ? '#141414' : '#ffffff', color, i * 0.1)
      }
      return colorObj
    }

    // default color
    const COLOR = [
      { 
        type: 'primary',
        light: '#409eff',
        dark: '#409eff'
      },
      {
        type: 'success',
        light: '#409eff',
        dark: '#409eff'
      },
      {
        type: 'warning',
        light: '#e6a23c',
        dark: '#d6a356'
      },
      {
        type: 'danger',
        light: '#f56c6c',
        dark: '#cc5e5e'
      },
      {
        type: 'error',
        light: '#f56c6c',
        dark: '#cc5e5e'
      },
      {
        type: 'info',
        light: '#909399',
        dark: '#606266'
      }
    ]

    const themeColor = {}
    COLOR.forEach(item=>{
      let light = generateElementColor('light', item.light, item.type)
      let dark = generateElementColor('dark', item.dark, item.type)
      themeColor.light = {...themeColor.light, ...light}
      themeColor.dark = {...themeColor.dark, ...dark}
    })
    console.log(themeColor)

    
    const themeMode = (()=>{
      return changeDark.value === true ? "dark" : "light"
    })

    watch(
      themeMode,
      (newValue) => {
        for(let colorKey in themeColor[newValue]){
          useCssVar(colorKey).value = themeColor[newValue][colorKey]
        }
        useCssVar('color-scheme').value = newValue
      }
    )

    return {
      changeDark
    }
  }
}
</script>

<style>

</style>