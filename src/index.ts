import express from "express";
import router from "./routes/index.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler, errorHandler } from './middleware/error.js';

const app = express();

app.use(express.json());

app.use(logger);

app.use(router);

app.get("/health", (req, res): void => {
  res.status(200).json({
    "success": true,
    "data": { "status": "ok" },
    "error": null
  });
});
app.get('/test-error', (_req, _res) => {
  throw new Error('Test error');
});
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

