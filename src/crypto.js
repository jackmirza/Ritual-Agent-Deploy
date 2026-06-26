import * as secp from "@noble/secp256k1";
import { hkdf } from "@noble/hashes/hkdf";
import { sha256 } from "@noble/hashes/sha256";
import { concatBytes } from "@noble/hashes/utils";
import { bytesToHex, hexToBytes } from "viem";

const AES_GCM_TAG_BYTES = 16;
const NONCE_BYTES = 12;

function normalizePublicKey(publicKeyHex) {
  const clean = publicKeyHex.replace(/^0x/i, "");

  if (clean.length === 128) {
    return hexToBytes(`0x04${clean}`);
  }

  if (clean.length === 130 || clean.length === 66) {
    return hexToBytes(`0x${clean}`);
  }

  throw new Error("Executor public key has an unsupported length.");
}

function randomBytes(length) {
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
}

export async function encryptRitualEnv(publicKeyHex, payload) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Web Crypto is unavailable. Open the app on localhost or HTTPS.");
  }

  const receiverPublicKey = normalizePublicKey(publicKeyHex);
  const ephemeralSecret = secp.utils.randomPrivateKey();
  const ephemeralPublicKey = secp.getPublicKey(ephemeralSecret, false);
  const sharedPoint = secp.getSharedSecret(ephemeralSecret, receiverPublicKey, false);
  const master = concatBytes(ephemeralPublicKey, sharedPoint);
  const keyMaterial = hkdf(sha256, master, new Uint8Array(), new Uint8Array(), 32);
  const nonce = randomBytes(NONCE_BYTES);

  const cryptoKey = await globalThis.crypto.subtle.importKey(
    "raw",
    keyMaterial,
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );
  const encrypted = new Uint8Array(
    await globalThis.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: nonce, tagLength: AES_GCM_TAG_BYTES * 8 },
      cryptoKey,
      payload,
    ),
  );
  const ciphertext = encrypted.slice(0, encrypted.length - AES_GCM_TAG_BYTES);
  const tag = encrypted.slice(encrypted.length - AES_GCM_TAG_BYTES);

  return bytesToHex(concatBytes(ephemeralPublicKey, nonce, tag, ciphertext));
}

