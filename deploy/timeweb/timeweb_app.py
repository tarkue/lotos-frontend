import os
import socket

if __name__ == "__main__":
    # Make the HTTP port discoverable while the temporary database initializes.
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as listener:
        listener.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        listener.bind(("0.0.0.0", int(os.environ.get("PORT", "8000"))))
        listener.listen()
        listener.set_inheritable(True)
        os.environ["DEMO_HTTP_FD"] = str(listener.fileno())
        os.execlp("sh", "sh", "start-backend.sh")
else:
    from main import app

    @app.get("/api", include_in_schema=False)
    async def api_status() -> dict[str, str]:
        return {"status": "ok"}
