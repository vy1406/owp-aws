import json
import boto3
from botocore.exceptions import BotoCoreError, NoCredentialsError

input_file = "users_extracted.json"

with open(input_file, "r", encoding="utf-8") as file:
    users = json.load(file)

dynamodb = boto3.resource("dynamodb")
users_table = dynamodb.Table("UsersTable")

for user in users:
    try:
        users_table.put_item(Item={
            "username": user["username"], 
            "password": "" 
        })
        print(f"Inserted user: {user['username']}")
    except (BotoCoreError, NoCredentialsError) as e:
        print(f"Error inserting user {user['username']}: {e}")

print(f"Uploaded {len(users)} users to UsersTable.")
