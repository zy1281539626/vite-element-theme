# element-plus 主题修改方案

## 1. 覆盖 element scss 变量，使用 vite 配置 additionalData

- 主题颜色只能写死，只配置一次，不能动态修改

```js
// element.scss 覆盖变量
@forward "element-plus/theme-chalk/src/common/var.scss" with
(
    // do not use same name, it will override.
    $colors: $--colors,
    $button-padding-horizontal: ("default": 50px)
);

// vite配置
css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/theme/element.scss" as *;`,
      },
    },
},
```

## 2. 覆盖 :root css 变量 (覆盖的样式会全部显示在 html 标签上)

- 可动态修改 root 变量，需要计算相关的颜色值

```js
import { useCssVar } from "@vueuse/core";
const color = useCssVar("--el-color-primary");
color.value = "red";
// 这里只修改了primary-color的一种颜色，其他颜色要算
```

## 3. vite 配置可修改颜色值，编译后替换 css

借助插件 viteThemePlugin （vben antd）

- vite 配置 element 原来可修改的相关颜色值数组
- 也可配置自定义的值
