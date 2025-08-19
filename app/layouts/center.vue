<template>
	<div>
		<slot />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
div {
	height: 100%;
	display: grid;
	padding: var(--n-space-m);

	> :deep(*) {
		inline-size: 100%;
		max-inline-size: 40ch;
		margin: auto;
	}
}
</style>
