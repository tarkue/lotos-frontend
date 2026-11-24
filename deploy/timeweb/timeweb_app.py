from main import app


@app.get("/api", include_in_schema=False)
async def api_status() -> dict[str, str]:
    return {"status": "ok"}
