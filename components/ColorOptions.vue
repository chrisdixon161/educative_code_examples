<script setup>
const availableColors = useAvailableColors();
const selectedColors = useSelectedColors();

function setColor(color) {
	if (selectedColors.value.includes(color)) {
		selectedColors.value = selectedColors.value.filter((value) => {
			return value !== color;
		});
	} else {
		selectedColors.value.push(color);
	}
}
</script>

<template>
	<ul class="colors_wrapper">
		<li v-for="color in availableColors" :key="color" @click="setColor(color)">
			<span
				v-if="color === 'grayscale' || color === 'transparent'"
				class="text_color_option"
				:style="{
					border: selectedColors.includes(color)
						? '2px solid red'
						: '1px solid gray',
				}"
				>{{ color }}</span
			>
			<span
				v-else-if="color === 'lilac'"
				class="color_option"
				:style="{
					background: '#c8a2c8',
					border: selectedColors.includes(color)
						? '2px solid red'
						: '1px solid gray',
				}"
			>
			</span>
			<span
				v-else
				:style="{
					background: color,
					border: selectedColors.includes(color)
						? '2px solid red'
						: '1px solid gray',
				}"
				class="color_option"
			></span>
		</li>
	</ul>
</template>

<style>
.colors_wrapper {
	display: flex;
	max-width: 50%;
	flex-wrap: wrap;
}
.text_color_option {
	cursor: pointer;
}
.color_option {
	border-radius: 100%;
	width: 20px;
	height: 20px;
	cursor: pointer;
	/* turn span elements into block to display in browser since they have no content inside tags */
	display: block;
}
</style>
