import type { AWS } from '@serverless/typescript';

import getProducts from '@functions/getProducts';
import getProductById from '@functions/getProductById';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-openapi-documentation', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-north-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { getProductById, getProducts },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    documentation: {
      version: '1',
      title: 'My API',
      description: 'This is my API',
      models: [
        {
          name: 'GetProducts',
          contentType: 'application/json',
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                count: { type: 'number' },
                description: { type: 'string' },
                id: { type: 'string' },
                price: { type: 'number' },
                title: { type: 'string' },
              }
            }
          }
        },
        {
          name: 'Product',
          contentType: 'application/json',
          schema: {
            type: 'object',
            properties: {
              count: { type: 'number' },
              description: { type: 'string' },
              id: { type: 'string' },
              price: { type: 'number' },
              title: { type: 'string' },
            }
          }
        },
        {
          name: 'NotFoundError',
          contentType: 'application/json',
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            }
          }
        },
      ]
    }
  },
};

module.exports = serverlessConfiguration;
