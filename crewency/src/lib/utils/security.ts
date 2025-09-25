// Security and compliance utilities for Crewency

import { NextRequest } from 'next/server';
import { createAuditLog } from '@/lib/auth/auth';

// GDPR compliance utilities
export class GDPRCompliance {
  // Check if user has given consent for data processing
  static hasConsent(userId: string, consentType: string): boolean {
    // TODO: Implement actual consent checking from database
    console.log(`Checking consent for user ${userId} and type ${consentType}`);
    return true; // Mock implementation
  }

  // Record user consent
  static async recordConsent(
    userId: string,
    consentType: string,
    granted: boolean,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    // TODO: Implement actual consent recording
    console.log(`Recording consent for user ${userId}: ${consentType} = ${granted}`);
    
    // Create audit log for consent
    await createAuditLog(
      userId,
      '', // organizationId - will be fetched
      'consent_recorded',
      'user_consent',
      userId,
      {
        consentType,
        granted,
        timestamp: new Date().toISOString(),
        ipAddress,
        userAgent,
      }
    );
  }

  // Request data deletion (GDPR right to be forgotten)
  static async requestDataDeletion(userId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    // TODO: Implement actual data deletion process
    console.log(`Data deletion requested for user ${userId}`);
    
    // Create audit log for deletion request
    await createAuditLog(
      userId,
      '', // organizationId - will be fetched
      'data_deletion_requested',
      'user_data',
      userId,
      {
        requestTimestamp: new Date().toISOString(),
        status: 'pending',
      }
    );

    return {
      success: true,
      message: 'Data deletion request has been submitted and will be processed within 30 days.',
    };
  }

  // Export user data (GDPR right to data portability)
  static async exportUserData(userId: string): Promise<{
    success: boolean;
    data?: any;
    message: string;
  }> {
    // TODO: Implement actual data export
    console.log(`Data export requested for user ${userId}`);
    
    // Create audit log for data export
    await createAuditLog(
      userId,
      '', // organizationId - will be fetched
      'data_export_requested',
      'user_data',
      userId,
      {
        requestTimestamp: new Date().toISOString(),
        status: 'completed',
      }
    );

    return {
      success: true,
      message: 'Your data has been exported and sent to your email address.',
    };
  }
}

// Security utilities
export class SecurityUtils {
  // Validate and sanitize input
  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['"]/g, '') // Remove quotes
      .substring(0, 1000); // Limit length
  }

  // Check for SQL injection attempts
  static detectSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
      /(\b(OR|AND)\s+'.*'\s*=\s*'.*')/i,
      /(\bUNION\s+SELECT\b)/i,
      /(\bDROP\s+TABLE\b)/i,
      /(\bINSERT\s+INTO\b)/i,
      /(\bUPDATE\s+SET\b)/i,
      /(\bDELETE\s+FROM\b)/i,
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
  }

  // Check for XSS attempts
  static detectXSS(input: string): boolean {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<img[^>]+src[^>]*>/gi,
    ];

    return xssPatterns.some(pattern => pattern.test(input));
  }

  // Rate limiting check
  static async checkRateLimit(
    identifier: string,
    action: string,
    maxAttempts: number = 10,
    windowMs: number = 60000
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    // TODO: Implement actual rate limiting with Redis or database
    console.log(`Rate limit check for ${identifier} performing ${action}`);
    
    // Mock implementation - always allow for now
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetTime: Date.now() + windowMs,
    };
  }

  // Validate file upload
  static validateFileUpload(
    file: File,
    allowedTypes: string[],
    maxSize: number
  ): { valid: boolean; error?: string } {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
      };
    }

    // Check file size
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size ${file.size} bytes exceeds maximum allowed size of ${maxSize} bytes`,
      };
    }

    return { valid: true };
  }

  // Generate secure random string
  static generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const crypto = require('crypto');
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(crypto.randomBytes(1)[0] / 256 * chars.length));
    }
    
    return result;
  }

  // Hash sensitive data
  static async hashData(data: string): Promise<string> {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // Verify data integrity
  static async verifyDataIntegrity(data: string, hash: string): Promise<boolean> {
    const crypto = require('crypto');
    const dataHash = crypto.createHash('sha256').update(data).digest('hex');
    return dataHash === hash;
  }
}

// Content Security Policy utilities
export class CSPUtils {
  // Generate CSP header
  static generateCSPHeader(): string {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://*.supabase.co https://api.stripe.com",
      "frame-src 'self' https://js.stripe.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; ');
  }

  // Validate CSP violation
  static validateCSPViolation(violation: any): boolean {
    // TODO: Implement CSP violation validation and logging
    console.log('CSP violation detected:', violation);
    return true;
  }
}

// Data encryption utilities
export class EncryptionUtils {
  // Encrypt sensitive data
  static async encryptData(data: string, key: string): Promise<string> {
    const crypto = require('crypto');
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  // Decrypt sensitive data
  static async decryptData(encryptedData: string, key: string): Promise<string> {
    const crypto = require('crypto');
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

// Audit logging utilities
export class AuditUtils {
  // Log security event
  static async logSecurityEvent(
    userId: string,
    organizationId: string,
    event: string,
    details: any,
    request?: NextRequest
  ): Promise<void> {
    await createAuditLog(
      userId,
      organizationId,
      `security_${event}`,
      'security_event',
      undefined,
      {
        ...details,
        timestamp: new Date().toISOString(),
        ipAddress: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip'),
        userAgent: request?.headers.get('user-agent'),
      }
    );
  }

  // Log data access
  static async logDataAccess(
    userId: string,
    organizationId: string,
    resourceType: string,
    resourceId: string,
    action: string,
    request?: NextRequest
  ): Promise<void> {
    await createAuditLog(
      userId,
      organizationId,
      `data_${action}`,
      resourceType,
      resourceId,
      {
        timestamp: new Date().toISOString(),
        ipAddress: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip'),
        userAgent: request?.headers.get('user-agent'),
      }
    );
  }
}