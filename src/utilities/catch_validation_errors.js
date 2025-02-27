const catch_validation_errors = (res, err) => {
  if (err.name === "ValidationError") {
    let errors = {};
    err.inner.map((e) => {
      if (e.type === "noUnknown") {
        errors["keys"] = e.errors[0];
      } else {
        errors[e.path] = e.errors[0];
      }
    });
    return res.status(400).json({
      success: false,
      error: errors,
      messages: "Validation Error",
    });
  }

  res.status(500).json({
    success: false,
    message: err.message,
  });
};

module.exports = catch_validation_errors;
