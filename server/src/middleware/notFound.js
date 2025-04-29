var db = require('./../config/db')

module.exports = (req, res, next) => {
    let id = req.params.id
    if (!id)
        return res.status(500).json({ msg: "Internal server error" })
    let query = `SELECT * FROM todo WHERE id = "${id}"`
    db.query(query, function(err, result) {
        if (err) throw err;
        if (result.length > 0)
            next()
        else
            res.status(404).json({ msg: "Not found" })
    });
}