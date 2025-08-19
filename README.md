# Nordhealth Technical Assignment

## Description

Create a client-side only rendered Nuxt 3 application that allows people to sign up for a product. The form should contain fields for email and password, which should be required and show an error if no value is entered. The password field should have a way to make the password visible. The user should be able to choose to receive occasional product updates and announcements. Once signed up, they should be presented with a success page.

Please use the [Nordhealth Design System - VET Theme](https://nordhealth.design/?theme=vet/) appropriately.

Read https://nordhealth.design/web-components/ to learn how to use the Provet components in Vue. Please, use TypeScript.

## Solution

My implementation consists of 3 basic pages to sign up for a fictional product called Brainnotes. New users are able to register and set their notification preferences. After registration they are greeted with a joyful dialog telling them that their signup was successful. Logged in they can see the email they signed up with, are able to update their notification settings and can log out. There is also a log in page if the user wants to check their registration later or on a different device.

The app is written with Nuxt and renders only client-side. The UI is built with the VET theme of Nordhealth's Design System. Authentication is handled by the server component of Nuxt and backed by a small key-value store as database. This enables persistent sessions and account management. The backend part of this application serves as a prototype to enable the frontend functionality. The database and password hashing components serve for demonstration purposes and could easily be swapped out with a more complete implementation.

The app is a good foundation for future updates. The code is logically split according to Nuxt best practices, easily extensible and serves as example for more features. I implemented basic form validation on the client and server with shared schemas and Typescript interfaces to guarantee correctness when calling the API from the client.

## Features

- (Required) Sign up page with basic error handling and loading states
- Log in page with basic error handling and loading states
- Persistent user sessions with cookies
- Automatic redirects based on authentication state
- (Required) Success dialog after sign up
- Log out function that clears session and cookies
- home page displaying the users email and notification settings
- ability to change notification settings after sign up (persisted to DB)
- Basic password hashing to not store clear text passwords
- Project-wide linting, formatting and typechecking

## Next steps

Possible improvements and quick wins for the project set up could be:

- integration tests with [Playwright](https://playwright.dev)
- unit tests with [Vitest](https://vitest.dev)
- Github actions to run tests, linting and deployment automatically
- commit hooks with [`husky`](https://github.com/typicode/husky) and [`lint-staged`](https://github.com/lint-staged/lint-staged) to fix linting and formatting errors before they are pushed to the repo
- improved form error handling in case of network errors or failures

## Running the app

I recommend installing [Volta](https://volta.sh) for node version management and to guarantee you're running the defined Node version of this project.

First clone the repository to your local machine

```sh
git clone https://github.com/sto3psl/nordhealth-assignment.git
```

Navigate to the newly created folder and install dependencies

```sh
cd nordhealth-assignment
npm install
```

Run the application in dev mode

```sh
npm run dev
```

or build it and run it

```sh
npm run build
node .output/server/index.mjs
```

## Issues

Small list of issues I ran into when working with the Nordhealth Design System:

- `<nord-input>` doesn't pass down the `id` attribute
  - Chrome warning: `[DOM] Found 3 elements with non-unique id #input`
- no access to native input events like `blur` when using `<nord-input>`
- no support for server side rendering
- Nord form elements don't participate in browsers native form validation
