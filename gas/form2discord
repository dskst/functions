function onFormSubmit(e) {
  const webhookUrl = '#'; 

  const form = FormApp.getActiveForm();
  const formResponses = form.getResponses(e.response.getTimestamp());
  const latestResponse = formResponses[formResponses.length - 1];
  const itemResponses = latestResponse.getItemResponses();

  let message = 'フォームの投稿がありました！\n\n';

  for (let i = 0; i < itemResponses.length; i++) {
    const itemResponse = itemResponses[i];
    const question = itemResponse.getItem().getTitle();
    const answer = itemResponse.getResponse();
    message += `**${question}**\n${answer}\n\n`;
  }

  const payload = {
    'content': message
  };

  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  UrlFetchApp.fetch(webhookUrl, options);
}
