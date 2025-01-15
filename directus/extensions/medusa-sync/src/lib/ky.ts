import ky from 'ky';

export const kyInstance = ky.create({
  prefixUrl: process.env.MEDUSA_BACKEND_URL,
  retry: {
    limit: 3,
    methods: ['get', 'post', 'put', 'delete', 'head'],
  },
  timeout: 10000,
});
