(() => {
  //took inspiration from ChatGPT
    /* ===== Helpers ===== */
  const normCode = (t) => (t || "").replace(/\s|-/g, "").toUpperCase(); // "MATH 1100" -> "MATH1100"
  const onlyLetters = (t) => (t || "").replace(/[^A-Z]/g, "");
  const pickDigits = (t) => ((t || "").match(/\d+/) || [null])[0];

  // Use first 4 digits as the course number (strip section like "MATH100701" -> "1007")
  const normalizeIdParts = (rawCode) => {
    if (!rawCode) return { id: null, subject: null, number: null };
    const subject = onlyLetters(rawCode);
    const digits = pickDigits(rawCode) || "";
    const number = digits.slice(0, 4) || null; // assumes 4-digit catalog numbers
    const id = subject && number ? subject + number : null;
    return { id, subject: subject || null, number };
  };

  const valueAfterStrong = (span) => {
    const strong = span.querySelector("strong");
    if (!strong) return span.textContent.trim();
    const full = span.textContent.trim();
    const lead = strong.textContent.replace(":", "").trim();
    return full.replace(new RegExp("^\\s*" + lead.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*:\\s*", "i"), "").trim();
  };

  const extractCode = (node) => {
    const txt = (node.innerText || node.textContent || "").replace(/\s+/g, " ").trim();
    // Match things like "MATH1100", "MATH 1100", "MATH-1100", or "MATH100701"
    const m = txt.match(/\b([A-Z]{3,5})[ -]?(\d{3,6})\b/);
    if (!m) return null;
    return normCode(`${m[1]}${m[2]}`);
  };

  const extractTitle = (info, detail, code) => {
    // 1) Common title nodes
    const titleNode =
      info.querySelector(".courseTitle, .course-title, .bc-course-title, h3, h4") ||
      (detail && detail.querySelector(".courseTitle, .course-title, .bc-course-title, h3, h4"));
    if (titleNode) {
      const t = titleNode.textContent.replace(/\s+/g, " ").trim();
      if (t && !/:$/.test(t)) return t;
    }
    // 2) Links that look like titles (no digits)
    const links = info.querySelectorAll("a");
    for (const a of links) {
      const t = (a.innerText || a.textContent || "").trim();
      if (t && !/\d/.test(t)) return t.replace(/\s+/g, " ").trim();
    }
    // 3) Text after the code in the info row
    if (code) {
      const raw = (info.innerText || info.textContent || "").replace(/\s+/g, " ").trim();
      const codeWithSpace = code.replace(/([A-Z]+)(\d+)/, "$1 $2");
      const start = raw.indexOf(codeWithSpace) >= 0 ? raw.indexOf(codeWithSpace) : raw.indexOf(code);
      if (start >= 0) {
        const slice = raw.slice(start + code.length).trim();
        const stopMatch = slice.match(/^(.*?)(?:\b(Fall|Spring|Summer|Winter)\b|\bCredits?\b|Instructor\b|Room\b|Satisfies\b|Prerequisites\b|Corequisites\b|Restrictions\b|Notes\b)/i);
        const candidate = (stopMatch ? stopMatch[1] : slice).trim();
        const nice = candidate.replace(/^[\-\–\:]+/, "").trim();
        if (nice) return nice;
      }
    }
    return null;
  };

  const labelMap = {
    "Satisfies Core Requirement": "core_attribute",
    "Prerequisites": "prerequisites_raw"
  };

  // Try to read a numeric "credits" from either detail or info blocks
  const extractCreditsNumber = (info, detail) => {
    // (a) explicit numbers in info (e.g., <div class="col hide-print on">3</div>)
    const infoNums = info.querySelectorAll('.col.hide-print.on, .col.print-bold.on, span');
    for (const el of infoNums) {
      const t = (el.innerText || el.textContent || '').trim();
      const mExact = t.match(/^\d+(\.\d+)?$/);
      if (mExact) return Number(mExact[0]);
      const mWord = t.match(/(\d+(?:\.\d+)?)\s*credits?/i);
      if (mWord) return Number(mWord[1]);
    }
    // (b) numbers in the detail block
    if (detail) {
      const nodes = detail.querySelectorAll('span, .show-small.on, .show-xs.hide-print.on');
      for (const s of nodes) {
        const t = s.textContent.trim();
        const m = t.match(/(\d+(?:\.\d+)?)\s*credits?/i);
        if (m) return Number(m[1]);
      }
    }
    return null;
  };

  /* ===== Extract & Dedupe ===== */
  const seen = new Set(); // normalized course ids (subject + 4 digits)
  const results = [];
  const infoRows = document.querySelectorAll(".row.courseInfo");

  infoRows.forEach((info) => {
    const detail =
      info.nextElementSibling && info.nextElementSibling.matches(".row.courseDetail")
        ? info.nextElementSibling
        : null;

    const rawCode = extractCode(info) || (detail && extractCode(detail));
    if (!rawCode) return;

    const { id, subject, number } = normalizeIdParts(rawCode);
    if (!id) return;

    if (seen.has(id)) return; // keep first occurrence only
    seen.add(id);

    const title = extractTitle(info, detail, rawCode);
    const credits = extractCreditsNumber(info, detail);

    // Labeled spans for prereqs + core attribute
    let prerequisites_raw = null;
    let core_attribute = null;
    if (detail) {
      detail.querySelectorAll("span").forEach((span) => {
        const strong = span.querySelector("strong");
        if (!strong) return;
        const rawLabel = strong.textContent.replace(":", "").trim();
        const key = labelMap[rawLabel];
        if (!key) return;
        const val = valueAfterStrong(span);
        if (key === "prerequisites_raw") prerequisites_raw = val || null;
        if (key === "core_attribute") core_attribute = val || null;
      });
    }

    results.push({
      id,
      subject,
      number,
      title,
      credits,
      prerequisites_raw,
      core_attribute
    });
  });

  // Download JSON
  const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "courses_extracted_dedup.json";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  a.remove();

  console.log(`Exported ${results.length} unique courses to courses_extracted_dedup.json`);
})();