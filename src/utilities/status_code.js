const status_code_list = {
  400: {
    success: false,
    message: "Somthing went wrong.",
  },
  401: { success: false, message: "Unauthorized" },
  402: {
    success: false,
    message: "Payment is required to access this resource.",
  },
  403: {
    success: false,
    message: "You do not have permission to perform this action.",
  },
  404: { success: false, message: "Not Found" },
  405: {
    success: false,
    message: "Http Method not allowed",
  },
  500: {
    success: false,
    message: "An unexpected error occurred on the server.",
  },
};

module.exports = status_code_list;
