import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/course-data/courses.json');

	if (!res.ok) {
		throw new Error(`Failed to load /course-data/courses.json`);
	}

	const courses = await res.json();
	return { courses };
};