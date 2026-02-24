# DevTinder APIs

## authRouter
- Post /signup
- post /login
- post /logout 

## profileRouter
- GET /profile/view
- PATCH /profile/edit 
- PATCH /profile/password

## connectionRequestRouter
- POST /request/interested/:userId
- POST /request/ignored/:userId
- POST /request/review/accepted/:reuestId
- POST /request/review/rejected/:reuestId

## userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed

status-> Interested,Ignored,accepted,rejected 

