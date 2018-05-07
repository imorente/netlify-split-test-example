import fetch from "node-fetch";

const SLACK_HOOK = process.env.SLACK_WEBHOOK_URL;

exports.handler = (event, context, callback) => {
  const { payload: deploy, site } = JSON.parse(event.body);
  const { branch, published_at } = deploy;
  fetch(SLACK_HOOK, {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      text: `branch: ${branch}, published_at: ${published_at}`
    })
  }).then(response =>
    callback(null, {
      statusCode: response.status,
      body: response.statusText
    })
  );
};
