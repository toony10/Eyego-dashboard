import { ChartBarIcon, ClubIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Link href="/dashboard/statistics" className="group">
          <div className="p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Statistics</h3>
                <p className="text-gray-600">View detailed analytics and reports</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/products" className="group">
          <div className="p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <ClubIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Products</h3>
                <p className="text-gray-600">Manage your product inventory</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
