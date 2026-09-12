// lib/auth-middleware.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthUser {
  email: string;
  role: string;
}

export async function verifyAdminAuth(request: Request): Promise<{ user: AuthUser } | { error: NextResponse }> {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        error: NextResponse.json(
          { success: false, message: 'No token provided' },
          { status: 401 }
        )
      };
    }

    const token = authHeader.substring(7);
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      return {
        error: NextResponse.json(
          { success: false, message: 'Server configuration error' },
          { status: 500 }
        )
      };
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string' || decoded.role !== 'admin' || typeof decoded.email !== 'string') {
      return {
        error: NextResponse.json(
          { success: false, message: 'Insufficient permissions' },
          { status: 403 }
        )
      };
    }
    
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      return {
        error: NextResponse.json(
          { success: false, message: 'Token expired' },
          { status: 401 }
        )
      };
    }

    // Check if user has admin role
    return {
      user: {
        email: decoded.email,
        role: decoded.role
      }
    };

  } catch (error) {
    console.error('Token verification error:', error);
    
    if (error instanceof jwt.TokenExpiredError) {
      return {
        error: NextResponse.json(
          { success: false, message: 'Token expired' },
          { status: 401 }
        )
      };
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return {
        error: NextResponse.json(
          { success: false, message: 'Invalid token' },
          { status: 401 }
        )
      };
    }

    return {
      error: NextResponse.json(
        { success: false, message: 'Token verification failed' },
        { status: 401 }
      )
    };
  }
}
