<script>
  let { yearNum, courses = $bindable() } = $props();
	let semesters = ["Fall", "Spring"];
</script>

<main>
  <h3>Year {yearNum}</h3>
  <table class="border-collapse w-full text-sm">
	  <thead>
			<tr>
				<th class="border px-2 py-1 text-left">Semester</th>
				{#each Array(6) as _, i}
					<th class="border px-2 py-1 text-center">Course {i + 1}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each semesters as sem, r}
				<tr>
					<td class="border px-2 py-1 font-medium">{sem}</td>
					{#each courses[r] as course, c}
						<td class="border px-1 py-1">
							<input
								class="w-full p-1 rounded border outline-none focus:ring-2 focus:ring-amber-400"
								type="text"
								bind:value={courses[r][c]}
								placeholder="Course"
							/>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>  
</main>