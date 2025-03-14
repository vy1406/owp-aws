import json
import boto3
from botocore.exceptions import BotoCoreError, NoCredentialsError

input_file = "applications_extracted.json"

with open(input_file, "r", encoding="utf-8") as file:
    applications = json.load(file)

dynamodb = boto3.resource("dynamodb")
applications_table = dynamodb.Table("ApplicationsTable")

for app in applications:
    try:
        applications_table.put_item(Item=app)
        print(f"Inserted application ID: {app['id']}")
    except (BotoCoreError, NoCredentialsError) as e:
        print(f"Error inserting application {app['id']}: {e}")

print(f"Uploaded {len(applications)} applications to ApplicationsTable.")
