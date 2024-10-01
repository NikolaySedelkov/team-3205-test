import express from 'express';
import dotenv from 'dotenv';

import _data from './resources/data.json';
import type { TypeEmailNumber } from './types/data';

const data: TypeEmailNumber[] = _data;

dotenv.config();

const app = express();
const port = process.env.MAIN_PORT;

app.use(express.json());

const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
app.post('/api/find', (req, res) => {
  setTimeout(()=>{
    if('email' in req.body && 'number' in req.body) {
      const body = req.body as TypeEmailNumber;
      if(!patternEmail.test(body.email)) {
        res.send({
          status: 'error',
          decription: 'unvalid email value',
        })
      }
      if(data.some(item => item.email === body.email && item.number === body.number)){
        res.send({status: 'ok'});
      }else {
        res.send({status: 'not found'});
      }
    } else {
      res.send({
        status: 'error',
        decription: 'value type is not correct',
      })
    }
  }, 5000);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;