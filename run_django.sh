echo "-----------------------------------------------------------------------"
echo "configure envrionment setting"
local_host=172.30.1.50

export CART_SERVICE_URL=http://$local_host:8080 # local ip
export RATING_SERVICE_URL=http://$local_host:8081 # local ip
# export CART_SERVICE_URL=http://192.168.219.171:8080 # local ip
# export RATING_SERVICE_URL=http://192.168.219.171:8081 # local ip

export MYSQL_PRODUCT_HOST=172.17.0.3 
export MYSQL_ORDER_HOST=172.17.0.3
export MYSQL_USER_HOST=172.17.0.3
echo "-----------------------------------------------------------------------"
echo "migrate and activate server!"

python3 ./product/manage.py migrate
python3 ./product/manage.py runserver 0.0.0.0:8100 &

python3 ./account/manage.py migrate
python3 ./account/manage.py runserver 0.0.0.0:8200 &

python3 ./order/manage.py migrate
python3 ./order/manage.py runserver 0.0.0.0:8300 &
echo "-----------------------------------------------------------------------"
echo "complete!!"
