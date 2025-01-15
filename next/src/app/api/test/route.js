export async function GET(req) {
    try {
        const body = await req.json();

        const response = await fetch(
            'https://v86g98hnxc.execute-api.us-east-1.amazonaws.com/prod/test',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const responseData = await response.json();

        return new Response(JSON.stringify(responseData), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in API route:', error);
        return new Response(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
