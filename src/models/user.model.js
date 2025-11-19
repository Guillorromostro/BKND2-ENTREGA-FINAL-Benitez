const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const isBcryptHash = (val) => typeof val === 'string' && /^\$2[aby]\$\d{2}\$/.test(val);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

// Aplicar hash en create/save
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  if (isBcryptHash(this.password)) return next();
  try {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  } catch (e) {
    next(e);
  }
});

// Hash en updates (findOneAndUpdate / findByIdAndUpdate)
userSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() || {};
  if (update.password && !isBcryptHash(update.password)) {
    try {
      update.password = bcrypt.hashSync(update.password, 10);
      this.setUpdate(update);
    } catch (e) {
      return next(e);
    }
  }
  next();
});

// Método de ayuda (opcional)
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compareSync(plain, this.password);
};

module.exports = mongoose.model('User', userSchema);

