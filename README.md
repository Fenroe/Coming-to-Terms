# Coming to Terms 

Coming to Terms is a full stack MERN blog app. The front end is built with React, Bootstrap and uses the TinyMCE service to support a rich text editor. The backend meanwhile runs on Express with a MongoDB database. You can check out the API [here](https://github.com/Fenroe/Coming-to-Terms-API).

# Live Preview

https://comingtoterms.netlify.app

# Tech Stack

* React
* Bootstrap
* Node
* Express
* MongoDB

# Getting Started

If you'd like to run this application locally then follow these steps:

* Clone the repository to your computer.
* Install npm packages with `npm install`.
* Create an .env file in the root of the project directory containing the following variables:
```
REACT_APP_API_URL=myapiurl.com
REACT_APP_DEMO_ACCOUNT_EMAIL=example@email.com
REACT_APP_DEMO_ACCOUNT_PASSWORD=mypassword
REACT_APP_TINYMCE_API_KEY=tinymceapikey
```
* `REACT_APP_API_URL` is the endpoint of the REST API that manages the backend operations. 
* `REACT_APP_TINYMCE_API_KEY` is the api key associated with your TinyMCE account. You can read the TinyMCE documentation [here](https://www.tiny.cloud/docs/tinymce/6/).
* `REACT_APP_DEMO_ACCOUNT_EMAIL` and `REACT_APP_DEMO_ACCOUNT_PASSWORD` are the credentials for a public account for site visitors. 
* For the best results I recommend using this app with the [Coming to Terms API](https://github.com/Fenroe/Coming-to-Terms-API), though you can use your own API with additional changes to the source code. 
* Start the application using `npm run start`.
* The application should now be live on http://localhost:3000.