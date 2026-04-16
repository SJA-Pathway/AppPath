export interface Env {
  ENVIRONMENT: string;
  // Uncomment as you bind resources in wrangler.toml:
  // DB: D1Database;
  // CACHE: KVNamespace;
  // STORAGE: R2Bucket;
}

// Simple CORS headers for the mobile app
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Route handling
      if (path === "/") {
        return json({ name: "LifeHub API", version: "1.0.0", status: "running" });
      }

      if (path === "/api/health") {
        return json({ ok: true, environment: env.ENVIRONMENT });
      }

      // ─── Notes API ────────────────────────────────────
      if (path === "/api/notes" && request.method === "GET") {
        // TODO: Fetch from D1 database
        return json({ notes: [], message: "Connect D1 database to persist notes" });
      }

      if (path === "/api/notes" && request.method === "POST") {
        const body = await request.json();
        // TODO: Insert into D1 database
        return json({ success: true, note: body }, 201);
      }

      // ─── Tasks API ────────────────────────────────────
      if (path === "/api/tasks" && request.method === "GET") {
        // TODO: Fetch from D1 database
        return json({ tasks: [], message: "Connect D1 database to persist tasks" });
      }

      if (path === "/api/tasks" && request.method === "POST") {
        const body = await request.json();
        // TODO: Insert into D1 database
        return json({ success: true, task: body }, 201);
      }

      // ─── User API ─────────────────────────────────────
      if (path === "/api/user/profile" && request.method === "GET") {
        // TODO: Validate auth token and return user profile
        return json({ message: "Implement auth token validation" });
      }

      // ─── Catch-all ────────────────────────────────────
      return json({ error: "Not Found", path }, 404);
    } catch (err: any) {
      return json({ error: "Internal Server Error", message: err.message }, 500);
    }
  },
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}
