module.exports = {
    generateSuccessResponse: (data, message) => {
      return {
        status: 'success',
        code: 200,
        message,
        data,
      };
    },
    generateFailResponse: message => {
      return {
        status: 'failed',
        code: 200,
        message
      }
    },
    generateErrorResponse: (code, message) => {
      return {
        status: 'error',
        code,
        message,
      };
    },
  };