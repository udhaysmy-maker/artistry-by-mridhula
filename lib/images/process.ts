import sharp from "sharp";

export interface ProcessedImages {
  mainJpeg: Buffer;
  mainWebp: Buffer;
  thumbJpeg: Buffer;
  thumbWebp: Buffer;
}

export async function processGalleryImage(input: Buffer): Promise<ProcessedImages> {
  const [mainJpeg, mainWebp, thumbJpeg, thumbWebp] = await Promise.all([
    sharp(input)
      .rotate()
      .toColorspace("srgb")
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer(),
    sharp(input)
      .rotate()
      .toColorspace("srgb")
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer(),
    sharp(input)
      .rotate()
      .toColorspace("srgb")
      .resize({ width: 400, withoutEnlargement: true })
      .jpeg({ quality: 75 })
      .toBuffer(),
    sharp(input)
      .rotate()
      .toColorspace("srgb")
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer(),
  ]);
  return { mainJpeg, mainWebp, thumbJpeg, thumbWebp };
}

export interface ProcessedBlogImages {
  heroWebp: Buffer;
  thumbWebp: Buffer;
}

export async function processBlogImage(input: Buffer): Promise<ProcessedBlogImages> {
  const [heroWebp, thumbWebp] = await Promise.all([
    sharp(input)
      .rotate()
      .toColorspace("srgb")
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer(),
    sharp(input)
      .rotate()
      .toColorspace("srgb")
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer(),
  ]);
  return { heroWebp, thumbWebp };
}
