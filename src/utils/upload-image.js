import cloudinary from "@/utils/cloudinary";

export const uploadImage = async (file, folder) => {
  const bufffer = await file.arrayBuffer();
  const bytes = Buffer.from(bufffer);

  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        async (err, result) => {
          if (err) {
            return reject(err.message);
          }
          return resolve(result);
        }
      )
      .end(bytes);
  });
};

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
