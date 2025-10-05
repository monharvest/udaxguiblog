import slugify from 'slugify';

export function generateSlug(title) {
  return slugify(title, {
    lower: true,           // Convert to lowercase
    strict: true,          // Strip special characters except replacement
    remove: /[*+~.()'"!:@]/g, // Remove these characters
    replacement: '-',      // Replace spaces with -
  });
}

export function validateSlug(slug) {
  // Ensure slug is valid (no special chars, proper format)
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
}