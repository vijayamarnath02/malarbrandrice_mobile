export interface TabItem {
    id: number;
    tab: string;
    icon: string;
    label: string;
    adminOnly: boolean;
    badge?: number;
    title: string;
    centerTab: boolean;
}
