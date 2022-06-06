function sendToSlack(body, channel) {
    let url = "";
    let data = { "channel" : channel, "username" : "bot name", "text" : body, "icon_emoji" : ":tada:" };
    let payload = JSON.stringify(data);
    let options = {
        "method" : "POST",
        "contentType" : "application/json",
        "payload" : payload
    };
    UrlFetchApp.fetch(url, options);
}

function test() {
    sendToSlack("This is just test", "");
}

function onFormSubmit(e) {

    var notification_title = "slack notification body\n";
    let itemResponse = e.response.getItemResponses();

    for (var i = 0; i < itemResponse.length; i++){
        var formData = itemResponse[i];

        switch (formData.getItem().getTitle()) {
            case "title name":
                var value = formData.getResponse();
                break;
            default:
                break;
        }
    }

    let notification_body = [
        notification_title,
        value
    ].join("\n");

    sendToSlack(notification_body, "");
}