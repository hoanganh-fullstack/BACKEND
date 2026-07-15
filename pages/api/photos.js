import { mongooseConnect } from '@/lib/mongoose';
import { Photos } from '@/models/Photo';

export default async function handle(req, res) {
  // if authenticated, connect to MongoDB
  await mongooseConnect();

  const { method } = req;

  // === Method Post ===
  if (method === 'POST') {
    const { title, slug, images } = req.body;

    const blogDoc = await Photos.create({
      title,
      slug,
      images
    });

    res.json(blogDoc);
  }

  // === Method Get ===
  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Photos.findById(req.query.id));
    } else {
      res.json((await Photos.find()).reverse());
    }
  }

  // === Method Put ===
  if (method === 'PUT') {
    const { _id, title, slug, images } = req.body;

    await Photos.updateOne(
      { _id },
      {
        title,
        slug,
        images,
      }
    );
    res.json(true);
  }

  // === Method Delete ===
  if (method === 'DELETE') {
    if (req.query?.id) {
      await Photos.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
