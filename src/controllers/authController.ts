import User from "../models/User.js"

/* REGISTRAR */

export const register = async (req, res) => {
  try{
    const { name, email, password } = req.body

    const user = await User.create({
      name,
      email,
      password
    })

    res.json(user)

  }catch(err){
    res.status(500).json({ error: err.message })
  }
}

/* LOGIN */

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email, password })

  if(!user){
    return res.status(400).json({ error: "Usuário não encontrado" })
  }

  res.json({
    user,
    token: "fake-token"
  })
}

/* UPDATE */

export const updateUser = async (req, res) => {
  const { id } = req.params

  const user = await User.findByIdAndUpdate(id, req.body, { new: true })

  res.json(user)
}

/* DELETE */

export const deleteUser = async (req, res) => {
  const { id } = req.params

  await User.findByIdAndDelete(id)

  res.json({ message: "Deletado" })
}