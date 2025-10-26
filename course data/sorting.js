import fs from "fs";

const courses = JSON.parse(fs.readFileSync("courses.json", "utf8"));

const culturalDiversity = courses.filter(c =>
  (c.core_attribute || "").toLowerCase().includes("cultural diversity")
);

culturalDiversity.forEach(c => console.log(c.title));