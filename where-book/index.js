/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const rp = require('request-promise');
const { Datastore } = require('@google-cloud/datastore');

exports.whereBook = async (req, res) => {
    const payload = req.body;
    if (payload.type === 'url_verification') {
        return res.status(200).json({ challenge: payload.challenge });
    }

    if (payload.text == null | payload.text == '') {
        return res.status(200).end();
    }

    const datastore = new Datastore({
        projectId: 'YOUR_PROJECT_ID',
    });

    try {
        const isbn = payload.text.replace(/-\s+/g, "");
        const key = datastore.key(['Book', isbn]);
        const entity = await datastore.get(key);

        console.log(isbn);
        console.log(entity);

        if (isbn.length !== 13) {
            response = [`ISBN: ${isbn}`, 'ISBNコードを間違えています'];
        } else if (!entity[0]) {
            response = [`ISBN: ${isbn}`, '登録されていない書籍です'];
        } else {
            lentalStatus = entity[0].isLent ? '貸出中' : '本棚にあり';
            response = [
                `ISBN: ${isbn}`, 
                `書籍名: ${entity[0].title}`,
                `貸出状況: ${lentalStatus}`,
                `最後に借りた人: ${entity[0].latestLender}`,
                entity[0].imageLinks.thumbnail
            ]
        }

        await rp({
            method: 'POST',
            uri: payload.response_url,
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            json: true,
            body: { text: response.join("\n") }
        });
        console.log(`text:${response.join(',')}, user:${payload.user_name}`);
    } catch (e) {
        console.log(`post message is failed: ${e}`);
    } finally {
        res.status(200).end();
    }
};
