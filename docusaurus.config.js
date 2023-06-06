// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'RSDD',
  tagline: 'Rust Decision Diagrams',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://neuppl.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/rsdd-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'neuppl', // Usually your GitHub org/user name.
  projectName: 'rsdd-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/neuppl/rsdd-docs/tree/main/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    './plugins/tailwind',
    './plugins/wasm-webpack',
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/rsdd-social-card.png',
      navbar: {
        title: 'RSDD',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'User Docs',
          },
          {
            href: 'https://neuppl.github.io/rsdd/rsdd/',
            label: 'API Docs',
            position: 'left'
          },
          {
            href: 'https://github.com/neuppl/rsdd',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
              {
                label: 'Tutorial - Basics',
                to: '/docs/category/tutorial-basics',
              },
            ],
          },
          {
            title: 'External Resources',
            items: [
              {
                label: 'RSDD Repository',
                to: 'https://github.com/neuppl/rsdd',
              },
              {
                label: 'Docs Repository',
                to: 'https://github.com/neuppl/rsdd-docs'
              }
            ],
          },
        ],
        copyright: `Developed at Northeastern Probabilistic Programming Laboratory. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['toml', 'rust'],
      },
    }),
};

module.exports = config;
