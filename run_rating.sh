echo "-----------------------------------------------------------------------"
echo "configure envrionment setting"
export MONGO_CART_HOST=172.17.0.4
export MONGO_RATING_HOST=172.17.0.4
echo "-----------------------------------------------------------------------"
echo "migrate and activate server!"
node ./rating/app.js
echo "-----------------------------------------------------------------------"
echo "complete!!"
