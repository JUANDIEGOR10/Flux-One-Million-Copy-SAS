import { describe, it, expect, beforeEach } from 'vitest';
import { useLeadsStore } from '../store/leads-store';

describe('useLeadsStore', () => {
  beforeEach(() => {
    const { resetFilters } = useLeadsStore.getState();
    resetFilters();
  });

  it('should update search filter', () => {
    const { setSearch } = useLeadsStore.getState();
    setSearch('Juan');
    expect(useLeadsStore.getState().filters.search).toBe('Juan');
  });

  it('should update sources filter', () => {
    const { setFuentes } = useLeadsStore.getState();
    setFuentes(['instagram', 'facebook']);
    expect(useLeadsStore.getState().filters.fuentes).toContain('instagram');
    expect(useLeadsStore.getState().filters.fuentes).toHaveLength(2);
  });

  it('should reset filters to initial state', () => {
    const { setSearch, setFuentes, resetFilters } = useLeadsStore.getState();
    setSearch('Juan');
    setFuentes(['instagram']);
    resetFilters();
    
    const state = useLeadsStore.getState();
    expect(state.filters.search).toBe('');
    expect(state.filters.fuentes).toHaveLength(0);
  });
});
