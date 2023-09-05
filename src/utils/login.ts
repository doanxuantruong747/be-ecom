import axios from 'axios';
import { BadRequest } from 'ts-httpexceptions';

export async function verifyTokenLine(token: string) {
  return axios({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    baseURL: ' https://api.line.me/oauth2/v2.1/verify',
    method: 'POST',
    data: {
      id_token: token,
      client_id: process.env.LINE_CLIENT_ID,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new BadRequest(error.message);
    });
}

export async function veridyTokenFacebook(token: string) {
  // verfiy access token
  const id = await axios({
    baseURL: `https://graph.facebook.com/me?access_token=${token}`,
    method: 'GET',
  })
    .then((res) => {
      console.log(res.data);
      return res.data.id;
    })
    .catch((error) => {
      throw new BadRequest(error.message);
    });

  // get profiel user
  return axios({
    baseURL: `https://graph.facebook.com/${id}/?fields=id,name,email,picture&access_token=${token}`,
    method: 'GET',
  })
    .then((res) => {
      console.log('ss');
      return res.data;
    })
    .catch((error) => {
      throw new BadRequest(error.message);
    });
}

export async function verifyTokenGoogle(token: string) {
  return axios({
    baseURL: `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`,
    method: 'GET',
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new BadRequest(error.message);
    });
}
