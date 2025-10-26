<script lang="ts">
  let { majorName, major_data } = $props();

  let foundMajor: object | null = null;
  major_data.forEach((major: any) => {
    if (major.name === majorName) foundMajor = major;
  })

  let core_courses: Array<string> | null = null;

  if (foundMajor && foundMajor["requirements"]) {
    (foundMajor["requirements"] as Array<object>).forEach((req: any) => {
      if (req["courses"]) {
        core_courses = req["courses"];
      }
    })
  }
</script>

<main>
  <div class="border rounded p-2">
    <div class="w-full pt-1 pb-2">
      <h2 class="text-center">{majorName}</h2>
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
          {#if foundMajor && core_courses}
            {#each core_courses as course}
              <tr>
                <td class="border px-2 py-1">{course}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</main>