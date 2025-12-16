const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendMail } = require('../utils/mailer');
const userRepo = require('../repositories/user.repo');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const { jwtSecret, jwtExpiration, jwtRefreshExpiration } = require('../config/index');

const register = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    return { accessToken, refreshToken };
};

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: jwtExpiration });
};

// Generate refresh token
const generateRefreshToken = async (user) => {
    const refreshToken = new RefreshToken({ userId: user._id });
    await refreshToken.save();
    return refreshToken.token;
};

// Verify access token
const verifyAccessToken = (token) => {
    return jwt.verify(token, jwtSecret);
};

// Verify refresh token
const verifyRefreshToken = async (token) => {
    const refreshToken = await RefreshToken.findOne({ token });
    if (!refreshToken) {
        throw new Error('Invalid refresh token');
    }
    return refreshToken;
};

// Logout user
const logout = async (token) => {
    await RefreshToken.deleteOne({ token });
};

async function requestPasswordReset(email) {
  const user = await userRepo.findByEmail(email);
  if (!user) return; // evitar filtración
  const token = jwt.sign({ sub: String(user._id), type: 'reset' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const resetUrl = `${process.env.PUBLIC_URL}/reset-password?token=${token}`;
  await sendMail({
    to: email,
    subject: 'Recupera tu contraseña',
    html: `<p>Haz clic para restablecer tu contraseña (expira en 1h):</p>
           <p><a href="${resetUrl}" target="_blank" rel="noopener">Restablecer contraseña</a></p>`,
  });
}

async function resetPassword(token, newPassword) {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (payload.type !== 'reset') throw new Error('Token inválido');
  const user = await userRepo.findById(payload.sub);
  if (!user) throw new Error('Usuario no encontrado');

  // evitar misma contraseña
  const isSame = await bcrypt.compare(newPassword, user.password || '');
  if (isSame) throw new Error('La nueva contraseña no puede ser igual a la anterior');

  user.password = newPassword;
  await user.save(); // hook hash
  return true;
}

module.exports = {
    register,
    login,
    verifyAccessToken,
    verifyRefreshToken,
    logout,
    requestPasswordReset,
    resetPassword,
};


