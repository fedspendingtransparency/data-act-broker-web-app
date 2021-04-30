# Broker Frontend Selenium Tests

## Running the test suite

### Local Development

First, you must have python3 and pip3 installed.

Then you will need to initiate and activate a python virtual environment:

```sh
python3 -m venv selenium-suite
source selenium-suite/bin/activate
pip3 install -r requirements.txt
```

The test run is also dependent on a few environment variables for autorization to the broker application:

```sh
export BR_USERNAME='your-broker-username'
export BR_PASSWORD='your-broker-password'
```

Finally, run the tests using the `start.py` script:

```sh
python3 start.py --broker_url <url>
```

### Docker

There is also a docker container provided for easier test runs. Build and run in docker using the following steps:

```sh
docker build -t broker-selenium-tests .
docker run -i --rm \
    -v \$(pwd):/selenium-tests \
    -e BR_USERNAME='your-broker-username' \
    -e BR_PASSWORD='your-broker-password' \
    usaspending-selenium-tests /bin/bash -c \
        'python3 start.py --broker_url <url>'
```
