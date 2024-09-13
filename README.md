# How To Run

Run the following commands:
```
$ npm install
$ npm run dev
``` 


# Next Steps
1. Currently we receive all the weather based in UTC time, so would fix the dates so it's all in local time.
2. Tests would still need to be written to validate
3. Imported some libraries, in a real production environment, I'd confirm long-term support, etc
4. I'd want to look into a better react pattern for the services (WeatherApi) at the moment I made it into a closure. In Angular you'd create a class and do something similar where a single file would have the endpoints configured. Or you could utilize a OpenAPI generated client, etc.
5. Similar to #4, I'd configure the axios instance and handling of data fetching in a more abstract way.