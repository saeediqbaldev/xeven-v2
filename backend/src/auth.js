import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = "7d";

export function signToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function getUserFromRequest(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Role permission matrix.
 * ADMIN: full access.
 * SEO: read everything, write only SEO/meta fields.
 * CONTENT: read everything, write only content/body/media fields.
 */
export const PERMISSIONS = {
  ADMIN: new Set(["read:all", "write:content", "write:seo", "write:users", "write:theme"]),
  SEO: new Set(["read:all", "write:seo"]),
  CONTENT: new Set(["read:all", "write:content"]),
};

export function requireAuth(user) {
  if (!user) {
    const err = new Error("Not authenticated");
    err.extensions = { code: "UNAUTHENTICATED" };
    throw err;
  }
}

export function requirePermission(user, permission) {
  requireAuth(user);
  const allowed = PERMISSIONS[user.role]?.has(permission);
  if (!allowed) {
    const err = new Error(`Forbidden: role '${user.role}' lacks '${permission}'`);
    err.extensions = { code: "FORBIDDEN" };
    throw err;
  }
}
