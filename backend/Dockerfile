FROM python:3.11

RUN apt-get update && apt-get install -y --no-install-recommends libpq-dev

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY papelaria papelaria
COPY projeto projeto
COPY manage.py manage.py
COPY .env-example .env

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
