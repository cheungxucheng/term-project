var db = require('./../../config/db');

exports.register = function(res, query, query2, jsw, email, password) {
    db.query(query, function(err, result) {
        if (err) throw err
        if (result.length > 0)
            res.status(500).json({msg: "Account already exists"})
        else {
            db.query(query2, function (err, result) {
                if (err) throw err
                const token = jsw.sign({email:email, password:password}, process.env.SECRET)
                res.status(200).json({token})
            });
        }
    });
}
exports.login = function(res, query, jsw, password, email, bcrypt, query2) {
    db.query(query, function(err, result) {
        if (result.length > 0) {
            let password2 = result[0].password
            let id2 = result[0].id
            if (bcrypt.compareSync(password, password2)) {
                db.query(query2, function(err, result) {
                    const token = jsw.sign({result}, process.env.SECRET)
                    res.status(200).json({token})
                })
            } else
                res.status(401).json({ msg: "Invalid Credentials" });
        } else
            res.status(401).json({ msg: "Invalid Credentials" });
    })
}