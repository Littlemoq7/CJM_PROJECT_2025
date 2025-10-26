<script lang="ts">
  let data = {
    "Math" : [1, 1],
    "History" : [2, 1]
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
          {#each Object.entries(data) as [key, value]}
            <tr>
              <td class="border px-2 py-1">{key}</td>
              <td class="border px-2 py-1">{value[0]}</td>
              <td class="border px-2 py-1">{value[1]}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</main>