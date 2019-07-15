module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/recommended',
		'@vue/airbnb',
	],
	rules: {
		'vue/html-indent': [
			'error',
			'tab',
			{},
		],
		'vue/html-closing-bracket-spacing': [
			'error',
			{
				selfClosingTag: 'never',
			},
		],
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 2,
			},
		],
		'vue/multiline-html-element-content-newline': [
			'error',
			{
				ignores: [
					'pre',
					'textarea',
					'el-button',
					'el-tag',
					'el-radio',
					'el-radio-button',
					'router-link',
					'a',
					'em',
					'i',
					'label',
					'small',
					'span',
					'strong',
					'sub',
					'sup',
				],
			},
		],
		'vue/singleline-html-element-content-newline': [
			'error',
			{
				ignores: [
					'pre',
					'textarea',
					'template',
					'el-button',
					'el-tag',
					'el-radio',
					'el-radio-button',
					'router-link',
					'a',
					'em',
					'i',
					'label',
					'small',
					'span',
					'strong',
					'sub',
					'sup',
				],
			},
		],
		'max-len': 'off',
		'linebreak-style': [
			'error',
			'unix',
		],
		radix: [
			'error',
			'as-needed',
		],
		'func-names': 'off',
		'object-curly-newline': [
			'error',
			{
				ObjectPattern: {
					consistent: true,
				},
			},
		],
		'arrow-parens': [
			'error',
			'as-needed',
		],
		indent: [
			'error',
			'tab',
		],
		'no-tabs': [
			'error',
			{
				allowIndentationTabs: true,
			},
		],
		quotes: [
			'error',
			'single',
			{
				allowTemplateLiterals: true,
			},
		],
		semi: [
			'error',
			'never',
		],
		'no-param-reassign': [
			'error',
			{
				props: false,
			},
		],
		'no-plusplus': [
			'error',
			{
				allowForLoopAfterthoughts: true,
			},
		],
		'eol-last': [
			'warn',
			'never',
		],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'ignore',
			},
		],
		'newline-per-chained-call': [
			'error',
			{
				ignoreChainWithDepth: 4,
			},
		],
		'import/extensions': [
			'warn',
			'ignorePackages',
		],
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
}