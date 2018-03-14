const response = {};
response.get = jest.fn();
response.get.mockResolvedValueOnce({
  statusCode: 200,
});
response.get.mockResolvedValueOnce({
  body: [{}, {}, {}],
  statusCode: 200,
});
response.get.mockResolvedValueOnce({
  statusCode: 404,
});
response.get.mockResolvedValueOnce({
  statusCode: 200,
  body: Array(70000).fill('A').join(''),
});

const request = jest.fn(() => response);

module.exports = request;
