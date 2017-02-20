/**
 * Turn non-alpha-numeric (and underscore) characters into an escape sequence
 * prefixed with exclamation point and the hex code. Handles utf8 strings
 * and arrays. Arrays will just have each value escaped individually.
 */
export function escapeName(value) {
  if (Array.isArray(value)) {
    return value.map(escapeName);
  }
  const part1 = value.replace(/[^a-z0-9_]/uig, (c) => {
    const code = Buffer.from(c, 'utf8').toString('hex');
    return `!${code}`;
  });
  return part1.replace(/_/g, '__').replace(/!/g, '_');
}

function countOnes(c) {
  let r = c;
  let ones = 0;
  // eslint-disable-next-line no-bitwise
  while (r & 0x80) {
    ones += 1;
    // eslint-disable-next-line no-bitwise
    r <<= 1;
  }
  return ones || 1;
}

/**
 * Turn an escaped name back into its utf8 equivalent. Also handles arrays
 * to avoid delimeter issues in the original strings
 */
export function unescapeName(value) {
  if (Array.isArray(value)) {
    return value.map(unescapeName);
  }
  let retVal = '';
  let inEscape = false;
  for (let spot = 0, length = value.length; spot < length; spot += 1) {
    const c = value[spot];
    if (inEscape) {
      if (c === '_') {
        retVal += c;
      } else {
        // First character of UTF8
        spot += 1;
        const firstByte = parseInt(`${c}${value[spot]}`, 16);
        const utf8Length = countOnes(firstByte);
        const activeBuffer = Buffer.alloc(utf8Length);
        activeBuffer[0] = firstByte;
        for (let read = 1; read < utf8Length; read += 1) {
          activeBuffer[read] = parseInt(`${value[spot + 1]}${value[spot + 2]}`, 16);
          spot += 2;
        }
        retVal += activeBuffer.toString('utf8');
      }
      inEscape = false;
    } else if (c === '_') {
      inEscape = true;
    } else {
      retVal += c;
    }
  }
  return retVal;
}
