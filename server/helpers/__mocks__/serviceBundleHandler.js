const getBundle = jest.fn();
getBundle.mockResolvedValue({
  headers: {
    etag: '12345ABCDE',
  },
  body: 'DOG',
  method: 'GET',
  status: 200,
});

const writeBundle = jest.fn();
writeBundle.mockResolvedValue({});

module.exports = {
  getBundle,
  writeBundle,
};
