const { Schema, models, model } = require('mongoose');

const PhotosSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
  },
  {
    timestamps: true, // this will automatically manage createdAt anf updatedAt
  }
);

export const Photos = models.Photos || model('Photos', PhotosSchema, 'photos');
