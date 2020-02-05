
import "./lib/jose.js";

var cryptographer = new window.Jose.WebCryptographer();

export class Crypto {

    static getEncryptionKey() {

        return new Promise(function(resolve, reject) {

            fetch('/crypto/publickey')
                .then(response => {
                    if (response.ok) {
                        response.json().then(function(value){
                            resolve(value);
                        });

                    } else {
                        reject(new Error('Failed to load'));
                    }
                });

        });
    }

    static encryptRequest(data, key) {

        var rsa_key = window.Jose.Utils.importRsaPublicKey(
           key,
            "RSA-OAEP"
        );
        var encrypter = new window.Jose.JoseJWE.Encrypter(cryptographer, rsa_key);

        return new Promise(function (resolve, reject) {
            encrypter
                .encrypt(JSON.stringify(data))
                .then(function(result) {
                    resolve(result);
                })
                .catch(function(err) {
                    console.error(err);
                    reject(err);
                });
        });


    }

}
