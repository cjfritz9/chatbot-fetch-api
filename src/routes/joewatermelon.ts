import express from 'express';
import getDogTreat from '../utils/joewatermelon';

const joeRouter = express.Router();

joeRouter.get('/auth', (req, res) => {
  console.log('full request: ', req);
  console.log('request url: ', req.url);
  console.log('request original url: ', req.originalUrl);
  console.log('request body: ', req.body);
  console.log('doc hash: ', document.location.hash)
  res.send('Success');
});

joeRouter.get('/dog_treat', (_req, res) => {
  res.send(getDogTreat());
});

export default joeRouter;

console.log(
  'https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=1xkvdpm0d3i7kkfsvcglm29dvv71g4&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth&scope=channel%3Aread%3Aredemptions&state=c3ab8aa609ea11e793ae92361f002671'
);
