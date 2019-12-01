<template>
	<div>
		<span>Cтраницы с адресом </span><code class="p-1 color-text-danger">{{ $route.fullPath }}</code><span> не существует</span>
	</div>
</template>

<script>
export default {
	name: 'PageNotFound',
}
</script>