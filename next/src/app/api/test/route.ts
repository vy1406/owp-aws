export async function GET() {
    const res = await fetch('https://v86g98hnxc.execute-api.us-east-1.amazonaws.com/prod/test', {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()
    console.log(data)
    return Response.json({ data })
}