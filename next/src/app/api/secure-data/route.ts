import { validateToken } from "@/utils/validateToken";

export async function GET(request: Request) {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    const token = authHeader.split(" ")[1];
    const { valid, decoded, error } = validateToken(token);

    if (!valid) {
        return new Response(JSON.stringify({ message: "Invalid token", error }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify({ message: "Success", user: decoded }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
