<script lang="ts">
	import CoreReqBox from '$lib/components/CoreReqBox.svelte';
	import MajorReqBox from '$lib/components/MajorReqBox.svelte';
	import YearPlan from '$lib/components/YearPlan.svelte';

	let { data } = $props();

	let course_list_full: Array<string> = [];
	data.courses.forEach((element: any) => {
		course_list_full.push(element.title);
	});

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

	const courseCatalog: Array<string> = course_list_full;

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
				<MajorReqBox majorName="Math BS" major_data={data.programs.majors} />
			</div>
		</div>

		<!-- Contains four year plan -->
		<div class="bg-amber-200 rounded w-[300px] md:w-[600px] lg:w-[900px]">
			<div class="w-full border">
				<h3 class="text-center">Course Planner</h3>
			</div>

			<div class="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
				<YearPlan yearNum=1 bind:courses={year1courses} courseCatalog={courseCatalog}/>
				<YearPlan yearNum=2 bind:courses={year2courses} courseCatalog={courseCatalog}/>
				<YearPlan yearNum=3 bind:courses={year3courses} courseCatalog={courseCatalog}/>
				<YearPlan yearNum=4 bind:courses={year4courses} courseCatalog={courseCatalog}/>
			</div>
		</div>

	</div>

</div>

<style>

	h1 {
		width: 100%;
	}

</style>
