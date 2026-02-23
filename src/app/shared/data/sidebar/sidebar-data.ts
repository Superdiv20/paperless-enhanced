export const sidebarData = {
  user: {
    name: 'demo',
    email: 'demo@paperless.local',
    avatar: '/assets/avatar.png',
  },
  navDocuments: {
    title: 'Documents',
    url: '/documents',
    icon: 'lucideFileText',
  },

  navLibrary: [
    {
      title: 'Library',
      url: '/library',
      icon: 'lucideFolder',
      items: [
        {
          title: 'All Documents',
          url: '/documents',
        },
        {
          title: 'Inbox',
          url: '/documents/inbox',
        },
        {
          title: 'Trash',
          url: '/documents/trash',
        },
      ],
    },
  ],
  navSavedViews: [], // populated dynamically from /api/saved_views/
  navOrganize: [
    {
      title: 'Organize',
      url: '.',
      icon: 'lucideTag',
      items: [
        {
          title: 'Tags',
          url: '/tags',
        },
        {
          title: 'Correspondents',
          url: '/correspondents',
        },
        {
          title: 'Document Types',
          url: '/document-types',
        },
        {
          title: 'Storage Paths',
          url: '/storage-paths',
        },
        {
          title: 'Custom Fields',
          url: '/custom-fields',
        },
      ],
    },
  ],
  navAutomation: [
    {
      title: 'Automation',
      url: '.',
      icon: 'lucideWorkflow',
      items: [
        {
          title: 'Workflows',
          url: '/workflows',
        },
        {
          title: 'Mail',
          url: '/mail',
        },
      ],
    },
  ],
  navAdministration: [
    {
      title: 'Administration',
      url: '/administration',
      icon: 'lucideSettings2',
      items: [
        {
          title: 'Users & Groups',
          url: '/administration/users',
        },
        {
          title: 'Settings',
          url: '/administration/settings',
        },
        {
          title: 'Configuration',
          url: '/administration/configuration',
        },
        {
          title: 'File Tasks',
          url: '/administration/file-tasks',
        },
        {
          title: 'Logs',
          url: '/administration/logs',
        },
      ],
    },
  ],
};
