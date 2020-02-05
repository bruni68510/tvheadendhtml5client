'use strict';
var express = require('express');
const jose = require('node-jose');
var router = express.Router();

const constkey = {
    kty: 'RSA',
    kid: '32ZZpVBbesSSUvpd-pONd_QssKaQmUVgJBxLmxKqTD4',
    e: 'AQAB',
    n: '7HNxed35XeVV4sqRjdK-nuHsY9X4HM_9uo_6fAhYW4ueTPaycA4P2Jx2Zlmag7pu14XkLszGsoc2ex62q-nLqxKTeqaSCLSGMTpc8WYVz_7cekrpRSLB5mOGZKJ_2SLJCyehXbBmwc_7N4iVYYzKjlMmCqPeyApMVwb06gMHOvc5pRyDU2CanElY-qtPRVDztfZ2QPeX-8IBd-CgbXJG1ozr0jAXL71HgNv1xpVKdFoEfyRXgNe7YvO17VjN-DUyrQfwxl12N3PQ9yjUyYLkqfapoP_7P73WT01sS8JOEG3DGTMmGSulMIYVYtONbwKAcYmbszOb92o5JcgSIIPofQ',
    d: 'Gt43W8i8aE4CB2ZLSdlTrcwwR1vt-KAtzcBEj0mHeMeRsl8qAY-nf06wKYsvAp7xr23YcvTz8x9oMm9YBIrpiMPwnDRHTdPtl7RxEUEvY1YriX3vqdp8PAi9IbxRWMQaIjlbncDIvGc8vZ-4kcAk2C1cmkLqssJw0EbLF7hGXw22xJ5B1OWOXxPJ4dGzqBp33cJaPJwISeT4sT-BGSdGMRpMpwZAECUBai99ODw3ES5_W9WZElqiA62Rf3PmsW5sB3icP_lXKddGk5Q2waAMIkpZhYAEqCCqt7DwZSU4l-YaK2jPc2WXYFZHrssjm7PaxH8AYcEL_R2SNz0n3ApHgQ',
    p: '-aUpHggK57ZX-ITovCx7OYFIM7GcSYKi8ySOOJZGl4eueyMgVzpLJZPYyTpG4-8OyTVQfNPBiaGpQ5w0i2RGN4ge5bUmfUB1U7Rye7eWccw9IYsemqgMA81VjcPUmohkixFLxY2V0-1_fRrtpNAUWZOaDLRwCSq8Igd7-9rerh0',
    q: '8nhNGi1Gzf_SnIdgAGLGHyBs8fu8Wq3hQvt72ftAvt4ZD2NMsikK0Aj2rncmYEjxsn5suok1QgEbhFRTLbwDJOFxLsxoVQSpJy_8BF9YgGYUJ2PlXAzE3z-8q53ofC52Qg0YZwkF0rVFFxej0t24RJ_tz0C3noz2KnqM4gNuleE',
    dp: 'oV3K2Cims-Q_tNpkfc3a0O7qNs_lj_arUbMdYyJv-t6vP9USwI9jp6SLinbq_8a0rgaSQj22ajpe6N79b-SfJqIMJrsTZ_7UWAjZv3KKAoDcOuRsIdfh_Esrs_kTYdgr9WB2s_mzEUwBDmLrnY8KuGQaPYAcszA2b2CbGc7-BVk',
    dq: 'U2Ca4s1-84ds3PaQRJGynzF_RRbThjsUovvncuW7NecZpvj2fq0uUqtCaGwAfkuXEVH4AYz9C11mIPL-R1PHoP8E9JrFpbaclCUj_DztKfnwJDttu2GIsVwxfLIoJ8uyTrRCF-w6XGKJB4_RfclQfAiitgoDGjpOy_yoRW_4rwE',
    qi: 's9ISbsM0U6D6GhGAHeckT7aH2vx6LoxfKW5JRgb6HApEBWlRuB8F9eIDHMWCzjH3xw4Yd4vSgPzx-Q5OuL5tYZ4gw1_nNt8cpaa7JoAUT83bukL2fRH87BNDLAmroq8ILKCyi9liRVxBoR4xDsupdOYIhRq-NyKqOM9P155KO54'
};


global.key = null;

const keystore = jose.JWK.createKeyStore();

//keystore.add(constkey).
keystore.generate('RSA', 2048).
then((result) => {
    global.key = result;
    console.log(global.key.toJSON(true));
});


router.get('/publickey', function(req, res, next) {
    res.send(global.key.toJSON());
    res.end();
});


module.exports = router;
