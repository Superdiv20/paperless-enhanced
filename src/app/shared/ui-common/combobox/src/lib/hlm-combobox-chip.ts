import type { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';
import { BrnComboboxChip } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';
import { HlmComboboxChipRemove } from './hlm-combobox-chip-remove';

@Component({
	selector: 'hlm-combobox-chip',
	imports: [NgIcon, HlmComboboxChipRemove],
	providers: [provideIcons({ lucideX })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnComboboxChip, inputs: ['value'] }],
	host: {
		'data-slot': 'combobox-chip',
		'[style.background-color]': 'color() ?? null',
		'[style.color]': 'textColor() ?? null',
	},
	template: `
		<ng-content />

		@if (showRemove()) {
			<button hlmComboboxChipRemove>
				<ng-icon name="lucideX" />
			</button>
		}
	`,
})
export class HlmComboboxChip {
	public readonly showRemove = input<boolean, BooleanInput>(true, { transform: booleanAttribute });
	public readonly color = input<string | undefined>(undefined);
	public readonly textColor = input<string | undefined>(undefined);

	constructor() {
		classes(
			() =>
				[
					'flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-sm px-1.5 text-xs font-medium whitespace-nowrap',
					'has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50',
					'has-data-[slot=combobox-chip-remove]:pr-0',
					!this.color() && 'bg-muted',
					!this.textColor() && 'text-foreground',
				].filter(Boolean).join(' '),
		);
	}
}

