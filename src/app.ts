import express from "express";
import errorMiddleware from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
/**
 * @swagger
 * /health:
 * get:
 * summary: Check server health
 * description: Returns a success message if the server is running.
 * responses:
 * 200:
 * description: Server is healthy
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * message:
 * type: string
 */
app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Routes এখানে পরে আসবে
// app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);

export default app;
