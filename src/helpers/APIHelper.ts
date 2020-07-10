import { customAxios } from './axios';

export class APIHelper {
  public static request = async (method: any, url: string, data?: object) => {
    const response = await customAxios.request({
      method,
      url,
      data,
    });

    return response;
  };
}
