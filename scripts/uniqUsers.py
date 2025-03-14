import json

input_file = "applications_2.json"
output_file = "uniqueUsers.json"

with open(input_file, "r", encoding="utf-8") as file:
    data = json.load(file)


unique_users = {}
for app in data:
    user_id = app["user"]["id"]
    username = app["user"]["username"].strip() 
    if user_id not in unique_users:
        unique_users[user_id] = {"username": username}


with open(output_file, "w", encoding="utf-8") as file:
    json.dump(list(unique_users.values()), file, indent=4)

print(f"Extracted {len(unique_users)} unique users and saved to {output_file}.")
