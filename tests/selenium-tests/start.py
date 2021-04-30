from multiprocessing import Process, Queue, current_process, Semaphore, Lock, cpu_count, Manager
import time
import time
from queue import Empty
from subprocess import call, run
import math
import os
import sys
import argparse
from ctypes import c_int
# Wrapper for automated tests

# Usage: start.py --broker_url <URL>
# Relies on env vars:
# BASIC_AUTH_USERNAME / BASIC_AUTH_PASSWORD
# BR_USERNAME / BR_PASSWORD

parser = argparse.ArgumentParser()
parser.add_argument('--broker_url',
                    required=True)
args = parser.parse_args()

pwd = str(os.getcwd()) + "/reports/allure-results"
pre_commands = ["behave", "-f", "allure_behave.formatter:AllureFormatter", "-o", pwd]

work_array = []

args.broker_url = "{}:{}@{}".format(os.environ.get("BASIC_AUTH_USERNAME"), os.environ.get("BASIC_AUTH_PASSWORD"), args.broker_url)
broker_post_commands = ["-D", "URL={}".format(args.broker_url)]
broker_work_array =[pre_commands + ["./broker_tests/features/broker_smoke_test.feature"] + broker_post_commands]
broker_work_array.append(pre_commands + ["./broker_tests/features/dabsDashboard.feature"] + broker_post_commands)
broker_work_array.append(pre_commands + ["./broker_tests/features/fabsDashboard.feature"] + broker_post_commands)
broker_work_array.append(pre_commands + ["./broker_tests/features/dabs_submissions.feature"] + broker_post_commands)
broker_work_array.append(pre_commands + ["./broker_tests/features/fabs_submissions.feature"] + broker_post_commands)
work_array += broker_work_array

def main():
    print("Starting automated test script")
    return_val = 0
    for item in work_array:
        exit_code = call(item)
        return_val |= exit_code
    return return_val

sys.exit(main())
