const app = require('./app');

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Cart service running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
