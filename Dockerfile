#FROM public.ecr.aws/lambda/python:3.10
FROM python:3.12.1-slim

WORKDIR /app

EXPOSE 8000

COPY ./requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir

COPY ./server .
#CMD ["run.handler"]
CMD ["uvicorn", "--host", "0.0.0.0", "--port", "8000", "run:app"]