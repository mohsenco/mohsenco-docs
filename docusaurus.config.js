module.exports = {
  title: 'Mohsen Mottaghi',
  tagline: 'DevOps and Cloud engineer',
  url: 'https://docs.mohsen.co',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'MOHSEN', // Usually your GitHub org/user name.
  projectName: 'mohsenco-website', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Mohsen',
      logo: {
        alt: 'MOHSEN Logo',
        // src: 'img/logo.svg',
        src: 'img/mohsen-logo-blue.png',
      },
      links: [
        {
          href: 'https://mohsen.co',
          label: 'Home',
          position: 'left',
        },
        {
          to: 'docs/index',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // {
        //   to: 'blog', 
        //   label: 'Blog', 
        //   position: 'left'
        // },
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            // {
            //   label: 'Style Guide',
            //   to: 'docs/doc1',
            // },
            // {
            //   label: 'Second Doc',
            //   to: 'docs/doc2',
            // },
          ],
        },
        {
          title: 'Links',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions',
            // },
            // {
            //   label: 'Discord',
            //   href: 'https://discordapp.com',
            // },
          ],
        },
        {
          title: 'Social',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/mohsenmottaghi',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/motmohsen',
            },
            {
              label: 'Instagram',
              href: 'https://instagram.com/mohsenmottaghi_',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/mohsenmottaghi',
            },
          ],
        },
      ],
      // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      copyright: `Copyright © ${new Date().getFullYear()} MOHSEN`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/mohsenco/mohsendocs.github.io',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
