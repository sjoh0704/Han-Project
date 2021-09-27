#! /usr/bin/python3
import os 

LOCAL_HOST = "172.30.1.50"
MYSQL = "172.17.0.5"
os.environ["CART_SERVICE_URL"] = "http://{}:8080".format(LOCAL_HOST)
os.environ["RATING_SERVICE_URL"] = "http://{}:8081".format(LOCAL_HOST)
os.environ["MYSQL_PRODUCT_HOST"] = MYSQL
os.environ["MYSQL_ORDER_HOST"] = MYSQL
os.environ["MYSQL_USER_HOST"] = MYSQL


def start_process(port):
    print("start django process on port:{}".format(port))
    os.system("./product/manage.py migrate")
    os.system("./product/manage.py runserver 0.0.0.0:{} &".format(port))

start_process(8100)
start_process(8200)
start_process(8300)



