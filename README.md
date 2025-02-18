# real-time-location-tracking-app-demo

steps for logic (inspired by sheriyans coding school) in script.js

1> checking if browser supports geoLocation features
2> set features like accuracy, 10 sec timeout/reloading time
3> no caching as markers should update with every movements
4> watchPosition to track the users location continuously
5> emit (latitude and longitude ) with socket / send location
6> initialization of map to world center (0,0) with certain zoom level of choice
7> empty marker
8> when received some coordinates (lat,lng) replace (0,0)
9> update position if markers for id is there , create new at starting and add it to map,
10> remove the marker if user / id disconnected
