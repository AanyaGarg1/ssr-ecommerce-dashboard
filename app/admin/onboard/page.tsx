'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Loader2, UserPlus } from 'lucide-react';

export default function OnboardAdminPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/onboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Admin created successfully!');
                setFormData({ name: '', email: '', password: '' });
            } else {
                alert(data.error || 'Failed to create admin');
            }
        } catch (error) {
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Onboard Dashboard Admin</h1>
                <p className="text-gray-500 mt-1">Create a new administrator account with dashboard access.</p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                            <UserPlus className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle>New Admin Details</CardTitle>
                            <CardDescription>Enter the details for the new administrator.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <Input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="admin@company.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                required
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Set a strong password"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 bg-gray-50/50 p-4 rounded-b-xl border-t border-gray-100">
                        <Button variant="ghost" type="button" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Admin
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl">
                <h4 className="text-sm font-semibold text-yellow-800 flex items-center gap-2 mb-1">
                    Security Note
                </h4>
                <p className="text-sm text-yellow-700">
                    This page allows you to grant full administrative access to the dashboard. secure it carefully.
                    Only existing admins can access this page.
                </p>
            </div>
        </div>
    );
}
