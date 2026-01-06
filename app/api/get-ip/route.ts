export async function GET(request: Request) {
    const ip =
        request.headers.get("x-forwarded-for") ||
        "unknown";
    return new Response(JSON.stringify({ ip }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
