# 如何优雅的用Markdown写作

> 「写作的本质是思维的外化，而 Markdown 让你专注于思想本身，而非格式。」

Markdown 是一种轻量级标记语言，用极简的符号实现优雅的排版。本文覆盖从基础到进阶的全部常用语法。

## 标题层级

标题使用 `#` 号表示，`#` 数量对应层级（1–6 级）。**标题与正文之间建议空一行**，`#` 后必须有一个空格。

**语法：**

```markdown
# 一级标题（页面主标题，每页只用一次）
## 二级标题（章节标题）
### 三级标题（小节标题）
#### 四级标题（细分内容）
##### 五级标题（较少使用）
###### 六级标题（极少使用）
```

**演示：**

### 三级标题示例

#### 四级标题示例

::: tip 最佳实践
一篇文档只使用一个 `#` 一级标题，正文内容从 `##` 二级标题开始组织，层级不建议超过四级，否则结构会显得繁琐。
:::

## 段落与换行

**段落**：两段文字之间空一行即可形成独立段落。

**换行**：在行尾添加**两个或以上空格**，然后回车，可以实现段落内换行。或者直接使用 `<br>` 标签。

**语法：**

```markdown
这是第一段内容，段落之间需要空一行。

这是第二段内容，与上段之间有空行间隔。

这是一行文字，行尾有两个空格  
这是紧接的下一行，实现了段落内换行。
```

**演示：**

这是第一段内容，段落之间需要空一行。

这是第二段内容，与上段之间有空行间隔。

这是一行文字，行尾有两个空格  
这是紧接的下一行，实现了段落内换行。

## 文字强调

通过符号包裹文字，可以实现加粗、斜体、删除线、行内代码、高亮等多种强调效果。

**语法：**

```markdown
**加粗文字**
__也是加粗文字__

*斜体文字*
_也是斜体文字_

***加粗并斜体***

~~删除线文字~~

`行内代码`

==高亮文字==（部分平台支持，如 VitePress）
```

**演示：**

| 效果 | 写法 | 结果 |
|------|------|------|
| 加粗 | `**文字**` | **这是加粗** |
| 斜体 | `*文字*` | *这是斜体* |
| 加粗斜体 | `***文字***` | ***加粗斜体*** |
| 删除线 | `~~文字~~` | ~~已删除内容~~ |
| 行内代码 | `` `代码` `` | `const x = 1` |

::: tip 最佳实践
- 加粗用于**关键词**和**重要结论**，不要大段使用
- 斜体适合书名、术语或需要轻微强调的词语
- 删除线适合记录修改痕迹或废弃内容
:::

## 列表

列表分为**无序列表**、**有序列表**和**嵌套列表**三种形式。

### 无序列表

使用 `-`、`*` 或 `+` 开头（建议统一使用 `-`）。

**语法：**

```markdown
- 第一项
- 第二项
- 第三项
```

**演示：**

- 苹果
- 香蕉
- 芒果

### 有序列表

使用数字加 `.` 开头，数字本身不影响实际渲染顺序（Markdown 会自动排序）。

**语法：**

```markdown
1. 第一步：安装依赖
2. 第二步：修改配置
3. 第三步：启动服务
```

**演示：**

1. 第一步：安装依赖
2. 第二步：修改配置
3. 第三步：启动服务

### 嵌套列表

子项缩进 **2 或 4 个空格**即可形成嵌套。

**语法：**

```markdown
- 前端技术
  - 框架
    - Vue
    - React
  - 样式
    - CSS
    - Tailwind
- 后端技术
  - Node.js
  - Go
```

**演示：**

- 前端技术
  - 框架
    - Vue
    - React
  - 样式
    - CSS
    - Tailwind
- 后端技术
  - Node.js
  - Go

## 引用块

使用 `>` 创建引用块，适合引用他人观点、标注注意事项或突出重要信息。支持多级嵌套。

**语法：**

```markdown
> 这是一段引用文字。

> 引用可以包含多个段落，
> 每行都加 `>` 即可。
>
> 空行也需要加 `>`。

> 一级引用
>
>> 二级引用（嵌套）
>>
>>> 三级引用

> **引用中也可以使用其他语法**
> - 列表项一
> - 列表项二
```

**演示：**

> 好的文档是对读者最大的尊重。

> 引用可以包含多个段落，
> 每行都加 `>` 即可。
>
> 空行也需要加 `>`。

> 一级引用
>
>> 二级引用（嵌套）
>>
>>> 三级引用

> **引用中也可以使用其他语法**
> - 列表项一
> - 列表项二

## 代码

代码展示分为**行内代码**和**代码块**两种。代码块支持语法高亮，只需在开头的三个反引号后标注语言名称。

### 行内代码

**语法：**

```markdown
使用 `npm install` 安装依赖，然后运行 `npm run dev` 启动项目。
```

**演示：**

使用 `npm install` 安装依赖，然后运行 `npm run dev` 启动项目。

### 代码块

**语法：**

````markdown
```javascript
const greet = (name) => {
  console.log(`Hello, ${name}!`)
}
greet('World')
```
````

**演示（常见语言）：**

```javascript
// JavaScript
const greet = (name) => {
  console.log(`Hello, ${name}!`)
}
greet('World')
```

```python
# Python
def greet(name: str) -> None:
    print(f"Hello, {name}!")

greet("World")
```

```bash
# Shell 命令
npm install
npm run docs:dev
```

```json
{
  "name": "my-docs",
  "version": "1.0.0",
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs"
  }
}
```

```css
/* CSS */
.container {
  display: flex;
  align-items: center;
  gap: 16px;
}
```

::: tip 常用语言标识符
`javascript` / `js`、`typescript` / `ts`、`python`、`bash` / `shell`、`json`、`css`、`html`、`markdown` / `md`、`sql`、`go`、`rust`、`yaml`
:::

## 链接与图片

### 链接

**语法：**

```markdown
<!-- 行内链接 -->
[链接文字](https://example.com)

<!-- 带 title 的链接（鼠标悬停显示提示） -->
[链接文字](https://example.com "这是提示文字")

<!-- 引用式链接（适合在正文中多次使用同一链接） -->
[链接文字][ref]

[ref]: https://example.com "可选的 title"

<!-- 直接显示链接地址 -->
<https://example.com>

<!-- 链接到页面内锚点 -->
[跳转到顶部](#如何优雅的用Markdown写作)
```

**演示：**

- [VitePress 官网](https://vitepress.dev "点击访问 VitePress")
- <https://github.com>
- [跳转到顶部](#如何优雅的用Markdown写作)

### 图片

图片语法与链接几乎相同，只是在最前面加一个 `!`，括号内的文字是 alt 属性（图片无法显示时的替代文字）。

**语法：**

```markdown
<!-- 基础图片 -->
![图片描述](图片URL)

<!-- 带 title 的图片 -->
![图片描述](图片URL "鼠标悬停提示")

<!-- 本地图片（相对路径） -->
![示意图](./images/screenshot.png)

<!-- 图片加链接（点击图片跳转） -->
[![图片描述](图片URL)](跳转链接)
```

**演示：**

![美羊羊](/images/yang.png "小绵羊")

[![喵](/images/heimao.png "跳转到百度")](https://www.baidu.com)

::: tip 最佳实践
图片建议统一存放在 `docs/public/images/` 目录下，引用时使用 `/images/xxx.png` 的绝对路径，避免相对路径在不同页面中出错。
:::

## 表格

表格用 `|` 分隔列，第二行用 `-` 定义分隔线，通过 `:` 控制对齐方式。

**语法：**

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容   |   内容   |   内容 |
| 左     |    中    |      右 |
```

**演示：**

| 语言 | 类型 | 适用场景 |
|:-----|:----:|--------:|
| JavaScript | 动态 | 前端 / 全栈 |
| TypeScript | 静态 | 大型项目 |
| Python | 动态 | 数据 / AI |
| Go | 静态 | 高并发后端 |
| Rust | 静态 | 系统编程 |

::: tip 最佳实践
- `-` 的数量不影响渲染，但保持对齐可以让源码更易读
- 表格内可以使用**加粗**、`代码`、[链接](#) 等行内语法
- 列数过多时，表格在移动端会出现横向滚动，适当精简列数
:::

## 分割线

使用三个或以上的 `-`、`*` 或 `_` 创建分割线，建议上下各空一行。

**语法：**

```markdown
---

***

___
```

**演示：**

上方内容

---

下方内容（三种写法效果相同，推荐统一使用 `---`）


## 任务列表

任务列表是 GitHub Flavored Markdown (GFM) 扩展语法，适合记录待办事项、功能进度等。

**语法：**

```markdown
- [x] 已完成的任务
- [ ] 未完成的任务
- [x] ~~已完成且废弃的任务~~
- [ ] 待办事项，支持 **加粗** 和 `代码`
```

**演示：**

- [x] 搭建 VitePress 项目
- [x] 配置导航栏与侧边栏
- [x] ~~~编写工具箱页面~~~
- [ ] 配置***Algolia*** 全文搜索
- [ ] 部署到`服务器`

## 脚注

脚注用于添加补充说明，不打断正文阅读流程，读者可按需查看。

**语法：**

```markdown
这是一段正文，其中某个词需要补充说明[^1]，另一处也有注释[^note]。

[^1]: 这是第一个脚注的内容，会显示在页面底部。
[^note]: 脚注标识符可以是数字或文字，渲染后统一显示为数字序号。
```

**演示：**

Markdown[^md] 由 John Gruber[^gruber] 于 2004 年创建，最初目标是让人们用易读易写的纯文本格式编写文档。

[^md]: Markdown 是一种轻量级标记语言，文件扩展名为 `.md`。
[^gruber]: John Gruber 是美国博主，Markdown 的发明者，同时也是知名科技博客 Daring Fireball 的作者。

## 数学公式

VitePress 通过插件支持 LaTeX 数学公式，行内公式用 `$` 包裹，块级公式用 `$$` 包裹。

**启用方式（需安装插件）：**

```bash
npm add -D markdown-it-mathjax3
```

```ts
// config.mts
export default defineConfig({
  markdown: {
    math: true
  }
})
```

**语法：**

```markdown
<!-- 行内公式 -->
质能方程：$E = mc^2$

<!-- 块级公式 -->
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

<!-- 矩阵 -->
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$
```

**演示：**

质能方程：$E = mc^2$，其中 $c$ 为光速常量 $\approx 3 \times 10^8 \text{ m/s}$。

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

## Emoji

直接粘贴 Emoji 表情符号，或使用 `:emoji名称:` 语法（部分平台支持）。

**语法：**

```markdown
<!-- 直接插入，所有平台支持 -->
✅ 任务完成   ⚠️ 注意事项   🚀 快速开始   💡 小技巧

<!-- 短代码语法（GitHub、部分 MD 编辑器支持） -->
:rocket: :white_check_mark: :warning: :bulb:
```

**演示：**

📝 笔记记录   🔧 工具配置   📦 依赖安装   🎨 样式调整  
⚡ 性能优化   🔒 安全加固   🌍 国际化    ✨ 新功能

## HTML 内嵌

Markdown 支持直接内嵌 HTML，用于实现原生 Markdown 无法表达的排版效果。

**语法：**

```markdown
<!-- 文字颜色 -->
<span style="color: #6c8fff">蓝色文字</span>

<!-- 居中对齐 -->
<div align="center">居中显示的内容</div>

<!-- 折叠内容 -->
<details>
<summary>点击展开详情</summary>

这里是折叠隐藏的内容，展开后才能看到。
支持在内部继续使用 Markdown 语法。

</details>

<!-- 键盘按键样式 -->
使用 <kbd>Ctrl</kbd> + <kbd>C</kbd> 复制内容。
```

**演示：**

<span style="color: #6c8fff">**这是蓝色加粗文字**</span>，用于特殊场景下的颜色标注。

<details>
<summary>📖 点击展开：VitePress 项目结构说明</summary>

```
docs/
├── .vitepress/
│   ├── config.mts     # 全局配置
│   └── theme/
│       ├── index.ts   # 主题入口
│       └── style.css  # 自定义样式
├── guide/             # 教程文章
├── faq/               # 常见问题
├── public/            # 静态资源
│   └── images/
├── index.md           # 首页
└── tool.md            # 工具箱
```

</details>

按下 <kbd>Ctrl</kbd> + <kbd>K</kbd> 打开快速搜索，按 <kbd>Esc</kbd> 关闭。

## VitePress 专属语法

以下为 VitePress 在标准 Markdown 之外提供的扩展语法。

### 提示容器

```markdown
::: info 信息
这是一条普通提示信息。
:::

::: tip 技巧
这是一条操作建议或最佳实践。
:::

::: warning 注意
这是一条需要注意的警告信息。
:::

::: danger 危险
这是一条可能造成损失的危险提示。
:::

::: details 点击查看
这是折叠内容，默认隐藏。
:::
```

**演示：**

::: info 信息
这是一条普通提示信息，用于补充说明。
:::

::: tip 技巧
善用提示容器可以在不打断正文节奏的前提下，突出重要信息。
:::

::: warning 注意
修改配置文件后，需要重启开发服务器才能生效。
:::

::: danger 危险
不要将 API Key、密码等敏感信息提交到 Git 仓库。
:::

::: details 展开查看完整代码
```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的文档',
  description: '一个用 VitePress 搭建的文档站',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
    ],
  },
})
```
:::

### 代码块行高亮

````markdown
```javascript{2,4-6}
const a = 1        // 普通行
const b = 2        // 第 2 行高亮
const c = 3        // 普通行
const d = 4        // 第 4-6 行高亮
const e = 5        // 高亮
const f = 6        // 高亮
```
````

**演示：**

```javascript{2,4-6}
const a = 1
const b = 2
const c = 3
const d = 4
const e = 5
const f = 6
```

### 代码组（Tab 切换）

````markdown
::: code-group

```bash [npm]
npm install vitepress
```

```bash [pnpm]
pnpm add vitepress
```

```bash [yarn]
yarn add vitepress
```

:::
````

**演示：**

::: code-group

```bash [npm]
npm install vitepress
```

```bash [pnpm]
pnpm add vitepress
```

```bash [yarn]
yarn add vitepress
```

:::

> [!TIP] 
> 更多VitePress语法参考：<https://vitepress.dev/zh/guide/markdown>

## 写作建议

经过对以上所有语法的梳理，总结几条让 Markdown 文档更优雅的写作原则。

**结构清晰优先。** 动笔前先规划文档的层级结构，标题是读者快速定位内容的索引，比花哨的格式更重要。

**克制使用强调。** 加粗、斜体、高亮的效果来源于稀缺性，如果全篇到处都是强调，反而失去了强调的意义。

**代码必须高亮。** 任何代码片段，无论长短，都应使用代码块并标注语言，不仅美观，也方便复制。

**善用提示容器。** VitePress 的 `tip`、`warning`、`danger` 容器是引导读者注意力的利器，将关键提示从正文中分离出来，会让文档层次感更强。

**图文配合叙述。** 对于复杂的流程或架构，文字描述往往不如一张图直观。在合适的位置插入截图或流程图，可以大幅降低读者的理解成本。

**保持一致的风格。** 在整篇文档中统一列表符号（只用 `-`）、统一标题层级的使用方式、统一代码块的缩进风格，一致性本身就是一种美感。
