module.exports = {
  title: 'Nodos',
  tagline: 'Node.js framework for humans (inspired by Rails, Phoenix, Django)',
  url: 'https://nodosjs.github.io',
  baseUrl: '/nodosjs.github.io/',
  favicon: 'img/favicon.ico',
  organizationName: 'nodosjs', // Usually your GitHub org/user name.
  projectName: 'nodosjs.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Nodos',
      logo: {
        alt: 'Nodos Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/getting_started',
          activeBasePath: 'docs',
          label: 'Guides',
          position: 'left',
        },
        {
          href: 'https://nodosjs.github.io/nodos/',
          label: 'API',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/nodosjs/nodos',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Nodos, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/nodosjs/nodos/tree/master/site',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/nodosjs/nodos/tree/master/site/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
