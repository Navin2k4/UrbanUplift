import { Prisma } from "@prisma/client";

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Handle Prisma-specific errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          error: "A record with this value already exists",
          details: err.message,
        });
      case "P2025":
        return res.status(404).json({
          error: "Record not found",
          details: err.message,
        });
      default:
        return res.status(500).json({
          error: "Database error",
          details: err.message,
        });
    }
  }

  // Handle other types of errors
  return res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
