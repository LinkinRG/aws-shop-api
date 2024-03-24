import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${ handlerPath(__dirname) }/handler.getProducts`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        documentation: {
          summary: 'Get Products',
          methodResponses: [{
            statusCode: 200,
            responseModels: {
              'application/json': 'GetProducts',
            }
          },
          ]
        },
      },
    },
  ],
};
