import express from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()

/* ================= AUTH MIDDLEWARE ================= */

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: "Acesso negado. Faça login." })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.id
    req.userRole = decoded.role

    next()
  } catch (err) {
    return res.status(401).json({ message: "Sessão inválida ou expirada." })
  }
}

const isAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Acesso restrito ao admin." })
  }
  next()
}

/* ================= REGISTER ================= */

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos." })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: "E-mail já cadastrado." })
    }

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    })

    res.status(201).json({
      message: "Conta criada com sucesso!",
      userId: user._id
    })

  } catch (err) {
    res.status(500).json({ message: "Erro ao registrar usuário." })
  }
})

/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      return res.status(401).json({ message: "Senha inválida." })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    const { password: _, ...userData } = user._doc

    res.json({
      user: userData,
      token
    })

  } catch (err) {
    res.status(500).json({ message: "Erro no login." })
  }
})

/* ================= GET PROFILE ================= */

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." })
    }

    res.json(user)

  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar perfil." })
  }
})

/* ================= UPDATE PROFILE ================= */

router.put("/me", verifyToken, async (req, res) => {
  try {
    const { name, email, password } = req.body

    const updateData = {}

    if (name) updateData.name = name
    if (email) updateData.email = email

    if (password) {
      const salt = await bcrypt.genSalt(12)
      updateData.password = await bcrypt.hash(password, salt)
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    ).select("-password")

    res.json(updatedUser)

  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar usuário." })
  }
})

/* ================= ADMIN ROUTE EXAMPLE ================= */

router.get("/admin-only", [verifyToken, isAdmin], (req, res) => {
  res.json({ message: "Bem-vindo ao painel admin." })
})

export default router