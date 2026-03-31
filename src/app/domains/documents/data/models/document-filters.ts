export type DatePreset = 'today' | 'yesterday' | '7days' | '30days' | '1year';

export function dateRangeForPreset(preset: DatePreset): { from: string; to: string } {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().split('T')[0];

  if (preset === 'today') {
    const f = fmt(today);
    return { from: f, to: f };
  }
  if (preset === 'yesterday') {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const f = fmt(yesterday);
    return { from: f, to: f };
  }
  const from = new Date(today);
  const days = preset === '7days' ? 7 : preset === '30days' ? 30 : 365;
  from.setDate(from.getDate() - days);
  return { from: fmt(from), to: fmt(today) };
}

export interface DateFilterState {
  preset: DatePreset | null;
  from: string | null; // ISO date string YYYY-MM-DD
  to: string | null; // ISO date string YYYY-MM-DD
}

export interface DocumentFilters {
  tags: {
    mode: 'all' | 'any';
    ids: number[];
  };
  correspondents: {
    mode: 'include' | 'exclude';
    ids: number[];
  };
  documentTypes: {
    mode: 'include' | 'exclude';
    ids: number[];
  };
  storagePaths: {
    mode: 'include' | 'exclude';
    ids: number[];
  };
  createdDate: DateFilterState;
  addedDate: DateFilterState;
}

export const initialDocumentFilters: DocumentFilters = {
  tags: { mode: 'all', ids: [] },
  correspondents: { mode: 'include', ids: [] },
  documentTypes: { mode: 'include', ids: [] },
  storagePaths: { mode: 'include', ids: [] },
  createdDate: { preset: null, from: null, to: null },
  addedDate: { preset: null, from: null, to: null },
};
