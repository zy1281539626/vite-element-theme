/**
 * color mix
 * @param {*} color1 
 * @param {*} color2 
 * @param {*} weight 
 */
export function colorMix (color1, color2, weight) {
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

/**
 * darker color
 * @param {*} color 
 * @param {*} mode 
 * @returns 
 */
export function getDarkerColor(color, mode="light") {
  let baseColor = mode === "light" ? "#000000" : "#ffffff"
  return colorMix(color, baseColor, 0.2)
}

/**
 * color level
 * @param {*} color 
 * @param {*} weightArr step Array
 * @param {*} mode 
 */
export function lighterLevelColor(color, weightArr, mode="light") {
  let colors = []
  let mixColor = mode === "light" ? "#ffffff" : "#141414"
  weightArr.forEach(weight => {
    colors.push(colorMix(color, mixColor, weight))
  });
  return colors
}

/**
 * generate main colors
 * @param {*} colors base颜色
 * @returns 
 */
export function generateMainColors(colors = {}){
  const prefix = "--el-color-"
  let types = {
    primary: { light: '#409eff', dark: '#409eff' },
    success: { light: '#67c23a', dark: '#59b259' },
    warning: { light: '#e6a23c', dark: '#d6a356' },
    danger: { light: '#f56c6c', dark: '#cc5e5e' },
    error: { light: '#f56c6c', dark: '#cc5e5e' },
    info: {light: '#909399', dark: '#606266' }
  }
  types = { ...types, ...colors }
  const res = {}
  Object.keys(types).forEach(type=>{
    let item = types[type]
    // weight
    let weightArr = [0.3, 0.5, 0.7, 0.8, 0.9]
    let lightColor = lighterLevelColor(item.light, weightArr)
    let darkColor = lighterLevelColor(item.dark, weightArr, 'dark')
    // light-mode color
    lightColor.forEach((light, index)=>{
      res.light = { ...res.light, ...{ [prefix+type+'-light-'+weightArr[index]*10]: light } }
    })
    // dark-mode color
    darkColor.forEach((dark, index)=>{
      res.dark = { ...res.dark, ...{ [prefix+type+'-light-'+weightArr[index]*10]: dark } }
    })
    // add base color
    res.light[prefix+type] = item.light
    res.dark[prefix+type] = item.dark
    // add darker color
    res.light[prefix+type+'-dark-2'] = getDarkerColor(item.light)
    res.dark[prefix+type+'-dark-2'] = getDarkerColor(item.dark, 'dark') 
  })
  return res
}


/**
 * generate text colors
 */
export function generateTextColors(){
  const prefix = "--el-text-color-"
  let lightColor = {
    primary: '#303133',
    regular: '#606266',
    secondary: '#909399',
    placeholder: '#a8abb2',
    disabled: '#c0c4cc'
  }
  const res = {}
  const colorKeys = Object.keys(lightColor)
  colorKeys.forEach(key=>{
    res.light = { ...res.light, ...{ [prefix+key]: lightColor[key] } }
  })
  let darkWeight = [0.05, 0.15, 0.35, 0.45, 0.60]
  let darkColor = lighterLevelColor('#f0f5ff', darkWeight, 'dark')
  darkColor.forEach((dark, index)=>{
    res.dark = { ...res.dark, ...{ [prefix+colorKeys[index]]: dark } }
  })
  return res
}

/**
 * generate border colors
 */
export function generateBorderColors(){
  const prefix = "--el-border-color"
  let lightColor = {
    'darker': '#cdd0d6',
    'dark': '#d4d7de',
    '': '#dcdfe6',
    'light': '#e4e7ed',
    'lighter': '#ebeef5',
    'extra-light': '#f2f6fc'
  }
  const res = {}
  const colorKeys = Object.keys(lightColor)
  colorKeys.forEach(key=>{
    res.light = { ...res.light, ...{ [key?(prefix+'-'+key):prefix]: lightColor[key] } }
  })
  let darkWeight = [0.65, 0.70, 0.75, 0.80, 0.85, 0.90]
  let darkColor = lighterLevelColor('#f5f8ff', darkWeight, 'dark')
  darkColor.forEach((dark, index)=>{
    res.dark = { ...res.dark, ...{ [colorKeys[index] ? (prefix+'-'+colorKeys[index]) : prefix]: dark } }
  })
  return res
}

/**
 * generate fill colors
 */
export function generateFillColors(){
  const prefix = "--el-fill-color"
  let lightColor = {
    'darker': '#e6e8eb',
    'dark': '#ebedf0',
    '': '#f0f2f5',
    'light': '#f5f7fa',
    'lighter': '#fafafa',
    'extra-light': '#fafcff',
    'blank': '#ffffff',
  }
  const res = {}
  const colorKeys = Object.keys(lightColor)
  colorKeys.forEach(key=>{
    res.light = { ...res.light, ...{ [key?(prefix+'-'+key):prefix]: lightColor[key] } }
  })
  let darkWeight = [0.80, 0.84, 0.88, 0.92, 0.96, 0.98, 1]
  let darkColor = lighterLevelColor('#fafcff', darkWeight, 'dark')
  darkColor.forEach((dark, index)=>{
    res.dark = { ...res.dark, ...{ [colorKeys[index] ? (prefix+'-'+colorKeys[index]) : prefix]: dark } }
  })
  return res
}

/**
 * generate bg colors
 * @returns 
 */
export function generateBgColors(){
  return {
    light: {
      '--el-bg-color': '#ffffff',
      '--el-bg-page': '#ffffff',
      '--el-bg-overlay': '#ffffff'
    },
    dark: {
      '--el-bg-color': '#141414',
      '--el-bg-page': '#0a0a0a',
      '--el-bg-overlay': '#1d1e1f'
    }
  }
}

/**
 * generate mask  colors
 */
export function generateMaskColors(){
  return {
    light: {
      '--el-overlay-color': 'rgba(0, 0, 0, 0.8)',
      '--el-overlay-color-light': 'rgba(0, 0, 0, 0.7)',
      '--el-overlay-color-lighter': 'rgba(0, 0, 0, 0.5)',
      '--el-mask-color': 'rgba(255, 255, 255, 0.9)',
      '--el-mask-color-extra-light': 'rgba(255, 255, 255, 0.3)'
    },
    dark: {
      '--el-overlay-color': 'rgba(255, 255, 255, 0.8)',
      '--el-overlay-color-light': 'rgba(255, 255, 255, 0.7)',
      '--el-overlay-color-lighter': 'rgba(255, 255, 255, 0.5)',
      '--el-mask-color': 'rgba(0, 0, 0, 0.9)',
      '--el-mask-color-extra-light': 'rgba(0, 0, 0, 0.3)'
    }
  }
}

/**
 * generate BoxShadow Colors
 * @returns 
 */
export function generateBoxShadowColors() {
  return {
    light: {
      '--el-box-shadow': '0px 12px 32px 4px rgba(0, 0, 0, 0.04),0px 8px 20px rgba(0, 0, 0, 0.08)',
      '--el-box-shadow-light': '0px 0px 12px rgba(0, 0, 0, 0.12)',
      '--el-box-shadow-lighter': '0px 0px 6px rgba(0, 0, 0, 0.12)',
      '--el-box-shadow-dark': '0px 16px 48px 16px rgba(0, 0, 0, 0.08),0px 12px 32px rgba(0, 0, 0, 0.12),0px 8px 16px -8px rgba(0, 0, 0, 0.16)'
    },
    dark: {
      '--el-box-shadow': '0px 12px 32px 4px rgba(0, 0, 0, 0.36),0px 8px 20px rgba(0, 0, 0, 0.72)',
      '--el-box-shadow-light': '0px 0px 12px rgba(0, 0, 0, 0.72)',
      '--el-box-shadow-lighter': '0px 0px 6px rgba(0, 0, 0, 0.72)',
      '--el-box-shadow-dark': '0px 16px 48px 16px rgba(0, 0, 0, 0.72),0px 12px 32px #000000,0px 8px 16px -8px #000000'
    }
  }
}

// 加diff算法，不然太多重复的