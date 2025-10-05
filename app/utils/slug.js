/**
 * Generate a URL-friendly slug from a string
 * @param {string} text - The text to convert to a slug
 * @returns {string} The generated slug
 */
export function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace spaces and special characters with hyphens
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Generate a unique slug by checking against existing slugs
 * @param {string} text - The text to convert to a slug
 * @param {string[]} existingSlugs - Array of existing slugs to avoid duplicates
 * @returns {string} The generated unique slug
 */
export function generateUniqueSlug(text, existingSlugs = []) {
  let slug = generateSlug(text);
  let originalSlug = slug;
  let counter = 1;

  // Keep incrementing counter until we find a unique slug
  while (existingSlugs.includes(slug)) {
    slug = `${originalSlug}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Validate if a string is a valid slug
 * @param {string} slug - The slug to validate
 * @returns {boolean} Whether the slug is valid
 */
export function isValidSlug(slug) {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}