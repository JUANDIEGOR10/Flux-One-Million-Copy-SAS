import { describe, it, expect, beforeEach } from 'vitest';
import { useLeadsDataStore } from '../store/leads-data-store';

describe('useLeadsDataStore CRUD', () => {
  beforeEach(() => {
    // Clear localStorage or state if needed
    // The store automatically initializes with mock data
  });

  it('should add a new lead', () => {
    const { addLead, leads } = useLeadsDataStore.getState();
    const initialCount = leads.length;
    
    addLead({
      nombre: 'Test Lead',
      email: 'test@example.com',
      fuente: 'instagram',
      presupuesto: 1000
    });
    
    expect(useLeadsDataStore.getState().leads.length).toBe(initialCount + 1);
    expect(useLeadsDataStore.getState().leads[0].nombre).toBe('Test Lead');
  });

  it('should delete a lead', () => {
    const { leads, deleteLead } = useLeadsDataStore.getState();
    const leadToDelete = leads[0].id;
    const initialCount = leads.length;
    
    deleteLead(leadToDelete);
    
    expect(useLeadsDataStore.getState().leads.length).toBe(initialCount - 1);
    expect(useLeadsDataStore.getState().leads.find(l => l.id === leadToDelete)).toBeUndefined();
  });

  it('should update a lead', () => {
    const { leads, updateLead } = useLeadsDataStore.getState();
    const leadToUpdate = leads[0].id;
    
    updateLead(leadToUpdate, { nombre: 'Updated Name' });
    
    const updatedLead = useLeadsDataStore.getState().leads.find(l => l.id === leadToUpdate);
    expect(updatedLead?.nombre).toBe('Updated Name');
  });
});
