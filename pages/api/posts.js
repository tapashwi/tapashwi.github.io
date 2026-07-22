import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'posts')

async function getPostMetadata(filename) {
  try {
    const filePath = path.join(POSTS_DIR, filename)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data } = matter(fileContent)

    return {
      slug: filename.replace('.md', ''),
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      description: data.description || '',
      tags: data.tags ? (Array.isArray(data.tags) ? data.tags : data.tags.split(',').map(t => t.trim())) : []
    }
  } catch (error) {
    console.error(`Error reading post metadata for ${filename}:`, error)
    return null
  }
}

export default async function handler(req, res) {
  try {
    // Ensure directory exists
    if (!await fs.pathExists(POSTS_DIR)) {
      await fs.ensureDir(POSTS_DIR)
    }

    const files = await fs.readdir(POSTS_DIR)
    const mdFiles = files.filter(f => f.endsWith('.md'))

    // Get metadata for all posts
    const posts = await Promise.all(mdFiles.map(f => getPostMetadata(f)))
    const validPosts = posts.filter(p => p !== null)

    // Sort by date, newest first
    validPosts.sort((a, b) => new Date(b.date) - new Date(a.date))

    res.status(200).json({ success: true, posts: validPosts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    res.status(500).json({ success: false, error: error.message })
  }
}
