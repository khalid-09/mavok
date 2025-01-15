import { kyInstance } from './ky';

export const getMedusaAuthToken = async () => {
  try {
    const response = await kyInstance
      .post('auth/user/emailpass', {
        json: {
          email: process.env.MEDUSA_ADMIN_EMAIL,
          password: process.env.MEDUSA_ADMIN_PASSWORD,
        },
      })
      .json<{ token: string }>();

    return response.token;
  } catch (error) {
    console.error('Failed to get Medusa auth token:', error);
    throw error;
  }
};
