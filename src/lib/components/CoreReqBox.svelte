<script lang="ts">

  let { taken, core_map } = $props();

  let data: Record<string, number> = {
    "Arts" : 1,
    "Cultural Diversity" : 1,
    "History I" : 1,
    "History II" : 1,
    "Literature" : 1,
    "Mathematics" : 1,
    "Natural Science" : 2,
    "Philosophy" : 2,
    "Social Science" : 2,
    "Theology" : 2,
    "Writing" : 1
  }

  function checkCore(req: string) : number {
    let count = 0;
    taken.forEach((course_id: string) => {
      console.log(core_map[course_id]);
      if (core_map[course_id].includes(req)) count += 1;
    })
    return Math.min(count, data[req]);
  }

</script>

<main>
  <div class="border rounded p-2">
    <div class="w-full pt-1 pb-2">
      <h2 class="text-center">Core Requirements</h2>
    </div>
    <div class="overflow-auto">
      <table class="min-w-full border-collapse">
        <thead>
          <tr>
            <th class="border px-2 py-1 text-left" scope="col">Subject</th>
            <th class="border px-2 py-1 text-left" scope="col">Required</th>
            <th class="border px-2 py-1 text-left" scope="col">Completed</th>
          </tr>
        </thead>
        <tbody>
          {#each Object.entries(data) as [subject, num]}
            <tr>
              <td class="border px-2 py-1">{subject}</td>
              <td class="border px-2 py-1">{num}</td>
              <td class="border px-2 py-1">{checkCore(subject)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</main>