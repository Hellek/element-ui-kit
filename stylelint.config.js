module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		indentation: 'tab',
		linebreaks: 'unix',
		'no-empty-first-line': true,
		'selector-list-comma-newline-after': 'always-multi-line',
		'declaration-block-trailing-semicolon': null,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'function',
					'if',
					'else',
					'each',
					'for',
					'include',
					'mixin',
				],
			},
		],
	},
}