module.exports = {
    generateSuccessResponse: (data, message) => {
      const total = typeof data === 'object' ? data.length : undefined;
      return {
        status: 'success',
        code: 200,
        message,
        total,
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