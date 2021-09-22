# Welcome to ImagIn @ Shopify!
  

Hi, this is a full stack application developed for Shopify's Backend Developer Intern - Winter 2022 role.

Access the live demo here: [https://shopify-varun.netlify.app/](https://shopify-varun.netlify.app/)


1. Front-End developed using Vue.js framework.
2. Back-End consisting of an image classification system that classifies images based on general categories. 

This application uses Firebase Storage as it's persistent data store and Firebase Functions to host the serverless back-end that is used for image classification. 
  

### What does this application do?
- This application allows users to securely Login via their emails and password via Firebase Authentication.
- The authenticated users are able to view all images uploaded to the storage bucket, as well as view separately their own uploaded images which they are able to delete. 
- Each images is classified by processing it through a generic data AI model.
- The backend returns classification tags with >90% accuracy within ± 3 seconds (or ±15 seconds with a serverless cold-start).
- The front end updates at every 10 seconds via optimized polling algorithms, which might sometimes render the classification tags at a delayed rate.
---


### What tech stack does it use?

  The back-end has been developed using Node.js framework and the JavaScript programming language. 

  
Here are the external APIs used:

| API                               | Purpose                                  |
| --------------------------------- | ---------------------------------------- |
| Google's Firebase Cloud Storage   | Storing images in the cloud.             |
| Clarifai API                      | To generate image classifications |
| Google's Firebase Authentication                 | Secure Email Log in |
| Google's Firebase Functions                 | Serverless auto-scalable back-end functions to classify images at a low latency |

- The front-end is hosted on Netlify. 
---

### How does it work?

##### Front-End:

1. Upon visit, the user is displayed a log-in screen where they can decide to authenticate themselves or view a random gallery to view the UI components. 
2. Upon login, polling algorithms constantly fetch updated images as well as their classifications from storage.
3. API Operations are:
- Login
- Getting images (publicly accessible URLs)
- Uploading an image
- Getting image metadata (tags, name, uploaded time, uploader IDs)
- Deleting an image
- Logout  

##### Back-End:
The Node.js backend triggers a Firebase function whenever an image is uploaded. 
- During upload, the image classification_status is 0, indicating a pending classification.
- Once the image is classified, this classification_status becomes 1 if classification was successful, otherwise 2 on failure.

Storage Structure:
- The images are stored in Firebase Storage such that their access path is {UUID}/{UploadedTimestamp}. This will result in ease of access by separating the images for each user, and avoid clash when multiple images of the same name are uploaded for each user.
---

### How much does it cost to operate this service:
- This service currently operates for free.
- Netlify operates at 0 cost. 
- Firebase Authentication is always free.
- Firebase Storage offers relatively low cost storage solutions with a free tier.
- Firebase Functions operate for free until a certain threshold.
  
https://firebase.google.com/pricing
---
### Running Locally:
**Back-end**:
- Clone repository
- ```cd back-end```
- Configure firebase account : https://firebase.google.com/docs/functions/get-started
- ```firebase emulators:start```

**Front-end**:
- Clone repository
- ```cd front-end```
- Install yarn
- ```yarn```
- To run in development mode: ```yarn serve```, to build for production: ```yarn build```
- Upon yarn serve, running the application on localhost will connect to the local back-end automatically (Classification will fail due to image URL being locally hosted, however Clarifai Tests will run to ensure no build errors are propogated in production environments)  
---
### What about Scaling and Security?
- This service is highly scalable and should be able to support a large amount of images and concurrent classifications without huge performance impacts.
- Some measures in place to maintain scalability are:
  - Classification algorithm only runs on image uploads.
  - Image uploads are only allowed for authenticated users.
  - Vue3 has been utilized with Firebase 9 to tree shake all unused component libraries and increase speed and performance regarding both page load times and application performance.  

---
### Contact
- Kindly reach out to me at varun.vermav6@gmail.com
---
  > Author: Varun Verma
  
**_END_**
---
