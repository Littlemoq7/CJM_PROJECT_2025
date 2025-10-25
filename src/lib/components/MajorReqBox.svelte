<script>
  let {majorName, data } = $props();
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
            <th class="border px-2 py-1 text-left" scope="col">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {#if data}
            {#each Object.entries(data) as [key, value]}
              <tr>
                <td class="border px-2 py-1">{key}</td>
                <td class="border px-2 py-1">{value[0]}</td>
                <td class="border px-2 py-1">{value[1]}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</main>