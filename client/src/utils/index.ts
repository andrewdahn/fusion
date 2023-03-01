/**
 * @returns {string} Shorts address for readability
 */
export const formatAddr = (address: string) => {
  if (!address) return;
  const first = address.substring(0, 6);
  const last = address.substring(address.length - 4, address.length);
  return `${first}...${last}`;
};
