#! /usr/bin/python3

import os 

MONGODB_CONTAINER = "mongodb-container"

def kill_process(port):
    print("kill process if already exists")
    try:
        pid = os.popen("netstat -nplt | grep {}".format(port)).read().split()[-1].split('/')[0]
        os.system("kill -9 {}".format(pid))
    except Exception as e:
        print("process doesn't exist")

# kill proccess
kill_process(8080)
kill_process(8081)
kill_process(8082)

# environment setting 
print("Environment settings")
mongodb_container_ip = os.popen("docker inspect {}| jq '.[0].NetworkSettings.IPAddress'".format(MONGODB_CONTAINER)).read().split('"')[1]
os.environ["MONGO_CART_HOST"] = mongodb_container_ip
os.environ["MONGO_RATING_HOST"] = mongodb_container_ip

# excute servers
print("Excute Servers")
os.system("nodemon ./cart/app.js &")
os.system("nodemon ./rating/app.js &")
os.system("nodemon ./post/app.js &")


