import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res1 = await fetch('/course-data/courses.json');

	if (!res1.ok) {
		throw new Error(`Failed to load /course-data/courses.json`);
	}

	const courses = await res1.json();

  const res2 = await fetch('/course-data/programs.json');

	if (!res2.ok) {
		throw new Error(`Failed to load /course-data/programs.json`);
	}

	const programs = await res2.json();

  const culturalDiversity = courses.filter((c: any) =>
    (c.core_attribute || "").toLowerCase().includes("cultural diversity")
  );

	return { courses, programs, culturalDiversity };
};