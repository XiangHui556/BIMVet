async function getAccesstoken() {
  return new Promise((resolve, reject) => {
    const url = 'https://developer.api.autodesk.com/authentication/v2/token';
    const clientId = 'jHdAZq9NRcQwHoeHsRJUc4owAc98HavH';
    const clientSecret = 'Zygab7khXtIwY7r2';

    const basicAuth = btoa(`${clientId}:${clientSecret}`);
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append(
      'scope',
      'bucket:create bucket:read data:create data:write data:read viewables:read'
    );

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: `Basic ${basicAuth}`,
      },
      body: formData.toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Token response:', data);
        resolve(data); // Resolve the promise with the token data
      })
      .catch((error) => {
        console.error('Error fetching token:', error);
        reject(error); // Reject the promise with the error
      });
  });
}

async function createBucket(accessToken) {
  return new Promise((resolve, reject) => {
    const url = 'https://developer.api.autodesk.com/oss/v2/buckets';

    const bucketName = 'test_bucket';
    const bucketCreateData = {
      bucketKey: bucketName,
      access: 'full',
      policyKey: 'transient',
    };
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bucketCreateData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Bucket response:', data);
        resolve(data); // Resolve the promise with the token data
      })
      .catch((error) => {
        console.error('Error fetching bucket:', error);
        reject(error); // Reject the promise with the error
      });
  });
}

const Client = { getAccesstoken, createBucket };
export default Client;
