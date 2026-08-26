import { User } from './user';

export type AppSettings = {
  user: User;
  settings: Record<string, unknown>;
  permissions: string[];
};

export type AppSettingType = 'string' | 'boolean' | 'number' | 'array' | 'object';

export type AppSettingCategory =
  | 'system'
  | 'ui'
  | 'document'
  | 'notifications'
  | 'saved-views'
  | 'permissions'
  | 'integration'
  | 'features';

export type AppSetting = {
  key: string;
  type: AppSettingType;
  default: unknown;
  category: AppSettingCategory;
};

export enum GlobalSearchType {
  ADVANCED = 'advanced',
  TITLE_CONTENT = 'title-content',
}

export enum CollapsibleSection {
  ATTRIBUTES = 'attributes',
}

export const PAPERLESS_GREEN_HEX = '#17541f';

export const APP_SETTINGS_KEYS = {
  VERSION: 'version',
  LANGUAGE: 'language',
  APP_LOGO: 'app_logo',
  APP_TITLE: 'app_title',
  // Maintain old general-settings path for backwards compatibility.
  BULK_EDIT_CONFIRMATION_DIALOGS:
    'general-settings:bulk-edit:confirmation-dialogs',
  BULK_EDIT_APPLY_ON_CLOSE: 'general-settings:bulk-edit:apply-on-close',
  DOCUMENT_LIST_SIZE: 'general-settings:documentListSize',
  DARK_MODE_USE_SYSTEM: 'general-settings:dark-mode:use-system',
  DARK_MODE_ENABLED: 'general-settings:dark-mode:enabled',
  DARK_MODE_THUMB_INVERTED: 'general-settings:dark-mode:thumb-inverted',
  THEME_COLOR: 'general-settings:theme:color',
  USE_NATIVE_PDF_VIEWER: 'general-settings:document-details:native-pdf-viewer',
  PDF_VIEWER_ZOOM_SETTING:
    'general-settings:document-details:pdf-viewer-zoom-setting',
  DATE_LOCALE: 'general-settings:date-display:date-locale',
  DATE_FORMAT: 'general-settings:date-display:date-format',
  NOTIFICATIONS_CONSUMER_NEW_DOCUMENT:
    'general-settings:notifications:consumer-new-documents',
  NOTIFICATIONS_CONSUMER_SUCCESS:
    'general-settings:notifications:consumer-success',
  NOTIFICATIONS_CONSUMER_FAILED: 'general-settings:notifications:consumer-failed',
  NOTIFICATIONS_CONSUMER_SUPPRESS_ON_DASHBOARD:
    'general-settings:notifications:consumer-suppress-on-dashboard',
  NOTES_ENABLED: 'general-settings:notes-enabled',
  AUDITLOG_ENABLED: 'general-settings:auditlog-enabled',
  SLIM_SIDEBAR: 'general-settings:slim-sidebar',
  ATTRIBUTES_SECTIONS_COLLAPSED:
    'general-settings:attributes-sections-collapsed',
  UPDATE_CHECKING_ENABLED: 'general-settings:update-checking:enabled',
  UPDATE_CHECKING_BACKEND_SETTING:
    'general-settings:update-checking:backend-setting',
  SAVED_VIEWS_WARN_ON_UNSAVED_CHANGE:
    'general-settings:saved-views:warn-on-unsaved-change',
  DASHBOARD_VIEWS_VISIBLE_IDS:
    'general-settings:saved-views:dashboard-views-visible-ids',
  SIDEBAR_VIEWS_VISIBLE_IDS:
    'general-settings:saved-views:sidebar-views-visible-ids',
  DASHBOARD_VIEWS_SORT_ORDER:
    'general-settings:saved-views:dashboard-views-sort-order',
  SIDEBAR_VIEWS_SORT_ORDER: 'general-settings:saved-views:sidebar-views-sort-order',
  SIDEBAR_VIEWS_SHOW_COUNT: 'general-settings:saved-views:sidebar-views-show-count',
  TOUR_COMPLETE: 'general-settings:tour-complete',
  OBJECT_LIST_SIZES: 'general-settings:object-list-sizes',
  DEFAULT_PERMS_OWNER: 'general-settings:permissions:default-owner',
  DEFAULT_PERMS_VIEW_USERS: 'general-settings:permissions:default-view-users',
  DEFAULT_PERMS_VIEW_GROUPS: 'general-settings:permissions:default-view-groups',
  DEFAULT_PERMS_EDIT_USERS: 'general-settings:permissions:default-edit-users',
  DEFAULT_PERMS_EDIT_GROUPS: 'general-settings:permissions:default-edit-groups',
  DOCUMENT_EDITING_REMOVE_INBOX_TAGS:
    'general-settings:document-editing:remove-inbox-tags',
  DOCUMENT_EDITING_OVERLAY_THUMBNAIL:
    'general-settings:document-editing:overlay-thumbnail',
  DOCUMENT_DETAILS_HIDDEN_FIELDS: 'general-settings:document-details:hidden-fields',
  SEARCH_DB_ONLY: 'general-settings:search:db-only',
  SEARCH_FULL_TYPE: 'general-settings:search:more-link',
  PDF_EDITOR_DEFAULT_EDIT_MODE:
    'general-settings:document-editing:default-edit-mode',
  EMPTY_TRASH_DELAY: 'trash_delay',
  GMAIL_OAUTH_URL: 'gmail_oauth_url',
  OUTLOOK_OAUTH_URL: 'outlook_oauth_url',
  EMAIL_ENABLED: 'email_enabled',
  AI_ENABLED: 'ai_enabled',
} as const;

export const APP_SETTINGS: AppSetting[] = [
  {
    key: APP_SETTINGS_KEYS.VERSION,
    type: 'string',
    default: '',
    category: 'system',
  },
  {
    key: APP_SETTINGS_KEYS.LANGUAGE,
    type: 'string',
    default: '',
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.BULK_EDIT_CONFIRMATION_DIALOGS,
    type: 'boolean',
    default: true,
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.BULK_EDIT_APPLY_ON_CLOSE,
    type: 'boolean',
    default: false,
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.SLIM_SIDEBAR,
    type: 'boolean',
    default: false,
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.ATTRIBUTES_SECTIONS_COLLAPSED,
    type: 'array',
    default: [],
    category: 'document',
  },
  {
    key: APP_SETTINGS_KEYS.DOCUMENT_LIST_SIZE,
    type: 'number',
    default: 50,
    category: 'document',
  },
  {
    key: APP_SETTINGS_KEYS.DARK_MODE_USE_SYSTEM,
    type: 'boolean',
    default: true,
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.DARK_MODE_ENABLED,
    type: 'boolean',
    default: false,
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.DARK_MODE_THUMB_INVERTED,
    type: 'boolean',
    default: true,
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.THEME_COLOR,
    type: 'string',
    default: '',
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.USE_NATIVE_PDF_VIEWER,
    type: 'boolean',
    default: false,
    category: 'document',
  },
  {
    key: APP_SETTINGS_KEYS.DATE_LOCALE,
    type: 'string',
    default: '',
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.DATE_FORMAT,
    type: 'string',
    default: 'mediumDate',
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.NOTIFICATIONS_CONSUMER_NEW_DOCUMENT,
    type: 'boolean',
    default: true,
    category: 'notifications',
  },
  {
    key: APP_SETTINGS_KEYS.NOTIFICATIONS_CONSUMER_SUCCESS,
    type: 'boolean',
    default: true,
    category: 'notifications',
  },
  {
    key: APP_SETTINGS_KEYS.NOTIFICATIONS_CONSUMER_FAILED,
    type: 'boolean',
    default: true,
    category: 'notifications',
  },
  {
    key: APP_SETTINGS_KEYS.NOTIFICATIONS_CONSUMER_SUPPRESS_ON_DASHBOARD,
    type: 'boolean',
    default: true,
    category: 'notifications',
  },
  {
    key: APP_SETTINGS_KEYS.NOTES_ENABLED,
    type: 'boolean',
    default: true,
    category: 'features',
  },
  {
    key: APP_SETTINGS_KEYS.AUDITLOG_ENABLED,
    type: 'boolean',
    default: true,
    category: 'features',
  },
  {
    key: APP_SETTINGS_KEYS.UPDATE_CHECKING_ENABLED,
    type: 'boolean',
    default: false,
    category: 'system',
  },
  {
    key: APP_SETTINGS_KEYS.UPDATE_CHECKING_BACKEND_SETTING,
    type: 'string',
    default: '',
    category: 'system',
  },
  {
    key: APP_SETTINGS_KEYS.SAVED_VIEWS_WARN_ON_UNSAVED_CHANGE,
    type: 'boolean',
    default: true,
    category: 'saved-views',
  },
  {
    key: APP_SETTINGS_KEYS.TOUR_COMPLETE,
    type: 'boolean',
    default: false,
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.OBJECT_LIST_SIZES,
    type: 'object',
    default: {
      correspondents: 25,
      document_types: 25,
      tags: 25,
      storage_paths: 25,
    },
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.DEFAULT_PERMS_OWNER,
    type: 'number',
    default: undefined,
    category: 'permissions',
  },
  {
    key: APP_SETTINGS_KEYS.DEFAULT_PERMS_VIEW_USERS,
    type: 'array',
    default: [],
    category: 'permissions',
  },
  {
    key: APP_SETTINGS_KEYS.DEFAULT_PERMS_VIEW_GROUPS,
    type: 'array',
    default: [],
    category: 'permissions',
  },
  {
    key: APP_SETTINGS_KEYS.DEFAULT_PERMS_EDIT_USERS,
    type: 'array',
    default: [],
    category: 'permissions',
  },
  {
    key: APP_SETTINGS_KEYS.DEFAULT_PERMS_EDIT_GROUPS,
    type: 'array',
    default: [],
    category: 'permissions',
  },
  {
    key: APP_SETTINGS_KEYS.DASHBOARD_VIEWS_VISIBLE_IDS,
    type: 'array',
    default: [],
    category: 'saved-views',
  },
  {
    key: APP_SETTINGS_KEYS.SIDEBAR_VIEWS_VISIBLE_IDS,
    type: 'array',
    default: [],
    category: 'saved-views',
  },
  {
    key: APP_SETTINGS_KEYS.DASHBOARD_VIEWS_SORT_ORDER,
    type: 'array',
    default: [],
    category: 'saved-views',
  },
  {
    key: APP_SETTINGS_KEYS.SIDEBAR_VIEWS_SORT_ORDER,
    type: 'array',
    default: [],
    category: 'saved-views',
  },
  {
    key: APP_SETTINGS_KEYS.SIDEBAR_VIEWS_SHOW_COUNT,
    type: 'boolean',
    default: true,
    category: 'saved-views',
  },
  {
    key: APP_SETTINGS_KEYS.APP_LOGO,
    type: 'string',
    default: '',
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.APP_TITLE,
    type: 'string',
    default: '',
    category: 'ui',
  },
  {
    key: APP_SETTINGS_KEYS.DOCUMENT_EDITING_REMOVE_INBOX_TAGS,
    type: 'boolean',
    default: false,
    category: 'document',
  },
  {
    key: APP_SETTINGS_KEYS.DOCUMENT_EDITING_OVERLAY_THUMBNAIL,
    type: 'boolean',
    default: true,
    category: 'document',
  },
  {
    key: APP_SETTINGS_KEYS.DOCUMENT_DETAILS_HIDDEN_FIELDS,
    type: 'array',
    default: [],
    category: 'document',
  },
  {
    key: APP_SETTINGS_KEYS.SEARCH_DB_ONLY,
    type: 'boolean',
    default: false,
    category: 'document',
  },
  {
    key: APP_SETTINGS_KEYS.SEARCH_FULL_TYPE,
    type: 'string',
    default: GlobalSearchType.TITLE_CONTENT,
    category: 'document',
  },
  {
    key: APP_SETTINGS_KEYS.EMPTY_TRASH_DELAY,
    type: 'number',
    default: 30,
    category: 'system',
  },
  {
    key: APP_SETTINGS_KEYS.GMAIL_OAUTH_URL,
    type: 'string',
    default: null,
    category: 'integration',
  },
  {
    key: APP_SETTINGS_KEYS.OUTLOOK_OAUTH_URL,
    type: 'string',
    default: null,
    category: 'integration',
  },
  {
    key: APP_SETTINGS_KEYS.EMAIL_ENABLED,
    type: 'boolean',
    default: false,
    category: 'integration',
  },
  {
    key: APP_SETTINGS_KEYS.PDF_VIEWER_ZOOM_SETTING,
    type: 'string',
    default: 'page-width',
    category: 'document',
  },
  {
    key: APP_SETTINGS_KEYS.AI_ENABLED,
    type: 'boolean',
    default: false,
    category: 'features',
  },
  {
    key: APP_SETTINGS_KEYS.PDF_EDITOR_DEFAULT_EDIT_MODE,
    type: 'string',
    default: 'create',
    category: 'document',
  },
];

// Candidate settings for future removal once all consumers are migrated.
export const DEPRECATED_APP_SETTINGS_KEYS: Array<
  (typeof APP_SETTINGS_KEYS)[keyof typeof APP_SETTINGS_KEYS]
> = [APP_SETTINGS_KEYS.SLIM_SIDEBAR];

// Backwards-compatible aliases for older naming.
export type UiSettings = AppSettings;
export type UiSetting = AppSetting;
export const SETTINGS_KEYS = APP_SETTINGS_KEYS;
export const SETTINGS = APP_SETTINGS;
