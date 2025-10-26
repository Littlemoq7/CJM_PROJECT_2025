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

	const major_programs = new Set(["Math BS", "Computer Science BA", "Sociology"]);
	const courseCatalog: Array<string> = course_list_full;

	let majors: Set<string> = $state(new Set(["Math BS", "Sociology", "Computer Science BA"]));
	let course_ids_taken: Set<string> = $state(new Set());

	function getCourseIds() {
		let courses_taken = [...year1courses[0], ...year1courses[1], ...year2courses[0], ...year2courses[1], ...year3courses[0], ...year3courses[1], ...year4courses[0], ...year4courses[1]];
		let course_ids: Set<string> = new Set();
		courses_taken.forEach(name => {
			let id = data.course_map[name];
			if (id) course_ids.add(id);
		})
		course_ids_taken = course_ids;
		console.log(course_ids_taken);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="w-full h-full">

	<div class="w-[93%] flex justify-between mx-auto">
		<div>
			<h2>Requirements and Four Year Plan</h2>
		</div>
		<div class="flex">
			<div class="flex items-center">
				<button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onclick={getCourseIds}>
					Update Requirements
				</button>
			</div>
		</div>
	</div>

	<div class="flex justify-evenly">

		<!-- Contains requirement boxes -->
		<div class="w-[200px] md:w-[250px] lg:w-[350px]">
			<div class="w-full border">
				<h3 class="text-center">My Requirements</h3>
			</div>
			<div class="flex flex-col gap-2 overflow-y-auto max-h-[80vh]">
				<CoreReqBox />
				{#each majors as name}
					{#if major_programs.has(name)}
						<MajorReqBox major_name={name} major_data={data.majors[name]} credit_map={data.credit_map} taken={course_ids_taken}/>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Contains four year plan -->
		<div class="rounded w-[300px] md:w-[600px] lg:w-[900px]">
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
