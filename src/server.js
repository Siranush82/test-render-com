import express from 'express';
import composersRouter from './routers/composers/router.js';
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Composers API!");
});

app.use("/composers", composersRouter);

export default app;
