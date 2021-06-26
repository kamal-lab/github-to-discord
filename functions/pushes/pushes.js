const axios = require("axios").default;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const response = JSON.parse(event.body);
    var content = "New update from github";
    if (response && response.repository) {
      content = ":new: Your repository " + response.repository.name + " received a push :arrow_down:";
      if (response.pusher) {
        content += " from " + response.pusher.name;
      }
    }
    
    const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: content
    });
    console.log("Submitted!");
    return {
      statusCode: 204,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
