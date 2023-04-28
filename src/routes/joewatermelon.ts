import express from 'express';
import axios from 'axios';
import getDogTreat from '../utils/joewatermelon';

const joeRouter = express.Router();

joeRouter.get('/auth', (req, res) => {
  console.log('full request: ', req);
  console.log('request url: ', req.url);
  console.log('request original url: ', req.originalUrl);
  console.log('request body: ', req.body);
  console.log('doc hash: ', document.location.hash);
  res.send('Success');
});

joeRouter.get('/token', async (_req, res) => {
  const response = await axios.post(
    'https://id.twitch.tv/oauth2/token',
    "client_id=1xkvdpm0d3i7kkfsvcglm29dvv71g4&client_secret=cme6w5kqh6b0bzvm7ag45ypfdxoibl&code=r1aikt0hk9fb7fuo7z0d8ppmdowb03&grant_type=authorization_code&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth"
  );
  console.log('full res: ', response)
  console.log('res data: ', response.data)
  if (response && response.data) {
    res.send(response.data)

  } else {
    res.send('Failed')
  }
});

joeRouter.get('/dog_treat', (_req, res) => {
  res.send(getDogTreat());
});

export default joeRouter;

console.log(
  'https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=1xkvdpm0d3i7kkfsvcglm29dvv71g4&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth&scope=channel%3Aread%3Aredemptions&state=c3ab8aa609ea11e793ae92361f002671'
);
console.log(
  'client_id=1xkvdpm0d3i7kkfsvcglm29dvv71g4&client_secret=cme6w5kqh6b0bzvm7ag45ypfdxoibl&code=e9au4i5p7wjvagobzu63bkeoy6ah4p&grant_type=authorization_code&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth'
);
