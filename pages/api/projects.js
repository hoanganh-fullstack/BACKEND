import { mongooseConnect } from '@/lib/mongoose';
import { Project } from '@/models/Project';

export default async function handle(req, res) {
  // if authenticated, connect to MongoDB
  await mongooseConnect();

  const { method } = req;

  // === Method Post ===
  if (method === 'POST') {
    const { title, slug, images, description, client, projectcategory, tags, livepreview, status } = req.body;

    const blogDoc = await Project.create({
      title,
      slug,
      images,
      description,
      client,
      projectcategory,
      tags,
      livepreview,
      status,
    });

    res.json(blogDoc);
  }

  // === Method Get ===
  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Project.findById(req.query.id));
    } else {
      res.json((await Project.find()).reverse());
    }
  }

  // === Method Put ===
  if (method === 'PUT') {
    const { _id, title, slug, images, description, client, projectcategory, tags, livepreview, status } = req.body;

    await Project.updateOne(
      { _id },
      {
        title,
        slug,
        images,
        description,
        client,
        projectcategory,
        tags,
        livepreview,
        status,
      }
    );
    res.json(true);
  }

  // === Method Delete ===
  if (method === 'DELETE') {
    if (req.query?.id) {
      await Project.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
