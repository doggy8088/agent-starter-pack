import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Agent Starter Pack',
  description: '使用 Agent Starter Pack 更快打造生產級 AI 代理人',
  base: '/agent-starter-pack/',
  head: [
    ['meta', {property: 'og:image', content: '/images/agent_starter_pack_screenshot.png'}],
    ['meta', {property: 'og:twitter:image', content: '/images/agent_starter_pack_screenshot.png'}],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap', rel: 'stylesheet' }],
    ['style', {}, `
      :root {
        --vp-font-family-base: 'Roboto', sans-serif;
        --vp-font-family-mono: 'Roboto Mono', monospace;
        --vp-c-text-1: 0.9rem;
        --vp-font-size-base: 0.9rem;
      }
    `]
  ],

  themeConfig: {
    nav: [
      { text: '首頁', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: '代理', link: '/agents/overview' },
      { text: 'CLI', link: '/cli/index.md' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速開始', link: '/guide/getting-started' },
          { text: '開發指南', link: '/guide/development-guide' },
          { text: '為什麼選擇 Starter Pack？', link: '/guide/why_starter_pack' },
          { text: '影片教學', link: '/guide/video-tutorials' },
          { text: '安裝', link: '/guide/installation' },
          { text: '部署', link: '/guide/deployment' },
          { text: '資料導入', link: '/guide/data-ingestion' },
          { text: '可觀察性', link: '/guide/observability' },
          { text: '疑難排解', link: '/guide/troubleshooting' }
        ]
      },
      {
        text: '代理',
        items: [
          { text: '總覽', link: '/agents/overview' },

        ]
      },
      {
        text: 'CLI 參考',
        items: [
          { text: 'create', link: '/cli/create' },
          { text: 'setup-cicd', link: '/cli/setup_cicd' }
        ]
      }
    ],
    socialLinks: [
      { 
        icon: 'github',
        link: 'https://github.com/GoogleCloudPlatform/agent-starter-pack' 
      },
    ],
    search: {
      provider: 'local'
    },

    footer: {
      message: '以 Apache 2.0 授權條款釋出。'
    }
  }
})
