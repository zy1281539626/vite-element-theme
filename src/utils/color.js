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
  let baseColor = mode === "light" ? "#ffffff" : "#141414"
  weightArr.forEach(weight => {
    colors.push(colorMix(color, baseColor, weight))
  });
  return colors
}


export function generateMainColors(){
  const prefix = "--el-color-"
  const types = [
    { type: 'primary', light: '#409eff', dark: '#409eff' },
    { type: 'success', light: '#67c23a', dark: '#59b259' },
    { type: 'warning', light: '#e6a23c', dark: '#d6a356' },
    { type: 'danger', light: '#f56c6c', dark: '#cc5e5e' },
    { type: 'error', light: '#f56c6c', dark: '#cc5e5e' },
    { type: 'info', light: '#909399', dark: '#606266' }
  ]
  // const arr = lighterLevelColor(color, [0.3, 0.5, 0.7, 0.8, 0.9], mode)
  // return arr.map(item=>{
  //   return {
  //     [prefix]: item
  //   }
  // })
}