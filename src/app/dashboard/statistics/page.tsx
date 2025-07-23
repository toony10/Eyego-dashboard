
import DualPieChart from '@/components/charts/DualPieChart'
import SalesAreaChart from '@/components/charts/SalesAreaChart'
import { SectionCards } from '@/components/dashboard/section-cards'

export default async function page() {

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards />
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-20
                     my-8 px-4">
                        <div className="bg-white rounded-xl">
                            <h3 className="font-bold text-xl mb-4">Product Distribution</h3>
                            <DualPieChart />
                        </div>
                        <div className="bg-white rounded-xl">
                            <h3 className="font-bold text-xl mb-4">Monthly Sales, Users & Orders</h3>
                            <SalesAreaChart />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
