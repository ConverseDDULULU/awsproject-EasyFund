from dynamo_client import USER_TABLE


def save_user_risk(user_id: str, risk_class: str):
    USER_TABLE.put_item(
        Item={
            "user_id": user_id,
            "risk_class": risk_class
        }
    )
    return {"status": "ok"}


def get_user_risk(user_id: str):
    result = USER_TABLE.get_item(Key={"user_id": user_id})
    return result.get("Item")
