
const app = require('./app');
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
 console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
