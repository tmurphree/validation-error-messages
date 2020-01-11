const main = function main(args = { strict: false }) {
  if (x === undefined) {
    throw new Error('some error');
  }

  return true;
};

module.exports = {
  ...main(),
  strict: { ...main({ strict: true }) },
};
