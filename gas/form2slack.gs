const WEBHOOK_URL = "";
const CHANNEL_NAME = "#channel_name";
const POST_USER_NAME = "user name";
const POST_USER_EMOJI = ":calendar:";

function sendToSlack(body, channel) {
    const url = "";
    const data = {"channel": channel, "username": POST_USER_NAME, "text": body, "icon_emoji": POST_USER_EMOJI};
    const payload = JSON.stringify(data);
    const options = {
        "method": "POST",
        "contentType": "application/json",
        "payload": payload
    };
    UrlFetchApp.fetch(WEBHOOK_URL, options);
}

function test() {
    sendToSlack("This is just test", CHANNEL_NAME);
}

function onFormSubmit(e) {

    const notification_title = "slack notification body";
    const itemResponse = e.response.getItemResponses();
    const notification_body = [
        notification_title,
        "from: " + e.response.getRespondentEmail()
    ];

    for (let i = 0; i < itemResponse.length; i++) {
        const formData = itemResponse[i];

        switch (formData.getItem().getTitle()) {
            case "title":
                notification_body.push("title: " + formData.getResponse());
                break;
            default:
                break;
        }
    }

    sendToSlack(notification_body.join("\n"), CHANNEL_NAME);
}
