#! /usr/bin/python3
import os
from time import sleep
FRONTEND = os.getenv("FRONTEND", "localhost:3000")

def gernerateLoad(target):
    print("GET {}".format(target))
    cmd = 'curl --max-time 5 {}'.format(target)
    res = os.popen(cmd).read()
    print(res)
    sleep(0.3)

def userPlayBook(frontend):
    print("user create and delete playbook")
    print("create user")
    username = os.popen("cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | sed 1q").read()
   
    data = {
        "username": username,
        "password": "1234",
        "email": "abcd@abcd.com",
        "phone_number": "01011111111"
    }
    cmd = "curl --max-time 5 -d '{}'\
    -H 'Content-Type: application/json' \
    -X POST {}/apis/v1/user | jq .payload.user_id".format(data, "172.17.0.2:8200")
    print(cmd)
    # os.system(cmd)
    user_id = os.popen(cmd).read()
    print(user_id)

userPlayBook(FRONTEND)

# gernerateLoad(FRONTEND + "/apis/v1/user/1")
# gernerateLoad(FRONTEND + "/apis/v1/product/0")
# gernerateLoad(FRONTEND + "/apis/v1/carts/users/0")
# gernerateLoad(FRONTEND + "/apis/v1/ratings/0")
# gernerateLoad(FRONTEND + "/apis/v1/order/0")
# gernerateLoad(FRONTEND + "/apis/v1/store/0")
# gernerateLoad(FRONTEND + "/apis/v1/post/0")