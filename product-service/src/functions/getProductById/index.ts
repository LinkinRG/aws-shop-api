import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${ handlerPath(__dirname) }/handler.getProductById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        request: {
          parameters: {
            paths: {
              id: {
                required: true,
              },
            },
          },
        },
        documentation: {
          summary: 'Get Product By ID',
          pathParams: [
            {
              name: 'id',
              description: 'ID of a Product',
            }
          ],
          methodResponses: [
            {
              statusCode: 200,
              responseModels: {
                'application/json': 'Product',
              }
            },
            {
              statusCode: 404,
              responseModels: {
                'application/json': 'NotFoundError',
              }
            },
          ]
        },
      },
    },
  ],
};
