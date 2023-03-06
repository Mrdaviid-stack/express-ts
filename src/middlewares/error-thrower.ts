export function getErrorCodeMessage(errorCode: number) {
  return (
    errorCode === 400? 'Bad Request' :
    errorCode === 401? 'Unauthorized' :
    errorCode === 403? 'Forbidden' :
    errorCode === 404? 'Not Found' :
    errorCode === 409? 'Conflict' :
    errorCode === 500? 'Internal Server Error' :
    'Unknown Error'
  );
}
   // @ts-expect-error
export function addErrorThrower(request, response, next)
{
     // @ts-expect-error
  response.throw = (code, message, errors) =>
  {
    if(message && message !== '')
      return response.status(code).send(message, errors);

    response.status(code).send(getErrorCodeMessage(code));
  }

  next();
}

