<script lang="ts">
	import CoreReqBox from '$lib/components/CoreReqBox.svelte';
	import MajorReqBox from '$lib/components/MajorReqBox.svelte';
	import YearPlan from '$lib/components/YearPlan.svelte';

	let year1courses = $state([
		Array(6).fill(""),
		Array(6).fill("")
	]);
	let year2courses = $state([
		Array(6).fill(""),
		Array(6).fill("")
	]);
	let year3courses = $state([
		Array(6).fill(""),
		Array(6).fill("")
	]);
	let year4courses = $state([
		Array(6).fill(""),
		Array(6).fill("")
	]);

	let classData: Record<string, [string | number, string | number]> = {
		"Class 1" : [3, 5],
		"Class 2" : [4, 9],
		"Class 3" : [4, 9],
		"Class 4" : [4, 9],
		"Class 5" : [4, 9],
		"Class 6" : [4, 9]
	}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="bg-red-200 w-full h-full">

	<h1>Schedule Planner</h1>

	<div class="flex justify-evenly">

		<!-- Contains requirement boxes -->
		<div class="w-[200px] md:w-[250px] lg:w-[350px] bg-amber-200">
			<div class="w-full border">
				<h3 class="text-center">My Requirements</h3>
			</div>
			<div class="flex flex-col gap-2 overflow-y-auto max-h-[80vh]">
				<CoreReqBox />
				<MajorReqBox majorName="Math" data={classData} />
				<MajorReqBox majorName="Math" data={classData} />
			</div>
		</div>

		<!-- Contains four year plan -->
		<div class="bg-amber-200 rounded w-[300px] md:w-[600px] lg:w-[900px]">
			<div class="w-full border">
				<h3 class="text-center">Course Planner</h3>
			</div>
			
			<div class="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
				<YearPlan yearNum=1 bind:courses={year1courses}/>
				<YearPlan yearNum=2 bind:courses={year2courses}/>
				<YearPlan yearNum=3 bind:courses={year3courses}/>
				<YearPlan yearNum=4 bind:courses={year4courses}/>
			</div>
		</div>

	</div>

</div>

<style>

	h1 {
		width: 100%;
	}

</style>
