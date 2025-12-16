// Crea DTO para usuario
function userDTO(user) {
  if (!user) return null;
  return {
    id: String(user._id),
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

module.exports = { userDTO };