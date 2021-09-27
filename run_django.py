#! /usr/bin/python3
import os 

LOCAL_HOST = "172.30.1.50"
MYSQL = "172.17.0.3"
os.environ["CART_SERVICE_URL"] = "http://{}:8080".format(LOCAL_HOST)
os.environ["RATING_SERVICE_URL"] = "http://{}:8081".format(LOCAL_HOST)
os.environ["MYSQL_PRODUCT_HOST"] = MYSQL
os.environ["MYSQL_ORDER_HOST"] = MYSQL
os.environ["MYSQL_USER_HOST"] = MYSQL


def start_process(obj, port):
    print("start django process on port:{}".format(port))
    os.system("./{}/manage.py migrate".format(obj))
    os.system("./{}/manage.py runserver 0.0.0.0:{} &".format(obj,port))

start_process("product", 8100)
start_process("account", 8200)
start_process("order",8300)



