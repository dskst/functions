function sendToSlack(body, channel) {
    const url = "";
    const data = { "channel" : channel, "username" : "user name", "text" : body, "icon_emoji" : ":calendar:" };
    const payload = JSON.stringify(data);
    const options = {
        "method" : "POST",
        "contentType" : "application/json",
        "payload" : payload
    };
    UrlFetchApp.fetch(url, options);
}

function test() {
    sendToSlack("This is just test", "#channel_name");
}

function onFormSubmit(e) {

    const notification_title = "slack notification body";
    const itemResponse = e.response.getItemResponses();
    const notification_body = [
        notification_title,
        "from: " + e.response.getRespondentEmail()
    ];

    for (let i = 0; i < itemResponse.length; i++){
        const formData = itemResponse[i];

        switch (formData.getItem().getTitle()) {
        case "title":
            notification_body.push("title: " + formData.getResponse());
            break;
        default:
            break;
        }
    }

    sendToSlack(notification_body.join("\n"), "#channel_name");
}