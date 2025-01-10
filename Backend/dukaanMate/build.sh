set -o errexit

pip install -r requirements.txt

pyhton manage.py collectstatic --no-input
python manage.py migrate
