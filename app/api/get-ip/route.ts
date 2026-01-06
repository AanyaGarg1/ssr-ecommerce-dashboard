export async function GET(req: Request) {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'Unknown';

    return new Response(JSON.stringify({ ip }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
