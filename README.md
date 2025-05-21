# README

This is an SMS Messenger using a Rails 8 backend and Angular 19 frontend

## Implementation Details
- Angular is directly embedded in the Rails app for ease of deployment for this implementation and for a singular repository
    - In a proper environment these would be seperate repositories
- Sessions are maintained using `localStorage` so it is browser specific (open in a different browser, or reset the storage and the previous messages are unavailable)
- Tests are fully implemeneted and passing for the backend, not for the Angular app
- Because of the limitation of the free Twilio account you can only send 25 messages a day, running the tests will exhaust this pretty quickly.

## Stack
- Rails 8.0.2
    - Devise for authentication (not implemented on frontend due to time restrictions)
- Angular 16
- MongoDB backend

## Setup Details

### Environment variables needed
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `MONGODB_URI` Note that the database is added to the end of this

### To Run
#### Dev Mode
`./bin/dev`

#### Tests
`rails t`