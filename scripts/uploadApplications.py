import json

input_file = "applications_2025-03-14.json"
output_file = "applications_extracted.json"

# excluding funny names
users_file = "users_extracted.json"
with open(users_file, "r", encoding="utf-8") as file:
    valid_users = {user["username"]: user for user in json.load(file)}

with open(input_file, "r", encoding="utf-8") as file:
    data = json.load(file)

# Process applications
processed_apps = []
for app in data:
    username = app["user"]["username"].strip()

    # If username is invalid (ignored user), assign to "facebook"
    if username not in valid_users:
        username = "facebook"

    processed_apps.append({
        "id": app["id"],
        "additional_info": app.get("additional_info", ""),
        "application_date": app["application_date"],
        "is_self_submitted": app["is_self_submitted"],
        "biometric_date": app["biometric_date"] if app["biometric_date"] else None,
        "status": app["status"],
        "decision_date": app["decision_date"] if app["decision_date"] else None,
        "submission_city": app["submission_city"].strip() if app["submission_city"] else None,
        "username": username  # Assign the correct username
    })

# Save applications to a new JSON file
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(processed_apps, file, indent=4)

print(f"Extracted {len(processed_apps)} applications and saved to {output_file}.")
