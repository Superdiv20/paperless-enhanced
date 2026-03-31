// shared/models/permissions.model.ts
export type Permissions = {
  view: {
    users: number[];
    groups: number[];
  };
  change: {
    users: number[];
    groups: number[];
  };
}

export type OwnedResource = {
  owner?: number;
  permissions?: Permissions;
  user_can_change?: boolean;
  is_shared_by_requester?: boolean;
}
