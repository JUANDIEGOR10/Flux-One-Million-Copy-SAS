import { describe, it, expect } from 'vitest';
import { leadSchema } from '../lib/validations';

describe('leadSchema Validation', () => {
  it('should validate a correct lead', () => {
    const validLead = {
      nombre: 'Juan Perez',
      email: 'juan@example.com',
      fuente: 'instagram',
      telefono: '123456789',
      presupuesto: 500
    };
    const result = leadSchema.safeParse(validLead);
    expect(result.success).toBe(true);
  });

  it('should fail if nombre is too short', () => {
    const invalidLead = {
      nombre: 'J',
      email: 'juan@example.com',
      fuente: 'facebook'
    };
    const result = leadSchema.safeParse(invalidLead);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('al menos 2 caracteres');
    }
  });

  it('should fail if email is invalid', () => {
    const invalidLead = {
      nombre: 'Juan Perez',
      email: 'not-an-email',
      fuente: 'landing_page'
    };
    const result = leadSchema.safeParse(invalidLead);
    expect(result.success).toBe(false);
  });

  it('should fail if fuente is not allowed', () => {
    const invalidLead = {
      nombre: 'Juan Perez',
      email: 'juan@example.com',
      fuente: 'source-not-existent'
    };
    const result = leadSchema.safeParse(invalidLead);
    expect(result.success).toBe(false);
  });
});
