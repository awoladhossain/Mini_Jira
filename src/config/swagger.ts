import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "Mini Jira - Team Task Manager API",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    "./src/app.ts", // health রুটটি app.ts এ আছে, তাই এটি যোগ করতে হবে
    "./src/modules/**/*.ts", // আপনার সব মডিউলের রুট ফাইলগুলো পড়ার জন্য
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
