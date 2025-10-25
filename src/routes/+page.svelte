<script lang="ts">
	import CoreReqBox from '$lib/components/CoreReqBox.svelte';
	import MajorReqBox from '$lib/components/MajorReqBox.svelte';

	let classData: Record<string, [string | number, string | number]> = {
		"Class 1" : [3, 5],
		"Class 2" : [4, 9]
	}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>

	<h1>Schedule Planner</h1>

	<div class="flex gap-2">
		<CoreReqBox />
		<MajorReqBox majorName="Math" data={classData} />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
