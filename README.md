# Crypty

_Crypty_ is a small tool for cryptographic encoding / decoding
of images.

# Before usage
First of all, you need to set up environment variables for the programme.
The first environment variable is `CRYPTY_SECRET_KEY`, and it can be used in the
following way:
```
CRYPTY_SECRET_KEY=<your value goes here>
```
You can think about `CRYPTY_SECRET_KEY` as a passphrase that is used
for encryption and decryption of images. Let's say you encrypt your image
with `CRYPTY_SECRET_KEY=4b0c51cfcc09816d60d1c711af56502005eb8a0237dac905f8cc9c5972d5340c`. 
It will mean that to decrypt the image we should use the same value for `CRYPTY_SECRET_KEY`.
In our case it's `4b0c51cfcc09816d60d1c711af56502005eb8a0237dac905f8cc9c5972d5340c`.
These random characters are just the hex representation of random byte array with length 32 bytes.

The second environment variable is `CRYPTY_INIT_VECTOR`.
It's used similarly to the previous parameter, and it's utilized for additional security while
encrypting the image:
```bash
CRYPTY_INIT_VECTOR=<your value goes here>
```
You need this initialization vector for decoding as
well. So, the value of `CRYPTY_SECRET_KEY` and `CRYPTY_INIT_VECTOR` should be consistent both
for encoding and decoding. The example of the value for `CRYPTY_INIT_VECTOR` is 
`CRYPTY_INIT_VECTOR=3d5b5b14c0c641640218e8b1a03b3e3b`. This is the hex representation of the random byte array with 
length 16 bytes.

In Linux and Mac you can set these values using `export` expression:
```bash
export CRYPTY_SECRET_KEY=4b0c51cfcc09816d60d1c711af56502005eb8a0237dac905f8cc9c5972d5340c
export CRYPTY_INIT_VECTOR=3d5b5b14c0c641640218e8b1a03b3e3b
```

How to get the value for `CRYPTY_SECRET_KEY` and ? 
In node-js you can get them like this:
```js
const crypto = require('crypto')

const secret_key = crypto.randomBytes(32);
console.log(secret_key.toString('hex'));

const initialization_vector = crypto.randomBytes(16);
console.log(initialization_vector.toString('hex'));
```

# Usage
When the environment variables are set. We can use the Crypty. Here are the instructions how to do it:
1) Navigate to `src` directory of the project:
```bash
cd ./src
```

2) use `node` command to run crypty and arguments of crypty to achieve the desired behaviour.
For example, if I put the `cat.png` image into `/src` directory(next to `crypty.js`), and I want to encrypt `cat.png` 
then I execute the following command:
```bash
node crypty.js encrypt img="./cat.png" out="./cat-encrypted"
```
* `encrypt` argument - says Crypty that we want to encrypt the image.
* `img` argument - specifies the location of the image for Crypty.
* `out` argument - specifies the path where the encrypted image should be put.

To decrypt the cat image we can use the following command:
```bash
node crypty.js decrypt img="./cat-encrypted" out="cat_as_image.png"
```
We should specify the action we want to perform, in this case it's "decrypt".
Then we specify where the encrypted image is located `img="./cat-encrypted"`. And then we
write the path where the decrypted image will be put.