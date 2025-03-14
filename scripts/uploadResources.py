import json
import boto3
from botocore.exceptions import BotoCoreError, NoCredentialsError

input_file = "resources.json"

with open(input_file, "r", encoding="utf-8") as file:
    resources = json.load(file)

dynamodb = boto3.resource("dynamodb")
resources_table = dynamodb.Table("ResourceTable")

for resource in resources:
    try:
        resource.pop("submitterEmail", None)
        
        resources_table.put_item(Item=resource)
        print(f"Inserted resource ID: {resource['id']}")
    
    except (BotoCoreError, NoCredentialsError) as e:
        print(f"Error inserting resource {resource['id']}: {e}")

print(f"Uploaded {len(resources)} resources to ResourceTable.")
