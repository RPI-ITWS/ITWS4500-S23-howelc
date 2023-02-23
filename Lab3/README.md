I made a web games app. As of now since there is only one game only the home page and the trivia game page is active. I started this lab by getting node to work which was somewhat challenging. How I have my node structured is weird for this lab and may require some reconfiguration on local host. I have my package.json files and index.js files in the root directory and I am serving my entire ITWS4500-S23-howelc folder as the static folder which means the static file path would have to be changed in the index.js file and a directory would have to be created to hold the static content if ran locally, I will change this going forward. Getting everything running on node once I got everything running was very straight forward I am excited to use node more. As for my API I used the open trivia database API. I used the fetch API in node to get the json then passed it through the response json for the get. As for the post, put, and delete to satisfy the lab I created a button at the bottom of the quiz page to perform all those actions then alert the user the response. As for the trivia itself the most challenging part was creating the timer I went with an interval that goes everysecond and ticks down a timer until it reaches 0 then it changes questions. I used some local storage to maintain scores and such. Overall this was a fun activity although I wish I would have made it with React.

Note: There are still a few bugs I have to work out namely you can click a correct answer more than once rapidly and it will give you points that being said it is still functional and works as intended.

I hosted this lab on: https://howelc.eastus.cloudapp.azure.com/node/ITWS4500-S23-howelc/Lab3/


Works Cited:

API - https://opentdb.com/api_config.php

Image Credit - DALL-E2
CSS Structure and Media Queries inspired or taken from Cian Howell and Jerry Lu's Qti.ai

Bootstrap Docs used for bootstrap classes and Icons https://getbootstrap.com/docs/5.3/getting-started/introduction/

Neon-sign + pulse - https://codepen.io/silvia-odwyer/pen/RwKMOpb