import cloudinary from "@/utils/cloudinary";

export const deleteImage = async (public_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      return resolve(result);
    } catch (error) {
      reject(new Error(error.message));
    }
  });
};

export const uploadToCloudinary = async (image) => {
  const fileBuffer = await image.arrayBuffer();
  var mime = image.type;
  var encoding = "base64";
  var base64Data = Buffer.from(fileBuffer).toString("base64");
  var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  return new Promise((resolve, reject) => {
    var result = cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
