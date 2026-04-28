import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  // 网页标题favicon
  head: [['link', { rel: 'icon', href: '/images/yang.png' }]],

  // 网站标题和描述
  title: 'BoatZhou的Wiki',
  description: '项目、经验、笔记、资源，永远对世界保持好奇的斜杠青年',

  // Markdown配置
  markdown: {
    math: true,
    image: {
      lazyLoading: true,
    },
  },

  themeConfig: {

    // 网站logo
    logo: '/images/yang.png',
    // 网站标题
    siteTitle: 'BOATZHOU',

    // 导航栏
    nav: [
      { text: '经验', link: '/experience/markdown-guide' },
      { text: '教程', link: '/course/' },
      { text: '工具', link: '/tools/tool' },
    ],

    // 侧边栏
    sidebar: {
      '/course/': [
        {
          text: '代理工具',
          collapsed: true,
          items: [
            { text: 'Flclash', link: '/course/proxy/flclash' },
            { text: 'ShadowRocket', link: '/course/proxy/shadowrocket' },
          ]
        },
        {
          text: '人工智能',
          collapsed: false,
          items: [
            { text: '部署OpenClaw', link: '/course/ai/openClaw' },
          ]
        },
      ],
      '/experience/': [
        {
          text: 'Markdown',
          items: [
            { text: '优雅的写出MD', link: '/experience/markdown-guide' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具',
          items: [
            { text: '常用小工具', link: '/tools/tool' }
          ]
        }
      ]
    },

    // 社交图标
    socialLinks: [
      { icon: 'github', link: 'https://github.com/boatzhou1024' },
      { icon: 'telegram', link: 'https://t.me/boatzhou666' }
    ],

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    // 文章页脚
    docFooter: {
      prev: false,
      next: false
    },

    // 移动端侧边栏菜单
    sidebarMenuLabel: '菜单',

    // 移动端目录返回顶部
    returnToTopLabel: '返回顶部',

    // 显示外部链接图标
    externalLinkIcon: true,

    // 文章树目录
    outlineTitle: '目录',
    outline: [2, 6],
    

    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: '想找什么？要不问问我？',
            buttonAriaLabel: '搜索',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清空',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    // 页脚
    footer: {
      copyright: 'Copyright © 2026-Present BoatZhou'
    }
  }
})
