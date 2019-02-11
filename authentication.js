'use strict';

const authentication = {
  type: 'custom',
  test: (z, bundle) => {
    return typeof bundle.authData.endpoint === 'string' && bundle.authData.length > 0
  },
  fields: [
    {
      key: 'endpoint',
      type: 'string',
      required: true,
      helpText: 'External endpoint where your MESG application is located.'
    },
    {
      key: 'auth',
      type: 'string',
      required: false,
      helpText: 'A verification token used to validate that requests came from Zapier.'
    }
  ]
};

module.exports = authentication;
