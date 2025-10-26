<script lang="ts">
  let { major_name, major_data, credit_map, taken, not_taken = $bindable(), majors = $bindable() } = $props();

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

  function hasTaken(course_id: string): boolean {
    if (course_id.includes("/")) {
      const parts = course_id.split("/").map((p) => p.trim());
      return parts.some((p) => taken.has(p));
    }
    return taken.has(course_id);
  }

  $effect(() => {
    if (major_data?.core_courses) {
      const new_not_taken = major_data.core_courses.filter(
        (course: string) => !hasTaken(course)
      );

      const merged = [
        ...(not_taken.get(major_name) || []),
        ...new_not_taken.filter((c: any) => !(not_taken.get(major_name) || []).includes(c))
      ];

      const cleaned = merged.filter((c) => !hasTaken(c));

      not_taken.set(major_name, cleaned);
    }
  });


  // Checks for coreqs and electives
  function checkExtraCredits(section: string) : number {
    let count = 0;
    let valid_courses = new Set(major_data[section]);
    taken.forEach((course_id: string) => {
      if (valid_courses.has(course_id)) {
        let num = credit_map[course_id];
        if (num) count += num;
      }
    })
    return count;
  }

  function removeMajor() {
    majors.delete(major_name);
    majors = new Set(majors);
  }

</script>

<main>
  <div class="border rounded p-2">
    <div class="w-full pt-1 pb-2 flex justify-center items-center relative">
      <h2 class="text-center text-lg font-semibold flex-1">{major_name}</h2>
      <button
        class="absolute right-2 top-1 text-gray-500 hover:text-red-600 font-bold text-lg"
        onclick={removeMajor}
        aria-label="Remove Major"
      >
        ×
      </button>
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
            <tr>
              <td class="border px-2 py-1">{"Electives"}</td>
              <td class="border px-2 py-1">{major_data["elective_credits"]}</td>
              <td class="border px-2 py-1">{checkExtraCredits("electives")}</td>
            </tr>
            <tr>
              <td class="border px-2 py-1">{"Co-requisites"}</td>
              <td class="border px-2 py-1">{major_data["corequisite_credits"]}</td>
              <td class="border px-2 py-1">{checkExtraCredits("corequisites")}</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</main>