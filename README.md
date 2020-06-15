<div align="center">
<a href="https://github.com/abdulsamadola/enye-challenge-1" rel="noopener">
  
  <img width="256" alt="Hospital Finder" src="https://is4-ssl.mzstatic.com/image/thumb/Purple128/v4/21/bf/76/21bf76bc-887d-75b9-6929-ba2a2ad503be/source/512x512bb.jpg">

</div>

<h3 align="center">Hospital Finder</h3>

<div align="center">

[![GitHub issues](https://img.shields.io/github/issues/abdulsamadola/enye-challenge-1)](https://github.com/abdulsamadola/enye-challenge-1/issues)
[![GitHub forks](https://img.shields.io/github/forks/abdulsamadola/enye-challenge-1)](https://github.com/abdulsamadola/enye-challenge-1/network)
[![GitHub stars](https://img.shields.io/github/stars/abdulsamadola/enye-challenge-1)](https://github.com/abdulsamadola/enye-challenge-1/stargazers)
[![GitHub license](https://img.shields.io/github/license/abdulsamadola/enye-challenge-1)](https://github.com/abdulsamadola/enye-challenge-1/blob/master/LICENSE)

</div>

## Table of Contents

- [About the Project](#about-the-project)
- [Build with](#build-with)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running](#running)
- [Screenshots](#screenshots)
- [File Structure](#file-structure)
- [Unit Testing](#unit-testing)
- [Running Unit tests](#running-unit-tests)

- [License](#license)

## About The Project

> **Hospital Finder** is an online web app that helps locate all the hospitals within a given area.

### Build with

- [React JS](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Ant Design](https://https://ant.design/)
- [Firebase](https://firebase.google.com/)
- [GraphQL](https://graphql.org/)
- [Apollo](https://www.apollographql.com/)
- [Jest](https://jestjs.io/)
- [Enzyme](https://enzymejs.github.io/enzyme/)
- [Axios](https://github.com/axios/axios)

## Getting Started

> This is an list of needed instructions to set up your project locally, to get a local copy up and running follow these instructions.

### Installation

1. **_Clone the repository_**

```sh
$ git clone https://github.com/abdulsamadola/enye-challenge-1.git
```

2. **_Navigate to repository directory_**

```sh
$ cd enye-challenge-1
```

3. **_Install dependencies_**

```sh
$ yarn install
```

### Running

1. **_Running on development mode_**

```sh
$ yarn run server
$ yarn run client
```

2. **Build for production**

```sh
$ yarn run build
```

### Screenshots

<div align="center">
 
![image](https://github.com/abdulsamadola/enye-challenge-1/blob/master/screenshots/1.png)

<hr />

![image](https://github.com/abdulsamadola/enye-challenge-1/blob/master/screenshots/2.png)

<hr />

![image](https://github.com/abdulsamadola/enye-challenge-1/blob/master/screenshots/3.png)
<hr />

![image](https://github.com/abdulsamadola/enye-challenge-1/blob/master/screenshots/4.png)
<hr />

![image](https://github.com/abdulsamadola/enye-challenge-1/blob/master/screenshots/5.png)

</div>

## File Structure

<pre>
|-- Hospital Finder
    |-- .DS_Store
    |-- .env
    |-- .gitignore
    |-- LICENSE
    |-- README.md
    |-- package.json
    |-- server.js
    |-- tsconfig.json
    |-- yarn-error.log
    |-- yarn.lock
    |-- build
    |   |-- favicon.ico
    |   |-- logo192.png
    |   |-- logo512.png
    |   |-- manifest.json
    |   |-- robots.txt
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- logo192.png
    |   |-- logo512.png
    |   |-- manifest.json
    |   |-- robots.txt
    |-- screenshots
    |   |-- 1.png
    |   |-- 2.png
    |   |-- 3.png
    |   |-- 4.png
    |   |-- 5.png
    |-- server
    |   |-- schema
    |       |-- index.js
    |-- src
        |-- .DS_Store
        |-- App.scss
        |-- App.tsx
        |-- index.css
        |-- index.tsx
        |-- react-app-env.d.ts
        |-- setupTests.ts
        |-- Services
        |   |-- dataService.ts
        |   |-- firebase.ts
        |-- __tests__
        |   |-- Footer.test.tsx
        |   |-- Header.test.tsx
        |-- common
        |   |-- index.d.ts
        |-- components
        |   |-- CardTemplate
        |   |   |-- CardTemplate.scss
        |   |   |-- CardTemplate.tsx
        |   |-- Footer
        |   |   |-- Footer.tsx
        |   |-- Header
        |   |   |-- Header.tsx
        |   |-- Home
        |   |   |-- Home.scss
        |   |   |-- Home.tsx
        |   |-- LandingPage
        |   |   |-- LandingPage.tsx
        |   |-- ShowHospitals
        |   |   |-- ShowHospitals.scss
        |   |   |-- ShowHospitals.tsx
        |   |-- SignIn
        |   |   |-- SignIn.tsx
        |   |-- SignUp
        |       |-- SignUp.tsx
        |-- hooks
        |   |-- index.ts
        |   |-- useDebounce.ts
        |-- queries
        |   |-- index.ts
        |-- routes
        |   |-- Auth.tsx
        |   |-- PrivateRoute.tsx
        |   |-- index.tsx
        |-- styles
        |   |-- index.ts
        |-- testUtils
        |   |-- index.ts
        |-- utils
            |-- index.ts
</pre>

## Unit testing

> Each component in this project has its own unit test file separately inside \_\_tests\_\_ directory eg. Header.test.tsx

### Running Unit tests

> Run the following command.

```sh
yarn run test
```

## License

> This software is licensed under MIT License, See [License](https://github.com/abdulsamadola/enye-challenge-1/blob/master/LICENSE) for more information ©Abdulsamad Suleiman.
