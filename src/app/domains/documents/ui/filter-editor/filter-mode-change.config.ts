import { WritableSignal } from '@angular/core';

export interface ModeChangeConfig {
  ruleTypes: number[];
  includeRuleType: number;
  excludeRuleType: number;
  modeSignal: WritableSignal<'include' | 'exclude'>;
}
