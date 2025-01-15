export const dynamic = 'force-static'

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const response = await fetch(
            'https://v86g98hnxc.execute-api.us-east-1.amazonaws.com/prod/signup',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );
        const responseData = await response.json();

        return new Response(JSON.stringify(responseData), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
