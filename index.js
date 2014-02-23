function Reader(endian) {
  this.endian = null;

  if (endian)
    this.setEndian(endian);
};
module.exports = Reader;

Reader.prototype.setEndian = function setEndian(endian) {
  this.endian = /le|lsb|little/i.test(endian) ? 'le' : 'be';
};

Reader.prototype.readUInt8 = function readUInt8(buf, offset) {
  return buf.readUInt8(offset);
};

Reader.prototype.readInt8 = function readInt8(buf, offset) {
  return buf.readInt8(offset);
};

Reader.prototype.readUInt16 = function readUInt16(buf, offset) {
  if (this.endian === 'le')
    return buf.readUInt16LE(offset);
  else
    return buf.readUInt16BE(offset);
};

Reader.prototype.readInt16 = function readInt16(buf, offset) {
  if (this.endian === 'le')
    return buf.readInt16LE(offset);
  else
    return buf.readInt16BE(offset);
};

Reader.prototype.readUInt32 = function readUInt32(buf, offset) {
  if (this.endian === 'le')
    return buf.readUInt32LE(offset);
  else
    return buf.readUInt32BE(offset);
};

Reader.prototype.readInt32 = function readInt32(buf, offset) {
  if (this.endian === 'le')
    return buf.readInt32LE(offset);
  else
    return buf.readInt32BE(offset);
};

Reader.prototype.readUInt64 = function readUInt64(buf, offset) {
  var a = this.readUInt32(buf, offset);
  var b = this.readUInt32(buf, offset + 4);
  if (this.endian === 'le')
    return a + b * 0x100000000;
  else
    return b + a * 0x100000000;
};

Reader.prototype.readInt64 = function readInt64(buf, offset) {
  if (this.endian === 'le') {
    var a = this.readUInt32(buf, offset);
    var b = this.readInt32(buf, offset + 4);
    return a + b * 0x100000000;
  } else {
    var a = this.readInt32(buf, offset);
    var b = this.readUInt32(buf, offset + 4);
    return b + a * 0x100000000;
  }
};
