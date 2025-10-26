<script>
  import courses from './courses.json';

  const filtered = courses.filter(c =>
    (c.core_attribute || '').toLowerCase().includes('cultural diversity')
  );
</script>

<h2>Cultural Diversity Courses</h2>
<ul>
  {#each filtered as c}
    <li>{c.title}</li>
  {/each}
</ul>
