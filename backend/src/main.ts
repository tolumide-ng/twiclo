import cors from 'cors';
import express from 'express';
import Routes from './routes/v1';
import { ResponseGenerator } from './helpers/responseGenerator';

const app = express();
app.use(express.json({}));
app.use(cors());

Routes(app);

app.use((_, res) => {
  return ResponseGenerator.sendError(res, 404);
});
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  process.stdout.write(`Listening on port ${PORT}`);
});

export default app;
