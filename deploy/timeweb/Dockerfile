FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates git libgl1 libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Use the same immutable backend revision as the original Timeweb deployment.
RUN git init -q \
    && git fetch --depth 1 https://github.com/like-Ocean/AI_Classes.git 9981ffe083a506646d88edc68e4540e786678c25 \
    && git checkout -q --detach FETCH_HEAD \
    && rm -rf .git

RUN pip install --index-url https://download.pytorch.org/whl/cpu \
    --extra-index-url https://pypi.org/simple -r requirements.txt

COPY timeweb_app.py .

CMD ["sh", "-c", "alembic upgrade head && exec uvicorn timeweb_app:app --host 0.0.0.0 --port 8000"]
