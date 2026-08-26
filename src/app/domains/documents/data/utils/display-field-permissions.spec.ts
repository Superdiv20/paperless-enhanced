import {
  canViewDisplayField,
  hasViewPermissionForTokens,
} from './display-field-permissions';
import { DisplayField } from '../models/document-display';

describe('display-field-permissions', () => {
  it('matches exact Django codenames', () => {
    expect(hasViewPermissionForTokens(['view_tag'], ['tag'])).toBeTrue();
    expect(hasViewPermissionForTokens(['change_tag'], ['tag'])).toBeTrue();
  });

  it('supports dotted app labels from backend', () => {
    expect(hasViewPermissionForTokens(['documents.view_note'], ['note'])).toBeTrue();
  });

  it('does not match partial permission names', () => {
    expect(hasViewPermissionForTokens(['view_userobjectpermission'], ['user'])).toBeFalse();
  });

  it('always allows superusers', () => {
    expect(canViewDisplayField(DisplayField.OWNER, [], true)).toBeTrue();
  });

  it('always allows baseline fields even without permissions', () => {
    expect(canViewDisplayField(DisplayField.TITLE, [], false)).toBeTrue();
  });

  it('requires explicit permissions for restricted fields when permission list exists', () => {
    expect(canViewDisplayField(DisplayField.OWNER, ['view_tag'], false)).toBeFalse();
    expect(canViewDisplayField(DisplayField.OWNER, ['view_user'], false)).toBeTrue();
  });
});
