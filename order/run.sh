sleep 20
python3 manage.py makemigrations
python3 manage.py migrate --database orderdb
python3 manage.py runserver 0.0.0.0:8000
