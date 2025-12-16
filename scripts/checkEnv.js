const path = require('path');
const fs = require('fs');

const argv = process.argv.slice(2);
let argPath = null;
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--file' && argv[i + 1]) { argPath = argv[i + 1]; break; }
  if (a.startsWith('--file=')) { argPath = a.split('=')[1]; break; }
}

const envPath = argPath || process.env.ENV_FILE || '.env';
if (!fs.existsSync(envPath)) {
  console.error(`Archivo de env no encontrado: ${envPath}`);
  process.exit(1);
}

require('dotenv').config({ path: envPath, override: true, debug: false, quiet: true });

const required = ['MONGODB_URI','JWT_SECRET','JWT_EXPIRES_IN','PORT','PUBLIC_URL','COOKIE_NAME','COOKIE_SECURE','COOKIE_SAME_SITE'];
const errors = [];
const warns = [];
const val = k => process.env[k];

const isTrueFalse = v => v === 'true' || v === 'false';
const sameSiteOk = v => ['lax','strict','none'].includes(String(v).toLowerCase());

for (const k of required) if (!val(k)) errors.push(`Falta ${k}`);
if (val('JWT_SECRET') && val('JWT_SECRET').length < 16) errors.push('JWT_SECRET es muy corto (>=16)');
if (val('PORT') && (!/^\d+$/.test(val('PORT')) || Number(val('PORT')) < 1 || Number(val('PORT')) > 65535)) errors.push('PORT inválido');
if (val('MONGODB_URI') && !/^mongodb(\+srv)?:\/\//.test(val('MONGODB_URI'))) errors.push('MONGODB_URI inválida');
if (val('COOKIE_SECURE') && !isTrueFalse(val('COOKIE_SECURE'))) errors.push('COOKIE_SECURE debe ser true/false');
if (val('COOKIE_SAME_SITE') && !sameSiteOk(val('COOKIE_SAME_SITE'))) errors.push('COOKIE_SAME_SITE inválido');

const smtpKeys = ['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS','SMTP_FROM'];
const smtpAny = smtpKeys.some(k => val(k));
const smtpAll = smtpKeys.every(k => val(k));
if (smtpAny && !smtpAll) warns.push('SMTP_* parcialmente configurado');

const report = {
  using: path.resolve(envPath),
  ok: errors.length === 0,
  missingOrInvalid: errors,
  warnings: warns,
  sample: {
    MONGODB_URI: val('MONGODB_URI') ? 'OK' : 'missing',
    JWT_SECRET: val('JWT_SECRET') ? 'set' : 'missing',
    PORT: val('PORT') || 'missing',
    PUBLIC_URL: val('PUBLIC_URL') || 'missing',
    SMTP_CONFIGURED: smtpAll,
  },
};

console.log(JSON.stringify(report, null, 2));
process.exit(errors.length ? 1 : 0);