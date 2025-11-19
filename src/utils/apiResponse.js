function success(res, message, data = null, status = 200) {
  return res.status(status).json({ success: true, message, ...(data !== null ? data : {}) });
}

function error(res, message, details = null, status = 400) {
  const payload = { success: false, message };
  if (details) payload.details = details;
  return res.status(status).json(payload);
}

module.exports = { success, error };
