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

  let course_map: Record<string, any> = {};
  let credit_map: Record<string, any> = {};

  courses.forEach((course: any) => {
    const title = course["title"];
    if (typeof title === "string" && course["id"] !== undefined) {
      course_map[title] = course["id"];
    }
    if (course["credits"] !== undefined) {
      credit_map[course["id"]] = course["credits"];
    }
  });

  const culturalDiversity = courses.filter((c: any) =>
    (c.core_attribute || "").toLowerCase().includes("cultural diversity")
  );

	return { courses, programs, course_map, credit_map, culturalDiversity };
};