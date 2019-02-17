const sampleData = {
  type: 'sample-type',
  data: "The data available will largely depend on what you provide to the MESG Service!"
}

const subscribeHook = (z, bundle) => {
  // `z.console.log()` is similar to `console.log()`.
  z.console.log('console says hello world!');

  // bundle.targetUrl has the Hook URL this app should call when a recipe is created.
  const data = {
    url: bundle.targetUrl,
    type: bundle.inputData.triggerKey,
    zap_id: bundle.meta.zap.id,
  };

  // You can build requests and our client will helpfully inject all the variables
  // you need to complete. You can also register middleware to control this.
  const options = {
    url: `${bundle.authData.endpoint}/api/hooks`,
    method: 'POST',
    // manually specify JSON type because zapier doesn't do it for some reason
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  // Whatever this function returns will be passed to our unsubscribe function
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

const unsubscribeHook = (z, bundle) => {
  // bundle.subscribeData contains the parsed response JSON from the subscribe
  // request made initially.
  const hookId = bundle.subscribeData.id;

  // You can build requests and our client will helpfully inject all the variables
  // you need to complete. You can also register middleware to control this.
  const options = {
    url: `${bundle.authData.endpoint}/api/hooks/${bundle.subscribeData.id}`,
    method: 'DELETE'
  };

  // You may return a promise or a normal data structure from any perform method.
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

const getRecipe = (z, bundle) => {
  // bundle.cleanedRequest will include the parsed JSON object (if it's not a
  // test poll) and also a .querystring property with the URL's query string.
  // const recipe = {
  //   type: bundle.cleanedRequest.type,
  //   data: bundle.cleanedRequest.data
  // };

  return [bundle.cleanedRequest];
};

const getFallbackRealRecipe = (z, bundle) => {
  // For the test poll, you should get some real data, to aid the setup process.
  const options = {
    method: 'GET',
    url: `${bundle.authData.endpoint}/api/samples/${bundle.inputData.triggerKey}`,
  };

  //return getRecipe(z, bundle)

  return z.request(options)
    .then((response) => JSON.parse(response.content));
  //return [sampleData, sampleData, sampleData]
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'recipe',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'MESG Event',
  display: {
    label: 'New MESG Event',
    description: 'Trigger this when a specific action happens in MESG'
  },

  // `operation` is where the business logic goes.
  operation: {

    // `inputFields` can define the fields a user could provide,
    // we'll pass them in as `bundle.inputData` later.
    inputFields: [
      { 
        key: 'triggerKey', 
        type: 'string',
        required: true,
        helpText: 'This is the unique key that is specified from you MESG Application to your MESG Zapier Service. This will enable you to have multiple Zaps inside of your MESG Applications.' }
    ],

    type: 'hook',

    performSubscribe: subscribeHook,
    performUnsubscribe: unsubscribeHook,
    perform: getRecipe,
    performList: getFallbackRealRecipe,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: sampleData,

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'type', label: 'Type'},
      {key: 'data', label: 'Your data'}
    ]
  }
};