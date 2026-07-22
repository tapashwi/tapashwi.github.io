import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'posts')

export default async function handler(req, res) {
  const { slug } = req.query

  if (!slug) {
    return res.status(400).json({ success: false, error: 'Slug is required' })
  }

  try {
    const filePath = path.join(POSTS_DIR, `${slug}.md`)

    // Check if file exists
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ success: false, error: 'Post not found' })
    }

    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const post = {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      description: data.description || '',
      tags: data.tags ? (Array.isArray(data.tags) ? data.tags : data.tags.split(',').map(t => t.trim())) : [],
      content
    }

    res.status(200).json({ success: true, post })
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error)
    res.status(500).json({ success: false, error: error.message })
  }
}
