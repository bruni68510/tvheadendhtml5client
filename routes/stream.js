'use strict';

var express = require('express');
const request = require('request');
const jose = require('node-jose');
const ip = require('ip');

var router = express.Router();

router.get('/', function(req, res, next) {

    jose.JWE.createDecrypt(global.key)
        .decrypt(req.query.encoded)
        .catch(function(err) {
            console.log(err);
            res.end();
        })
        .then(function(decrypted) {

            const query = JSON.parse(decrypted.payload.toString());

            const status_url = "http://" + query.server + ":9981" + "/api/status/connections";

            const cancel_url = "http://" + query.server + ":9981" + "/api/connections/cancel";

            const url = "http://" + query.server + ":9981" + "/playlist/ticket/channelnumber/" + req.query.channelnr + "?profile=webtv-h264-aac-matroska";

            request.get(status_url, {
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

                        const streams = JSON.parse(body);

                        for (var i = 0; i < streams.totalCount; i++) {
                            //console.log(streams.entries[i]);

                            const stream = streams.entries[i];
                            if (stream.peer === ip.address()) {
                                request.post(cancel_url, {
                                    'auth': {
                                        'user': query.username,
                                        'pass': query.password,
                                        'sendImmediately': false
                                    },
                                    'form' : { 'id': stream.id }
                                });
                            }
                        }

                        console.log(url);

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
                                    //
                                    const split = body.split("\n");

                                    const stream_url = split[split.length-2];

                                    req.pipe(request.get(stream_url)).pipe(res);
                                }
                            });
                    }
                });




        });

});

module.exports = router;
