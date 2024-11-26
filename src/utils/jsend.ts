/**
 * JSend response format for success, fail and error
 *
 * @see https://github.com/omniti-labs/jsend
 */
interface JSendSuccessResponse {
    status: 'success';
    data: any;
}

interface JSendFailResponse {
    status: 'fail';
    data: any;
}

interface JSendErrorResponse {
    status: 'error';
    message: string;
    code?: number | null;
    data?: any;
}

export const jsendSuccess = (data: any): JSendSuccessResponse => {
    return {
        status: 'success',
        data,
    };
};

export const jsendFail = (data: any): JSendFailResponse => {
    return {
        status: 'fail',
        data,
    };
};

export const jsendError = (
    message: string,
    data?: any,
    code?: number,
): JSendErrorResponse => {
    return {
        status: 'error',
        message,
        code: code === undefined ? null : code, // only error has code as defined in https://github.com/omniti-labs/jsend
        data: data === undefined ? null : data,
    };
};
