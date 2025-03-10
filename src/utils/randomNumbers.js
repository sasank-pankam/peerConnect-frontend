/**
 * @returns {BigInt}
 */
export const getRandom255BitNumber = () => {
  const randomBytes = new Uint8Array(20); // 160 bits
  window.crypto.getRandomValues(randomBytes);

  // Set the most significant bit of the first byte to 0 for 255 bits
  randomBytes[0] &= 0x7f;

  let result = 0n; // Initialize BigInt
  for (let byte of randomBytes) {
    result = (result << 8n) | BigInt(byte); // Shift and combine each byte
  }
  return result.toString();
};
