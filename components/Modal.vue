<script setup>
const props = defineProps({
	modalImage: Object,
});
const emit = defineEmits("close-modal");
const selectedImage = useSelectedImage();
</script>

<template>
	<Teleport to="body">
		<div class="modal_wrapper">
			<div class="modal_content">
				<button class="close_btn" @click="$emit('closeModal')">&#10060;</button>
				<img :src="modalImage.largeImageURL" />
				<NuxtLink to="/single" @click="selectedImage = modalImage"
					>More info</NuxtLink
				>
			</div>
		</div>
	</Teleport>
</template>

<style scoped>
.modal_wrapper {
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.4);
}

.modal_content {
	display: flex;
	flex-direction: column;
	background-color: #fefefe;
	margin: 10vw auto;
	padding: 20px;
	width: 80%;
}
img {
	width: 100%;
}

.close_btn {
	align-self: flex-end;
	cursor: pointer;
	border: none;
}
</style>
