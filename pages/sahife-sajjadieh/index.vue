<script setup></script>

<template>
	<div class="sahife-sajjadieh">
		<div class="sahife-sajjadieh__list">
			<nuxt-link
				to="/sahife-sajjadieh/1"
				class="sahife-sajjadieh__list__dua"
				>دعای اول</nuxt-link
			>
		</div>
	</div>
</template>

<style scoped lang="scss">
.sahife-sajjadieh {
	&__list {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;

		&__dua {
			border-radius: 15px;
			padding: 20px 24px;
			text-align: center;
			text-decoration: none;
			background-color: var(--color-secondary);
		}
	}
}
</style>
