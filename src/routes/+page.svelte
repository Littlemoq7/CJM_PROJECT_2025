<script lang="ts">
	import { onMount } from "svelte";
	import { browser } from '$app/environment';
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

	let majors: Set<string> = $state(new Set(["Math BS", "Sociology"]));
	let course_ids_taken: Set<string> = $state(new Set());
	let not_taken = $state(new Map());

	function getCourseIds() {
		let courses_taken = [...year1courses[0], ...year1courses[1], ...year2courses[0], ...year2courses[1], ...year3courses[0], ...year3courses[1], ...year4courses[0], ...year4courses[1]];
		let course_ids: Set<string> = new Set();
		courses_taken.forEach(name => {
			let id = data.course_map[name];
			if (id) course_ids.add(id);
		})
		course_ids_taken = course_ids;
		savePlan();
	}

	// Fills slot based on index, returns if successful
	function fillSlot(index: number, course_id: string): boolean {
		// normalize course_id: if it contains a slash, take everything before the first slash
		course_id = course_id.trim();
		const slashIdx = course_id.indexOf('/');
		if (slashIdx !== -1) {
			course_id = course_id.slice(0, slashIdx);
		}
		let course_name = data.course_map_rev[course_id];
		if (!course_name) return false;

		// Year 1 (0–9)
		if (index >= 0 && index < 5) {
			if (year1courses[0][index] === "") {
				year1courses[0][index] = course_name;
				return true;
			}
		} else if (index >= 5 && index < 10) {
			if (year1courses[1][index - 5] === "") {
				year1courses[1][index - 5] = course_name;
				return true;
			}
		// Year 2 (10–19)
		} else if (index >= 10 && index < 15) {
			if (year2courses[0][index - 10] === "") {
				year2courses[0][index - 10] = course_name;
				return true;
			}
		} else if (index >= 15 && index < 20) {
			if (year2courses[1][index - 15] === "") {
				year2courses[1][index - 15] = course_name;
				return true;
			}
		// Year 3 (20–29)
		} else if (index >= 20 && index < 25) {
			if (year3courses[0][index - 20] === "") {
				year3courses[0][index - 20] = course_name;
				return true;
			}
		} else if (index >= 25 && index < 30) {
			if (year3courses[1][index - 25] === "") {
				year3courses[1][index - 25] = course_name;
				return true;
			}
		// Year 4 (30–39)
		} else if (index >= 30 && index < 35) {
			if (year4courses[0][index - 30] === "") {
				year4courses[0][index - 30] = course_name;
				return true;
			}
		} else if (index >= 35 && index < 40) {
			if (year4courses[1][index - 35] === "") {
				year4courses[1][index - 35] = course_name;
				return true;
			}
		}

		return false;
	}

	// Fills not taken classes into schedule
	function fillSchedule() {
		const lists = Array.from(not_taken.values()).map((arr) => [...arr]);

		const result: string[] = [];
		let added = true;

		// Weave in courses from different majors
		while (added) {
			added = false;
			for (const list of lists) {
				if (list.length > 0) {
					result.push(list.shift()!);
					added = true;
				}
			}
		}

		// Try to place each course in the first available empty slot
		let index = 0;
		for (const course of result) {
			let placed = false;
			while (!placed && index < 40) {
				placed = fillSlot(index, course);
				index++;
			}
		}
	}

	const STORAGE_KEY = "four_year_plan";

	const cloneYear = (y: string[][]) => [ [...y[0]], [...y[1]] ];

	// helper: ensure shape is [[],[]] with 6 slots each
	const normalizeYear = (v: any): string[][] => {
		if (!Array.isArray(v) || v.length !== 2) return [Array(6).fill(''), Array(6).fill('')];
		const fix = (row: any) => (Array.isArray(row) ? [...row, '', '', '', '', '', ''].slice(0, 6) : Array(6).fill(''));
		return [fix(v[0]), fix(v[1])];
	};
		
	function savePlan() {
		if (!browser) return;
		try {
			const dataToSave = {
				year1: cloneYear(year1courses),
				year2: cloneYear(year2courses),
				year3: cloneYear(year3courses),
				year4: cloneYear(year4courses)
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
		} catch (e) {
			console.error('localStorage save failed:', e);
		}
	}

	function loadPlan() {
		if (!browser) return;
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (!saved) return;
			const parsed = JSON.parse(saved);
			if (parsed.year1) year1courses = normalizeYear(parsed.year1);
			if (parsed.year2) year2courses = normalizeYear(parsed.year2);
			if (parsed.year3) year3courses = normalizeYear(parsed.year3);
			if (parsed.year4) year4courses = normalizeYear(parsed.year4);
		} catch (e) {
			console.error('localStorage load failed:', e);
		}
	}

	let major_input: string | undefined = $state();

	onMount(() => {
		loadPlan();
		getCourseIds();
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="w-full h-full">

	<div class="w-full mb-4">
		<div class="flex justify-between">
			<div class="flex items-center">
				<input
					id="left-input"
					type="text"
					bind:value={major_input}
					placeholder="Add major or minor"
					class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mr-2"
					aria-label="Course search"
				/>
				<button
					type="button"
					onclick={() => {
						if (major_input && major_programs.has(major_input)) {
							majors.add(major_input);
							majors = new Set(majors);
							major_input = undefined;
						}
					}}
					class="px-3 py-1.5 bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
					aria-label="Search"
				>
					Add
				</button>
			</div>
			<div class="flex items-center">
				<button
					type="button"
					onclick={getCourseIds}
					class="px-3 py-1.5 bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
					aria-label="Update requirements"
					style= "background-color: var(--color-theme-1); color: var(--color-bg-0)"
				>
					Update requirements
				</button>
				<button
					type="button"
					onclick={fillSchedule}
					class="px-3 py-1.5 bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition ml-2"
					aria-label="Fill schedule"
					style= "background-color: var(--color-theme-1); color: var(--color-bg-0)"
				>
					Fill Schedule
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
				<CoreReqBox taken={course_ids_taken} core_map={data.core_map}/>
				{#each majors as name}
					{#if major_programs.has(name)}
						<MajorReqBox major_name={name} major_data={data.majors[name]} credit_map={data.credit_map} taken={course_ids_taken} not_taken={not_taken} bind:majors/>
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