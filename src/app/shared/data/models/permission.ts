// shared/models/permissions.model.ts
export interface Permissions {
  view: {
    users: number[];
    groups: number[];
  };
  change: {
    users: number[];
    groups: number[];
  };
}

export interface OwnedResource {
  owner?: number;
  permissions?: Permissions;
  user_can_change?: boolean;
  is_shared_by_requester?: boolean;
}
