'use scrict';

var express = require("express");
const jose = require('node-jose');
const request = require('request');

var router = express.Router();
router.get("/", function(req, res, next) {

    jose.JWE.createDecrypt(global.key)
        .decrypt(req.query.encoded)
        .catch(function(err) {
            console.log(err);
            res.end();
        })
        .then(function(decrypted) {

            const query = JSON.parse(decrypted.payload.toString());
            const url = "http://" + query.server + ":9981" + "/" + req.query.url;

            request.get(url, {
                'auth': {
                    'user': query.username,
                    'pass': query.password,
                    'sendImmediately': false
                },
                encoding: null,
            }, function(error,response, body) {
                    if (error) {
                        console.log(response);
                        console.log(error);
                        res.end();
                    } else {
                        res.write(body);
                        res.end();
                    }
                }
            );
        });

});

module.exports = router;
