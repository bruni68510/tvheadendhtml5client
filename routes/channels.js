'use strict';

var express = require('express');
const request = require('request');
const jose = require('node-jose');

var router = express.Router();

/* GET home page. */
router.get('/list', function(req, res, next) {

    jose.JWE.createDecrypt(global.key)
        .decrypt(req.query.encoded)
        .catch(function(err) {
            console.log(err);
            res.end();
        })
        .then(function(decrypted) {

            const query = JSON.parse(decrypted.payload.toString());

            const url = "http://" + query.server + ":9981" + "/api/channel/grid";

            request.get(url, {
                    'auth': {
                        'user': query.username,
                        'pass': query.password,
                        'sendImmediately': false
                    },
                },
                function(error,response, body) {
                    if (error) {
                        console.log(response);
                        console.log(error);
                        res.end();
                    } else {
                        res.write(body);
                        res.end();
                    }
                });


        });

});

module.exports = router;


