#!/bin/sh
set -eu

pg_bin=$(pg_config --bindir)
export DB_HOST=127.0.0.1 DB_PORT=5432
pg_data=${TMPDIR:-/tmp}/lotos-demo-postgresql

pg_run() {
    if [ "$(id -u)" = 0 ]; then
        runuser -u postgres -- "$@"
    else
        "$@"
    fi
}

if [ ! -f "$pg_data/PG_VERSION" ]; then
    mkdir -m 700 -p "$pg_data"
    if [ "$(id -u)" = 0 ]; then
        chown postgres:postgres "$pg_data"
    fi
    password_file="$pg_data/.init-password"
    umask 077
    printf '%s\n' "$DB_PASSWORD" > "$password_file"
    if [ "$(id -u)" = 0 ]; then
        chown postgres:postgres "$password_file"
    fi
    # initdb requires its target directory to be empty.
    mv "$password_file" "$pg_data.password"
    trap 'rm -f "$pg_data.password"' EXIT
    pg_run "$pg_bin/initdb" -D "$pg_data" --username="$DB_USER" \
        --auth=scram-sha-256 --pwfile="$pg_data.password"
    rm -f "$pg_data.password"
    trap - EXIT
fi

if ! pg_run "$pg_bin/pg_ctl" -D "$pg_data" status >/dev/null 2>&1; then
    pg_run "$pg_bin/pg_ctl" -D "$pg_data" -l "$pg_data/server.log" \
        -o "-h $DB_HOST -p $DB_PORT -k $pg_data" -w start
fi

export PGPASSWORD="$DB_PASSWORD"
if ! "$pg_bin/psql" -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -Atqc 'SELECT 1' >/dev/null 2>&1; then
    "$pg_bin/createdb" -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME"
fi
unset PGPASSWORD

alembic upgrade head
exec uvicorn timeweb_app:app --host 0.0.0.0 --port 8000
