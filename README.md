# "I need to park my bike"

Find places to park your bike near you (0.5 miles) in San Francisco. Built in Python and Flask, the app utilizes the [DataSF](https://data.sfgov.org/) and GoogleMaps API. Probably needs a more creative title, but I feel it speaks for itself!

App in production: [parkmybike.herokuapp.com](http://parkmybike.herokuapp.com)

Prior to creating this application, I had never learned Python (and obviously Flask) whatsoever. This was an awesome opportunity to dive in and actually get to know the language for the first time. In the spirit of keeping things light-weight, I chose not to use a database for this application so that the user can always reliably access the information, even as it changes real-time. Consequently, I felt a front-end framework like Backbone.js was not needed and instead used standard AJAX to send and receive information from the front end.

To run locally:

    $ chmod a+x run.py
    $ ./run.py

After the server initializes, enter the following URL in your browser:

    http://localhost:5000

To run the Python unit tests:

    $ chmod a+x tests.py
    $ ./tests.py



###Other projects
View my other projects and their respective code [here](http://www.jonjchew.com).