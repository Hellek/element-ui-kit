<template>
	<el-input
		v-bind="$attrs"
		:value="formattedPhone"
		v-on="listeners"
		@input="handleInput"
	/>
</template>

<script>
// TODO удалить, оставить, изменить?
export default {
	name: 'ItInputPhone',
	props: {
		value: {
			type: String,
			default: '',
		},
		format: {
			type: String,
			required: true,
			default: 'ru',
		},
	},
	data() {
		return {
			formats: {
				ru: {
					maxLength: 11,
					contryCode: '7',
				},
			},
		}
	},
	computed: {
		listeners() {
			delete this.$listeners.input
			return this.$listeners
		},
		formattedPhone() {
			let num = this.getJustNumbers(this.value)

			// номер в шаблоне не может быть пустым
			// минимум подставляем код страны
			if (num === '') {
				num = `+${this.choosedFormat.contryCode}${num}`
			// для всех стран, где код страны состоит из 1 символа
			} else if (
				this.choosedFormat.contryCode.length === 1
				&& num.length === 2
				&& num[0] === num[1]
			) {
				// удаляем дублирующийся код
				num = `+${num.substring(1)}`
			} else {
				num = `+${num}`
			}

			if (num.length > 8) {
				num = num.replace(/^\+\d(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,})$/, '+7 ($1) $2 $3')
			} else if (num.length > 5) {
				num = num.replace(/^\+\d(\d{0,3})(\d{0,3})$/, '+7 ($1) $2')
			} else if (num.length > 2) {
				num = num.replace(/^\+\d(\d{0,3})$/, '+7 ($1)')
			}

			return num
		},
		choosedFormat() {
			return this.formats[this.format]
		},
	},
	methods: {
		getJustNumbers(number) {
			return number.replace(/(\D)/g, '').slice(0, this.choosedFormat.maxLength)
		},
		handleInput(newValue) {
			let localValue = newValue

			// данное условие удалит правую круглую скобку
			if (newValue.search(/\(/) > -1 && newValue.search(/\)/) === -1) {
				localValue = newValue.slice(0, -1)
			}

			const localJustDigits = this.getJustNumbers(localValue)
			const propJustDigits = this.getJustNumbers(this.value)
			const isCountryCodeSingleChar = this.choosedFormat.contryCode.length === 1
			const isCountryCodeDoubled = localJustDigits === (this.choosedFormat.contryCode + this.choosedFormat.contryCode)
			const isDataChanged = localJustDigits !== propJustDigits
			const isNeedFullStringClear = isCountryCodeSingleChar && localJustDigits === this.choosedFormat.contryCode && propJustDigits > localJustDigits

			if (
				isDataChanged
				&& (isCountryCodeSingleChar ? !isCountryCodeDoubled : true)
			) {
				// нам не нужно отправлять в родителя код страны
				if (isNeedFullStringClear) {
					this.$emit('input', '')
				} else {
					this.$emit('input', localJustDigits)
				}
			}
		},
	},
}
</script>