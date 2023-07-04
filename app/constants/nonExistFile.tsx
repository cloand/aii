import { IMAGES } from "../utils";
import images from "../utils/images";

interface ImageData {
  url: string;
}

interface Image {
  brandData: {
    Name: string,
  }
  fields: {
    Category?: string;
    Name?: string;
    Images?: ImageData[];
  };
}

export const IsArrayOfImageExsist = (items: any = []) => {
  const { fields: { Images = [] } = {} } = items || []
  return Images.length > 0 ? Images :
    [{
      "id": "attf31w2SVVzKCGBF",
      "url": images.ProductDefaultImage,
      "filename": "21310-42-0796-Andrea-Strip-Lash-70-Blk-HC.jpg",
      "type": "image/jpeg",
    }]
}

export const IsImageExist = (image: Image, showImage?: string): string => {

  const {
    brandData: { Name: BrandName } = {} as Partial<Image['fields']>,
    fields: { Category, Name, Images = [] } = {} as Partial<Image['fields']>,
  } = image || {};

  if (Images[0]) return Images[0]?.url;

  return IMAGES[Category as keyof typeof IMAGES] ||
    IMAGES[BrandName as keyof typeof IMAGES ?? Name as keyof typeof IMAGES] ||
    showImage ||
    IMAGES.ProductDefaultImage;
};
