import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';

export default async function handle(req, res) {
  // if authenticated, connect to MongoDB
  await mongooseConnect();

  const { method } = req;

  // === Method Post ===
  if (method === 'POST') {
    const { title, slug, images, description, blogcategory, tags, status } = req.body;

    const blogDoc = await Blog.create({
      title,
      slug,
      images,
      description,
      blogcategory,
      tags,
      status,
    });

    res.json(blogDoc);
  }

  // === Method Get ===
  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Blog.findById(req.query.id));
    } else {
      res.json((await Blog.find()).reverse());
    }
  }

  // === Method Put ===
  if (method === 'PUT') {
    const { _id, title, slug, images, description, blogcategory, tags, status } = req.body;

    await Blog.updateOne(
      { _id },
      {
        title,
        slug,
        images,
        description,
        blogcategory,
        tags,
        status,
      }
    );
    res.json(true);
  }

  // === Method Delete ===
  if (method === 'DELETE') {
    if (req.query?.id) {
      await Blog.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
