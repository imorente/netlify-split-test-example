import fetch from "node-fetch";

const SLACK_HOOK =
  "https://hooks.slack.com/services/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";

exports.handler = (event, context, callback) => {
  const { payload: deploy, site } = JSON.parse(event.body);
  const { branch, published_at } = deploy;
  try {
    fetch(SLACK_HOOK, {
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        text: JSON.stringify({
          branch,
          published_at
        })
      })
    })
      .then(response => {
        console.log({ response });
        callback(null, {
          statusCode: response.status,
          body: response.statusText
        });
      })
      .catch(error => {
        console.log({ error });
        callback(null, { statusCode: 200, body: "error" });
      });
  } catch (error) {
    console.log(error);
    callback(null, { statusCode: 200, body: "error" });
  }
};
