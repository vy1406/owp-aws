
const STUB: IApplication[] = [

    {
        "additional_info": "updated2",
        "application_date": "2024-02-20",
        "is_self_submitted": true,
        "biometric_date": "2024-02-22",
        "status": "Approved",
        "id": "5c5f9527-680c-4894-8cbc-fc3f22be0742",
        "decision_date": "2024-02-23",
        "submission_city": "New Calgaryh",
        "username": "user2"
    },
    {
        "additional_info": "very long text very long text very long text  vvery long text very long text very long textvery long text very long text",
        "application_date": "2024-03-23",
        "is_self_submitted": true,
        "biometric_date": "2024-03-24",
        "status": "Declined",
        "id": "5c5f9527-680c-4894-8cbc-fc3f22be0741",
        "decision_date": "2024-04-24",
        "submission_city": "Halifax",
        "username": "user1"
    },
    {
        "additional_info": "updated3",
        "application_date": "2024-04-24",
        "is_self_submitted": false,
        "biometric_date": "2024-04-25",
        "status": "Pending",
        "id": "5c5f9527-680c-4894-8cbc-fc3f22be0743",
        "decision_date": "2024-05-26",
        "submission_city": "New Toronto",
        "username": "user1"
    },
    {
        "additional_info": "updated3",
        "application_date": "2024-04-24",
        "is_self_submitted": false,
        "biometric_date": null,
        "status": "Pending",
        "id": "5c5f9527-680c-4894-8cbc-fc3f22be0743",
        "decision_date": "2024-05-26",
        "submission_city": "New Toronto",
        "username": "user1"
    },

]

export type IApplication = {
    additional_info: string;
    application_date: string;
    is_self_submitted: boolean;
    biometric_date: string | null;
    status: string;
    id: string;
    decision_date: string | null;
    submission_city: string | null;
    username?: string | null;
}

export const getApplications = async (): Promise<IApplication[]> => {
    // const url = `${API.APPLICATION}/??`;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(STUB);
        }, 1500);
    });

};

export const getApplication = async (id: string): Promise<IApplication | null> => {
    // const url = `${API.APPLICATION}/${id}`;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(STUB.find(app => app.id === id) || null);
        }, 1500);
    });
}
