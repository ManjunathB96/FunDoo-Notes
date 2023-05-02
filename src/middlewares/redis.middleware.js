import HttpStatus from 'http-status-codes';
import { client } from '../config/redis';


export const redisForGetall = async (req, res, next) => {
  const data = await client.get(req.body.userId);
  const notes = JSON.parse(data);
  if (notes != null) {
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: notes,
      message: 'All the notes fetched from redis successfully...!!!'
    });
  } else {
    next();
  }
};

export const redisForGetOne = async (req, res, next) => {
  const data = await client.get(req.params._id);
  const notes = JSON.parse(data);
  if (data) {
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: notes,
      message: ' Notes is fetched from redis successfully...!!!'
    });
  } else {
    next()
  }
};
