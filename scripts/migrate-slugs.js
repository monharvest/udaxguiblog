/**
 * Script to generate slugs for existing posts that don't have them
 * Run this script to migrate existing posts to use slugs
 */

import { generateUniqueSlug } from '../app/utils/slug.js';

const WORKER_URL = "https://udaxgui-worker.monharvest.workers.dev";
const ADMIN_SECRET_KEY = "789Hosanna7-";

async function migratePostsToSlugs() {
  try {
    console.log('Fetching existing posts...');

    // Fetch all posts
    const response = await fetch(`${WORKER_URL}/api/posts`);
    const data = await response.json();

    if (!data.success) {
      console.error('Failed to fetch posts:', data.error);
      return;
    }

    const posts = data.posts;
    console.log(`Found ${posts.length} posts`);

    // Separate posts with and without slugs
    const postsWithSlugs = posts.filter(post => post.slug);
    const postsWithoutSlugs = posts.filter(post => !post.slug);

    console.log(`${postsWithSlugs.length} posts already have slugs`);
    console.log(`${postsWithoutSlugs.length} posts need slugs`);

    if (postsWithoutSlugs.length === 0) {
      console.log('All posts already have slugs!');
      return;
    }

    // Generate slugs for posts without them
    const existingSlugs = postsWithSlugs.map(post => post.slug);
    let updatedCount = 0;

    for (const post of postsWithoutSlugs) {
      const slug = generateUniqueSlug(post.title, existingSlugs);

      console.log(`Updating post "${post.title}" with slug: ${slug}`);

      try {
        const updateResponse = await fetch(`${WORKER_URL}/api/posts/${post.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-secret': ADMIN_SECRET_KEY,
          },
          body: JSON.stringify({ ...post, slug }),
        });

        const updateData = await updateResponse.json();

        if (updateData.success) {
          existingSlugs.push(slug);
          updatedCount++;
          console.log(`✓ Updated post ${post.id}`);
        } else {
          console.error(`✗ Failed to update post ${post.id}:`, updateData.error);
        }
      } catch (error) {
        console.error(`✗ Error updating post ${post.id}:`, error);
      }

      // Add a small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`Migration complete! Updated ${updatedCount} posts with slugs.`);

  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run the migration
migratePostsToSlugs();