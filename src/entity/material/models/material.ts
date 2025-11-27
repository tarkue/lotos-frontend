export interface Material {
  id: number;
  module_id: number;
  title: string;
  type: string;
  position: number;
  is_completed: boolean;
  completed_at?: string | null;
  is_locked?: boolean;
  lock_reason?: string | null;
  has_tests?: boolean;
}
