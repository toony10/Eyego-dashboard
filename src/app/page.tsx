'use client';
import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import { auth } from '@/app/firebase/config';

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      console.log('Logged out');
      router.push('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={ handleLogout }
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Your Dashboard
            </h2>
            <p className="text-gray-600 mb-6">
              This is your main dashboard where you can access all your data and analytics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900">Data Table</h3>
                <p className="text-blue-600">Coming soon...</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-green-900">Charts</h3>
                <p className="text-green-600">Coming soon...</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-purple-900">Analytics</h3>
                <p className="text-purple-600">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
