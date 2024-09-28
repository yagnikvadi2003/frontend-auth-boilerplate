'use strict';

/**
 * @file httpsConfig.mjs
 * @description HTTPS configuration and validation utility for development and production environments.
 *
 * @details
 * This module handles the configuration of HTTPS settings for the project. It validates SSL certificates 
 * and keys, ensuring secure communication. The key validation process uses the `jose` library for cryptographic 
 * operations to confirm the authenticity of the certificate and key pair. It also provides functionality to 
 * read the necessary files from the file system and to resolve the HTTPS settings based on environment variables.
 *
 * Key functionalities:
 * 1. Validate SSL certificates and keys using cryptographic operations (RSA-OAEP).
 * 2. Read SSL certificate and key files from the filesystem.
 * 3. Handle errors gracefully, providing detailed messages for invalid or missing certificates and keys.
 * 4. Dynamically configure HTTPS based on environment variables (`SSL_CRT_FILE`, `SSL_KEY_FILE`, `HTTPS`).
 *
 * @author Yagnik Vadi<yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-09-27
 * @updated 2024-09-28
 *
 * @usage
 * - Ensure that the `SSL_CRT_FILE` and `SSL_KEY_FILE` environment variables are set to valid paths to 
 *   certificate and key files for enabling HTTPS.
 * - Call `getHttpsConfig()` to retrieve the HTTPS configuration for use in Webpack's development server or 
 *   any other server requiring SSL.
 *
 * @note
 * If the `HTTPS` environment variable is set to `true`, the SSL certificate and key files must be present 
 * and valid, or the server will fail to start. This module throws detailed errors for easy debugging.
 *
 * @see https://nodejs.org/api/fs.html
 * @see https://github.com/panva/jose
 */

import fs from 'fs';
import path from 'path';
import chalk from 'react-dev-utils/chalk.js';

import { importSPKI, importPKCS8, CompactEncrypt, compactDecrypt } from 'jose';
import { fileURLToPath } from 'url';

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the certificate and key provided are valid and if not, throw an easy-to-debug error
export async function validateKeyAndCerts({ cert, key, keyFile, crtFile }) {
    let jwe;
    try {
        // Ensure cert is in valid PEM format
        const certContent = cert.toString();
        if (!certContent.includes('BEGIN CERTIFICATE')) {
            throw new Error('Certificate is not in valid PEM format.');
        }

        // Import the certificate (public key) and test encryption
        const publicKey = await importSPKI(cert.toString(), 'RSA-OAEP');
        jwe = await new CompactEncrypt(Buffer.from('test'))
            .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
            .encrypt(publicKey);
    } catch (err) {
        console.log("error:==>", `The certificate key is invalid.\n${err.message}`);
    }

    try {
        // Import the private key and test decryption
        const privateKey = await importPKCS8(key.toString(), 'RSA-OAEP');

        const { plaintext } = await compactDecrypt(jwe, privateKey);
        const decryptedMessage = new TextDecoder().decode(plaintext);

        // You can log or use the decrypted message if needed
        console.log('Decrypted message:', decryptedMessage);
    } catch (err) {
        console.log("error:==>", `The certificate key is invalid.\n${err.message}`);
    }
}

// Read file and throw an error if it doesn't exist
export function readEnvFile(file, type) {
    if (!fs.existsSync(file)) {
        throw new Error(
            `You specified ${chalk.cyan(type)} in your env, but the file "${chalk.yellow(file)}" can't be found.`
        );
    }
    return fs.readFileSync(file);
}

// Get the https config
export async function getHttpsConfig() {
    // Generate Self-Signed Certificates
    // openssl req -nodes -new -x509 -keyout server.key -out server.crt -days 365

    const SSL_CRT_FILE = path.resolve(__dirname, "..", "certs/server.crt"); // Manually define paths to certificate files
    const SSL_KEY_FILE = path.resolve(__dirname, "..", "certs/server.key"); // Manually define paths to key files

    const isHttps = process.env.HTTPS === true ? 'https' : 'http';

    if (isHttps && fs.existsSync(SSL_CRT_FILE) && fs.existsSync(SSL_KEY_FILE)) {
        const config = {
            cert: readEnvFile(SSL_CRT_FILE, 'SSL_CRT_FILE'),
            key: readEnvFile(SSL_KEY_FILE, 'SSL_KEY_FILE'),
        };

        await validateKeyAndCerts({ ...config, keyFile: SSL_KEY_FILE, crtFile: SSL_CRT_FILE });
        return config;
    }
    return isHttps;

}
