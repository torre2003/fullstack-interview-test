FROM python:3.6

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first

ENV PYTHONUNBUFFERED 1

WORKDIR /flat_project

COPY flat_project/ /flat_project/
COPY requirements.txt /flat_project/requirements.txt

RUN pip3 install -r requirements.txt

CMD python3 manage.py migrate && \
    python3 manage.py collectstatic --noinput && \
    gunicorn --bind 0.0.0.0:8000 flat_project.wsgi:application
