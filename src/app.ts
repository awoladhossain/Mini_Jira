import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import errorMiddleware from "./middlewares/error.middleware";
import userRouter from "./modules/user/user.route";
import authRouter from "./modules/auth/auth.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check server health
 *     description: Returns a success message if the server is running.
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
app.get("/api/v1/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorMiddleware);

export default app;
