const sample = require('../samples/sample_issue');

const sendData = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: `${bundle.authData.endpoint}/api/data`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: bundle.inputData.data,
      id: bundle.inputData['trigger-id'],
    })
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'mesg-send',
  noun: 'Mesg-send',

  display: {
    label: 'Respond to MESG',
    description: 'Return data to MESG that started from a previous MESG Trigger'
  },

  operation: {
    inputFields: [
      {key: 'trigger-id', label:'ID From Trigger', required: true},
      {key: 'data', label:'Data', required: false}
    ],
    perform: sendData,
    sample: {
      'trigger-id': '3432i432048302843',
      data: 'JSON'
    }
  }
};
