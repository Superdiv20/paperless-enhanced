import {
  ALWAYS_VISIBLE_DISPLAY_FIELDS,
  DISPLAY_FIELD_PERMISSION_TOKENS,
  DisplayField,
} from '../models/document-display';

export function hasViewPermissionForTokens(
  permissions: string[],
  resourceTokens: string[],
): boolean {
  const permissionSet = new Set(
    permissions.map((permission) => permission.toLowerCase().split('.').pop()!),
  );

  return resourceTokens.some((token) => {
    const normalizedToken = token.toLowerCase();
    return (
      permissionSet.has(`view_${normalizedToken}`) ||
      permissionSet.has(`change_${normalizedToken}`)
    );
  });
}

export function canViewDisplayField(
  field: DisplayField,
  permissions: string[],
  isSuperuser: boolean,
): boolean {
  if (isSuperuser || ALWAYS_VISIBLE_DISPLAY_FIELDS.has(field)) {
    return true;
  }

  const tokens = DISPLAY_FIELD_PERMISSION_TOKENS[field];
  if (!tokens) {
    return true;
  }

  // If backend permissions are not available yet, keep fields visible.
  if (permissions.length === 0) {
    return true;
  }

  return hasViewPermissionForTokens(permissions, tokens);
}
