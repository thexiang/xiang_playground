import json
from datetime import datetime

import pytest

import src.api.users.views


def test_add_user(test_app, monkeypatch):
    def mock_get_user_by_email(email):
        return None

    def mock_add_user(username, email, password):
        return True

    monkeypatch.setattr(
        src.api.users.views, "get_user_by_email", mock_get_user_by_email
    )
    monkeypatch.setattr(src.api.users.views, "add_user", mock_add_user)

    client = test_app.test_client()
    resp = client.post(
        "/users",
        data=json.dumps(
            {
                "username": "miya",
                "email": "miya@yoyo.io",
                "password": "greaterthaneight",
            }
        ),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 201
    assert "miya@yoyo.io was added!" in data["message"]


def test_add_user_invalid_json(test_app):
    client = test_app.test_client()
    resp = client.post(
        "/users",
        data=json.dumps({}),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 400
    assert "Input payload validation failed" in data["message"]


def test_add_user_invalid_json_keys(test_app, monkeypatch):
    client = test_app.test_client()
    resp = client.post(
        "/users",
        data=json.dumps(
            {"email": "john@yoyo.io", "password": "greaterthaneight"}
        ),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 400
    assert "Input payload validation failed" in data["message"]


def test_add_user_duplicate_email(test_app, monkeypatch):
    def mock_get_user_by_email(email):
        return True

    def mock_add_user(username, email):
        return True

    monkeypatch.setattr(
        src.api.users.views, "get_user_by_email", mock_get_user_by_email
    )
    monkeypatch.setattr(src.api.users.views, "add_user", mock_add_user)
    client = test_app.test_client()
    resp = client.post(
        "/users",
        data=json.dumps(
            {
                "username": "miya",
                "email": "miya@yoyo.io",
                "password": "greaterthaneight",
            }
        ),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 400
    assert "Sorry. That email already exists." in data["message"]


def test_single_user(test_app, monkeypatch):
    def mock_get_user_by_id(user_id):
        return {
            "id": 1,
            "username": "jeffrey",
            "email": "jeffrey@yoyo.io",
            "created_date": datetime.now(),
        }

    monkeypatch.setattr(src.api.users.views, "get_user_by_id", mock_get_user_by_id)
    client = test_app.test_client()
    resp = client.get("/users/1")
    data = json.loads(resp.data.decode())
    assert resp.status_code == 200
    assert "jeffrey" in data["username"]
    assert "jeffrey@yoyo.io" in data["email"]
    assert "password" not in data


def test_single_user_incorrect_id(test_app, monkeypatch):
    def mock_get_user_by_id(user_id):
        return None

    monkeypatch.setattr(src.api.users.views, "get_user_by_id", mock_get_user_by_id)
    client = test_app.test_client()
    resp = client.get("/users/999")
    data = json.loads(resp.data.decode())
    assert resp.status_code == 404
    assert "User 999 does not exist" in data["message"]


def test_all_users(test_app, monkeypatch):
    def mock_get_all_users():
        return [
            {
                "id": 1,
                "username": "miya",
                "email": "miya@mnazu.org",
                "created_date": datetime.now(),
            },
            {
                "id": 1,
                "username": "fletcher",
                "email": "fletcher@notreal.com",
                "created_date": datetime.now(),
            },
        ]

    monkeypatch.setattr(src.api.users.views, "get_all_users", mock_get_all_users)
    client = test_app.test_client()
    resp = client.get("/users")
    data = json.loads(resp.data.decode())
    assert resp.status_code == 200
    assert len(data) == 2
    assert "miya" in data[0]["username"]
    assert "miya@mnazu.org" in data[0]["email"]
    assert "fletcher" in data[1]["username"]
    assert "fletcher@notreal.com" in data[1]["email"]
    assert "password" not in data[0]
    assert "password" not in data[1]


def test_remove_user(test_app, monkeypatch):
    class AttrDict(dict):
        def __init__(self, *args, **kwargs):
            super(AttrDict, self).__init__(*args, **kwargs)
            self.__dict__ = self

    def mock_get_user_by_id(user_id):
        d = AttrDict()
        d.update(
            {
                "id": 1,
                "username": "user-to-be-removed",
                "email": "remove-me@yoyo.io",
            }
        )
        return d

    def mock_delete_user(user):
        return True

    monkeypatch.setattr(src.api.users.views, "get_user_by_id", mock_get_user_by_id)
    monkeypatch.setattr(src.api.users.views, "delete_user", mock_delete_user)
    client = test_app.test_client()
    resp_two = client.delete("/users/1")
    data = json.loads(resp_two.data.decode())
    assert resp_two.status_code == 200
    assert "remove-me@yoyo.io was removed!" in data["message"]


def test_remove_user_incorrect_id(test_app, monkeypatch):
    def mock_get_user_by_id(user_id):
        return None

    monkeypatch.setattr(src.api.users.views, "get_user_by_id", mock_get_user_by_id)
    client = test_app.test_client()
    resp = client.delete("/users/999")
    data = json.loads(resp.data.decode())
    assert resp.status_code == 404
    assert "User 999 does not exist" in data["message"]


def test_update_user(test_app, monkeypatch):
    class AttrDict(dict):
        def __init__(self, *args, **kwargs):
            super(AttrDict, self).__init__(*args, **kwargs)
            self.__dict__ = self

    def mock_get_user_by_id(user_id):
        d = AttrDict()
        d.update({"id": 1, "username": "me", "email": "me@yoyo.io"})
        return d

    def mock_update_user(user, username, email):
        return True

    def mock_get_user_by_email(email):
        return None

    monkeypatch.setattr(src.api.users.views, "get_user_by_id", mock_get_user_by_id)
    monkeypatch.setattr(
        src.api.users.views, "get_user_by_email", mock_get_user_by_email
    )
    monkeypatch.setattr(src.api.users.views, "update_user", mock_update_user)
    client = test_app.test_client()
    resp_one = client.put(
        "/users/1",
        data=json.dumps({"username": "me", "email": "me@yoyo.io"}),
        content_type="application/json",
    )
    data = json.loads(resp_one.data.decode())
    assert resp_one.status_code == 200
    assert "1 was updated!" in data["message"]
    resp_two = client.get("/users/1")
    data = json.loads(resp_two.data.decode())
    assert resp_two.status_code == 200
    assert "me" in data["username"]
    assert "me@yoyo.io" in data["email"]


@pytest.mark.parametrize(
    "user_id, payload, status_code, message",
    [
        [1, {}, 400, "Input payload validation failed"],
        [1, {"email": "me@yoyo.io"}, 400, "Input payload validation failed"],
        [
            999,
            {"username": "me", "email": "me@yoyo.io"},
            404,
            "User 999 does not exist",
        ],
    ],
)
def test_update_user_invalid(
    test_app, monkeypatch, user_id, payload, status_code, message
):
    def mock_get_user_by_id(user_id):
        return None

    def mock_get_user_by_email(email):
        return None

    monkeypatch.setattr(src.api.users.views, "get_user_by_id", mock_get_user_by_id)
    client = test_app.test_client()
    resp = client.put(
        f"/users/{user_id}",
        data=json.dumps(payload),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == status_code
    assert message in data["message"]


def test_update_user_duplicate_email(test_app, monkeypatch):
    class AttrDict(dict):
        def __init__(self, *args, **kwargs):
            super(AttrDict, self).__init__(*args, **kwargs)
            self.__dict__ = self

    def mock_get_user_by_id(user_id):
        d = AttrDict()
        d.update({"id": 1, "username": "me", "email": "me@yoyo.io"})
        return d

    def mock_update_user(user, username, email):
        return True

    def mock_get_user_by_email(email):
        return True

    monkeypatch.setattr(src.api.users.views, "get_user_by_id", mock_get_user_by_id)
    monkeypatch.setattr(
        src.api.users.views, "get_user_by_email", mock_get_user_by_email
    )
    monkeypatch.setattr(src.api.users.views, "update_user", mock_update_user)
    client = test_app.test_client()
    resp = client.put(
        "/users/1",
        data=json.dumps({"username": "me", "email": "me@yoyo.io"}),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 400
    assert "Sorry. That email already exists." in data["message"]