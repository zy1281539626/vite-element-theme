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
      黑暗主题<el-switch v-model="changeDark"></el-switch>
    </el-row>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useCssVar } from '@vueuse/core'
import { generateMainColors, generateFillColors } from '../utils/color'
export default {
  setup(){
    const changeDark = ref(false)

    // const aa = colorMix('#141414' ,'#f0f5ff', 0.95)
    // console.log(aa)
    const aa = generateFillColors()
    console.log(aa)

    
    const themeMode = (()=>{
      return changeDark.value === true ? "dark" : "light"
    })

    let customColor = {
      primary: { light: '#cd2a86', dark: '#cd2a86' }
    }
    
    watch(
      themeMode,
      (newValue) => {
        if(newValue === 'light') {
          const themeColor = generateMainColors(customColor)
          console.log(themeColor)
          let a = themeColor[newValue]        
          let styleEl = document.getElementById('custom-theme');
          if(!styleEl){
            styleEl = document.createElement('style');
            styleEl.setAttribute('id','custom-theme');
          }
          styleEl.innerText = ':root'+JSON.stringify(a).replace(/\,/g, ';').replace(/\"/g, '')
          document.head.append(styleEl)
        }else{
          document.getElementById('custom-theme')?.remove();
        }
        

        // for(let colorKey in themeColor[newValue]){
        //   useCssVar(colorKey).value = themeColor[newValue][colorKey]
        // }
        useCssVar('color-scheme').value = newValue
      },
      {
        immediate: true
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