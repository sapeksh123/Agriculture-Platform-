import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary.js";

// Use multer memory storage so we can upload buffers to Cloudinary manually
const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });

// Upload buffer to Cloudinary using upload_stream
const uploadBufferToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Middleware that uploads any files present in req.files to Cloudinary and
// sets file.path to the uploaded file's secure_url so controllers remain unchanged.
const cloudinaryUploadMiddleware = async (req, res, next) => {
  try {
    if (!req.files) return next();

    // req.files is an object with fieldname -> array of files (for .fields())
    const fieldNames = Object.keys(req.files);

    for (const field of fieldNames) {
      const files = req.files[field];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Only process if buffer exists (memoryStorage)
        if (file && file.buffer) {
          const result = await uploadBufferToCloudinary(file.buffer, {
            folder: "uploads",
            resource_type: "image",
          });

          // Keep the same shape as multer-storage-cloudinary would provide
          file.path = result.secure_url;
          file.public_id = result.public_id;
          file.cloudinary_result = result;
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Export an object compatible with the current usage: calling upload.fields([...])
// will return an array of middleware: [multerFieldsMiddleware, cloudinaryUploadMiddleware]
export default {
  fields: (fieldsArray) => [upload.fields(fieldsArray), cloudinaryUploadMiddleware],
  single: (fieldName) => [upload.single(fieldName), cloudinaryUploadMiddleware],
  array: (fieldName, maxCount) => [upload.array(fieldName, maxCount), cloudinaryUploadMiddleware],
};
