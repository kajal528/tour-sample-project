import type { Handler } from "@netlify/functions"
import data from '../data/cities.json';

export const handler: Handler = async (event) => {
  const id = event.path.match(/\/([0-9]+)/);
  if(id && event.httpMethod === 'GET') {
    const result = data.cities.find(ele=>ele.id===id[1])
    try {
      return {
        statusCode: 200,
        body: JSON.stringify({
        result,
        }),
      }
    }
    catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Failed to process GET request.',
        }),
      }
    }
  }
  if (event.httpMethod === 'GET') {
    try {
      return {
        statusCode: 200,
        body: JSON.stringify({
        data,
        }),
      }
    }
    catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Failed to process GET request.',
        }),
      }
    }
  }
  if(event.httpMethod === 'POST'){
    try{
      const requestBody = event.body?JSON.parse(event.body):"";
      return {
        statusCode: 201,
        body: JSON.stringify(requestBody)
      }
    }
    catch(error){
      return {
        statusCode:500,
        body:JSON.stringify({
          message:'Error occurred while adding the city.'
        })
      }
    }
  }
  if(id && event.httpMethod === 'DELETE'){
    try{
      if(id){
        const index =  data.cities.findIndex(ele=>ele.id===id[1])
        data.cities.splice(index, 1);
        return {
          statusCode: 200,
          body: JSON.stringify({
            data,
            }),
        }
      }
    }
    catch(error){
      return{
        statusCode:500,
        body:JSON.stringify({
          message:'Error occurred while deleting the city.'
        })
      }
    }
  }
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: 'Unknown request.'
    })
  }
}