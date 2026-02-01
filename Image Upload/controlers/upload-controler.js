const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary');
const uploadImageLocal = async (req, res) => {

	const image = req.files.image;

	const imagePath = path.join(__dirname, "../public/uploads/" + `${image.name}`);
	await image.mv(imagePath);

	res.status(200).json({ image: { src: `/uploads/${image.name}` } });
}

const uploadImage = async (req, res) => {
	const fileName = req.files.image.name.split(".")[0];
	console.log(fileName);

	const result = await cloudinary.v2.uploader.upload(req.files.image.tempFilePath, {
		display_name: fileName,
		public_id: fileName,
		asset_folder: "image-folder"
	});
	await fs.promises.unlink(req.files.image.tempFilePath);
	res.status(200).json({ image: { src: result.secure_url } })

}



module.exports = uploadImage;
