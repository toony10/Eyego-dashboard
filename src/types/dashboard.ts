export interface DashboardItem {
  id: string;
  name: string;
  value: number;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}
