const server = require('./server');

// 404
server.use((req, res) => res
  .status(404)
  .send({
    message: `[Route] --> ❓  ${req.url} ❓  <-- Not found. `,
  }));
// 500 - Any server error
server.use((err, req, res) => res.status(500).json({ error: err }));
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`
-----------------------------------------------------------------------
                🔥  Server listening on port ${port}  🔥
-----------------------------------------------------------------------
    `);
});
