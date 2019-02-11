'use strict';

const authentication = {
  type: 'custom',
  test:{
    url: "{{bundle.authData.endpoint}}/verify"
  },
  fields: [
    {
      key: 'endpoint',
      type: 'string',
      required: true,
      helpText: 'External endpoint where your MESG application is located. Ex: https://sub.domain.com'
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
