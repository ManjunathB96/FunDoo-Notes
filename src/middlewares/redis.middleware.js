import HttpStatus from 'http-status-codes';
import { client } from '../config/redis';

// export const redisForGetall = async (req, res, next) => {
//   const data = await client.get('GetAllNotes');

//   const notes = JSON.parse(data);   //  parse : converts the JSON string to object
//   console.log('redis get all notes =====> ', notes);
//   if (notes != null) {
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: notes,
//       message: 'All the notes fetched from redis successfully...!!!'
//     });
//   } else {
//     next();
//   }
// };

// export const redisForGetOne = async (req, res, next) => {

//   const data = await client.get('SingleNote');
//   const notes = JSON.parse(data);
//   console.log('redis  single notes ====>', notes);
//    await client.del('SingleNote')
//   if (notes != null) {
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: notes,
//       message: 'Single Note is fetched from redis successfully...!!!'
//     });

//   } else {
//     next();
//   }
// };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export const redisForGetall = async (req, res, next) => {
  const data = await client.get(req.body.userId);

  const notes = JSON.parse(data); //  parse : converts the JSON string to object
  console.log('redis get all notes =====> ', notes);
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
  console.log('get hii started');
  console.log('Note body ', req.params);

  const data = await client.get(req.params._id);
  console.log('data details', data);
  const notes = JSON.parse(data);
  console.log('redis  single notes ====>', notes);
  if (data) {
    console.log('get in mid');
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: notes,
      message: ' Notes is fetched from redis successfully...!!!'
    });
  } else {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: 'notes',
      message: 'failed to fetch note from redis '
    });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////
