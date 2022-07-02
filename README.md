

# Lemon

This is an mvp skate app, written in ruby on rails and hosted on Heroku. <br/>
This app allows users to find places to skate, create slate routes and book lessons with skate coaches.

> Live demo [_here_](http://www.lemonskate.me/). <!-- If you have the project hosted somewhere, include the link here. -->

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)
<!-- * [License](#license) -->

## General Information

- This is an mvp skate app, written in ruby on rails and hosted on Heroku.
- This app allows users to find and share interesting places to skate, create and share optimized skate routes and book lessons with listed skating coaches.
- This project was completed as part of the Le Wagon fullstack developer bootcamp and served as an opportunity to develop my skills in:

* ruby on rails
* javascript
* scss
* javascript libraries
* git version control
* user authentication
* REST APIs
* production deployment
* implementation of image hosting services

## Technologies Used

- Rails 6.1.5.1 - Rails app generated with [lewagon/rails-templates](https://github.com/lewagon/rails-templates)
- Ruby 3.0.3
- yarn 1.22.17
- SCSS
- [_typed_js_](https://mattboldt.com/demos/typed-js/)
- Cloudinary image hosting
- [_devise_](https://github.com/plataformatec/devise/)
- [_Mapbox Optimization and Geocoding Api_](https://www.mapbox.com/)
- [_Stripe Api_](https://stripe.com/)
- jQuery
- stimulus JS
- Redis 4.0
- bootstrap 5
- font-awesome 6
- PostgreSQL 12

## Features

- Create skate locations
- Find places to skate in your area using the Mapbox API
- Check the weather in your skate spot
- Favorite your favorite skate locations
- Create optimised custom skate routes using the Mapbox API
- Find coaches to teach you to skate
- Chat with coaches and with the greater community
- Book and pay for lessons with skate coaches
- Checkout and pay with credit card via Stripe API

## Setup

You will need Ruby 3.0.3 and Rails 6.1.5.1. Both can be installed via rbenv
You will also need a Cloudinary account (free is sufficient)
Download/Fork/Clone the repo and cd into the repo root directory in your terminal

To check that you have the correct ruby version run:
`ruby --version`

Run: `touch .env` followed by `echo '.env*' >> .gitignore` <br/>
Add your cloudinary api to the .env file `CLOUDINARY_URL=cloudinary://2985**************D-***********************8` <br/>
Add your mapbox api key to .env file `MAPBOX_API_KEY=pk.eyJ1IjoicGR1b****************yZvNpTR_kk1kKqQ` <br/>
Add your stripe keys to the .env file `STRIPE_PUBLISHABLE_KEY=***********************` <br/>and `STRIPE_SECRET_KEY=******************` <br/>and `STRIPE_WEBHOOK_SECRET_KEY=whse********************************`<br/>
Add your open weather api key to .env file `OPEN_WEATHER_API_KEY=08d*******************0`


Then run:
`bundle install`
to install the required gems

Run:
`yarn install`
to install the js packages

Run:
`rails db:create`
`rails db:migrate`
`rails db:seed`
to set up your database

Run:
`rails s`
to start a local rails server

## Project Status

Project is: _in progress_

## Room for Improvement

To do:

- Add user authentication
- Add notifications

## Acknowledgements

- This project was a created as part of the Le Wagon Bootcamp with the help of Le Wagon Teaching Assistants

## Contact

Created by [_Cerulean-Ash_](https://cerulean-ash.github.io/portfolioV2/), [_k0sa7a_](https://github.com/k0sa7a), [_dora13l_](https://github.com/dora13l) and [_piresgabriel_](https://github.com/piresgabriel) - Feel free to contact us!
