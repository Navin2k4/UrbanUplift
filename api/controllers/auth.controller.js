import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "7d";

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Helper function to set cookies
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const registerCitizen = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "CITIZEN",
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        organizationId: true,
        employeeId: true,
        department: true,
        collegeId: true,
        collegeRole: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

const handleSuccessfulLogin = (res, user) => {
  const token = generateToken(user);
  setTokenCookie(res, token);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    ...(user.organizationId && { organizationId: user.organizationId }),
    ...(user.employeeId && { employeeId: user.employeeId }),
    ...(user.department && { department: user.department }),
    ...(user.collegeId && { collegeId: user.collegeId }),
    ...(user.collegeRole && { collegeRole: user.collegeRole }),
  };
};

export const loginCitizen = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== "CITIZEN") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const userData = handleSuccessfulLogin(res, user);
    res.json({ user: userData });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// NGO Authentication
export const registerNGO = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      organizationId,
      registrationNumber,
      description,
      phoneNumber,
      address,
    } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Organization already registered" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "NGO",
        emailVerified: false,
        organizationId,
        registrationNumber,
        description,
        phoneNumber,
        address,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizationId: user.organizationId,
        registrationNumber: user.registrationNumber,
        description: user.description,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("NGO Registration Error:", error);
    res
      .status(500)
      .json({ message: "Error registering NGO", error: error.message });
  }
};

export const loginNGO = async (req, res) => {
  try {
    const { email, password, organizationId } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== "NGO") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const userData = handleSuccessfulLogin(res, user);
    res.json({ user: userData });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Government Authentication
export const registerGovernment = async (req, res) => {
  try {
    const { email, password, name, employeeId, department } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "GOVT",
        emailVerified: false,
        employeeId,
        department,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        employeeId: user.employeeId,
        department: user.department,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering government official",
      error: error.message,
    });
  }
};

export const loginGovernment = async (req, res) => {
  try {
    const { email, password, employeeId } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== "GOVT") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const userData = handleSuccessfulLogin(res, user);
    res.json({ user: userData });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// College Authentication
export const registerCollege = async (req, res) => {
  try {
    const { email, password, name, collegeId, role: collegeRole } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "NSS",
        emailVerified: false,
        collegeId,
        collegeRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        collegeId: user.collegeId,
        collegeRole: user.collegeRole,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering college user",
      error: error.message,
    });
  }
};

export const loginCollege = async (req, res) => {
  try {
    const { email, password, collegeId } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== "NSS") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const userData = handleSuccessfulLogin(res, user);
    res.json({ user: userData });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
