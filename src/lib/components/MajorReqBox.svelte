<script lang="ts">
  let { major_name, major_data, credit_map, taken } = $props();

  // Gets credit value for courses with multiple options
  function getCredits(course_id: string) : number {
    if (course_id.includes('/')) {
      const parts = course_id.split('/').map(p => p.trim());
      for (const p of parts) {
        const val = credit_map[p];
        if (typeof val === 'number') return val;
      }
    }

    // If single course or above fails
    const val = credit_map[course_id];
    if (typeof val === 'number') return val;
    return 0;
  }

  function hasTaken(course_id: string) : boolean {
    if (course_id.includes('/')) {
      const parts = course_id.split('/').map(p => p.trim());
      for (const p of parts) {
        if (taken.has(p)) return true;
      }
    } else {
      if (taken.has(course_id)) return true;
    }
    return false;
  }

</script>

<main>
  <div class="border rounded p-2">
    <div class="w-full pt-1 pb-2">
      <h2 class="text-center">{major_name}</h2>
    </div>
    <div class="overflow-auto">
      <table class="min-w-full border-collapse">
        <thead>
          <tr>
            <th class="border px-2 py-1 text-left" scope="col">Class</th>
            <th class="border px-2 py-1 text-left" scope="col">Credits</th>
            <th class="border px-2 py-1 text-left" scope="col">Completed</th>
          </tr>
        </thead>
        <tbody>
          {#if major_name && major_data}
            {#each major_data["core_courses"] as course}
              <tr>
                <td class="border px-2 py-1">{course}</td>
                <td class="border px-2 py-1">{getCredits(course)}</td>
                <td class="border px-2 py-1">{hasTaken(course) ? "Yes" : "No"}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</main>