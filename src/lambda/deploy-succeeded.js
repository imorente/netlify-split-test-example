exports.handler = async (event, context) => {
  console.log("deploy succeeded", { event, context });
  return {
    statusCode: 200,
    body: "Hello, Lambda!"
  };
};
