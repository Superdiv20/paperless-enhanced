import { DisplayField, DisplayMode } from '../../../domains/documents/data';
import { FilterRule } from './filter-rule';
import { OwnedResource } from './permission';

export type SavedView = OwnedResource & {
  name?: string;

  show_on_dashboard?: boolean;

  show_in_sidebar?: boolean;

  sort_field: string;

  sort_reverse: boolean;

  filter_rules: FilterRule[];

  page_size?: number;

  display_mode?: DisplayMode;

  display_fields?: DisplayField[];
};
