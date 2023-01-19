<script setup>
const imagesPerPage = useImagesPerPage();
</script>
<template>
	<p>Image per page:</p>
	<select v-model="imagesPerPage">
		<option disabled value="">Please select one</option>
		<option>20</option>
		<option>50</option>
		<option>100</option>
	</select>
</template>
