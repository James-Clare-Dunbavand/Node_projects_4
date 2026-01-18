
const pathNotFound = (req, res) => {
	return res.status(404).json({ msg: 'path not found' })
}
module.exports = pathNotFound;
