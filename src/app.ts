import express from "express";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Routes এখানে পরে আসবে
// app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);

export default app;
