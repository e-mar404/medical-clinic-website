const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json'
};

function PostData (req) {
    return new Promise((resolve, reject) => {
          try {
                  let body = '';
                  req.on('data', (chunk) => {
                            body += chunk.toString();
                          });

                  req.on('end', () => {
                            resolve(body);
                          });
                } catch (error) {
                        reject(error);
                      }
        });
}

module.exports = { headers, PostData };
