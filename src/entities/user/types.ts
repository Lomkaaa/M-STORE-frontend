
export type User = {
    id: string;
	email: string;
	password: string;
	name?: string;
	avatarUrl: string;
    phone: string;
	createdAt: string;
	updatedAt: string;
	role: 'USER' | 'ADMIN';
	balance: number;
}