# ElInputNullable

## Зачем

> Чтобы посылать на бэк вместо пустой строки значение `null`

## Как работает

> Директива (модуль в этой директории) отвечает за обёртку над определённым элементом `el-input`
>
> Директива перехватывает события `input` и `change` и проверяет передаваемое значение, если оно даёт `false` при проверке, то возвращается `null`, иначе возвращается переданное значение

## Использование

### `template`

```html
<template>
	<el-input v-model="value" v-el-input-nullable/>
</template>
```

### `script`

```javascript
import ElInputNullable from 'KitDirectives/ElInputNullable'

export default {
	...

	directives: {
		ElInputNullable,
	},
}
```

## Обратить внимание

- если где-то в функции, используемой возвращённое значение из `el-input`, подразумевалось, что всегда приходит строка, то какой-то метод (например, `replace`) выполнится с ошибкой

- в других директивах, если внутри них тоже подразумевалось, что всегда приходит строка и применялись методы, которых нет у `null`

- `ElInputNullable` не меняет входное значение (то есть если в `v-model` передавалась пустая строка, она поменяется на `null` только при изменении значения)

- `ElInputNullable` используется только с компонентом `el-input`, но не с `el-input-number` или `el-autocomplete`

---

# DrawerClosableMousedown

## Зачем:

> Иногда (а может часто) нужно, чтобы `el-drawer` не закрывался при отжатии кнопки мыши за пределами `el-drawer` (например, решили скопировать текст, потянули слишком далеко -> закрытие `el-drawer`)

## Как работает

> Директива убирает дефолтный обработчик клика на внутренний враппер, добавляет `eventListener` для `mousedown` на весь компонент дроуера, после срабатывания события внутри проверяется класс таргета события (у враппера дроуера он всегда будет `el-drawer__container el-drawer__open`)

## Использование

### `template`

```html
<template>
	<el-drawer v-drawer-closable-mousedown>...</el-drawer>
</template>
```

### `script`

```javascript
import DrawerClosableMousedown from 'KitDirectives/DrawerClosableMousedown'

export default {
	...

	directives: {
		DrawerClosableMousedown,
	},
}
```
---

# DialogClosableMousedown
## Зачем:

> Иногда (а может часто) нужно, чтобы `el-dialog` не закрывался при отжатии кнопки мыши за пределами `el-dialog` (например, решили скопировать текст, потянули слишком далеко -> закрытие `el-dialog`)

## Как работает

> Директива убирает дефолтный обработчик клика на внутренний враппер, добавляет `eventListener` для `mousedown` на весь компонент диалога, после срабатывания события внутри проверяется класс таргета события (у враппера диалога он всегда будет `el-dialog__wrapper`)

## Использование

### `template`

```html
<template>
	<el-dialog v-dialog-closable-mousedown>...</el-dialog>
</template>
```

### `script`

```javascript
import DialogClosableMousedown from 'KitDirectives/DialogClosableMousedown'

export default {
	...

	directives: {
		DialogClosableMousedown,
	},
}
```

---

# DefaultSingleSelect
## Зачем:

> Для `el-select`, использовать только при `multiple === false`
>
> Выбор единственного значения в списке
>
> Работает в том числе и при асинхронной загрузке элементов списка

## Как работает

> Директива эмулирует выбор элемента списка, если ещё ничего не выбрано и если он единственный
>
> Ставится `watch` на массив `options` (`immediate: true`), вследствие чего можно использовать и с асинхронной загрузкой данных, и с синхронной

## Использование

### `template`

```html
<template>
	<el-select v-default-single-select>...</el-select>
</template>
```

### `script`

```javascript
import DefaultSingleSelect from 'KitDirectives/DefaultSingleSelect'

export default {
	...

	directives: {
		DefaultSingleSelect,
	},
}
```

---

# DisableComposition
## Зачем:

> Для `el-input`, `el-autocomplete`, `el-select` (с флагом `filterable`)
>
> По умолчанию в элементе инпуты используют composition-события, это позволяет вызвать событие ввода только когда слово введено полностью (встречается на touch-устройствах, пока вводишь какое-то слово клавиатура предлагает варианты этого слова и, пока слово не выбрано/не нажат пробел, событие ввода не срабатывает), при фильтрации элементов списка это не всегда удобно, с помощью этой директивы обрубается такое поведени

## Как работает

> Директива заменяет функции, которые связаны с composition-событиями, на пустые функции, комозиция не сохраняется и ввод происходит как на обычной клавиатуре на ПК

## Использование

### `template`

```html
<template>
	<el-select v-disable-composition>...</el-select>
</template>
```

### `script`

```javascript
import DisableComposition from 'KitDirectives/DisableComposition'

export default {
	...

	directives: {
		DisableComposition,
	},
}
```

---