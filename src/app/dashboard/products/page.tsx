import { DataTable } from '@/components/dashboard/data-table'

export default async function page() {
    const response = await fetch('https://dummyjson.com/products', {
        next: { revalidate: 120 },
    })
    const data = await response.json()

    return (
        <div className='my-5'>
            <DataTable data={ data.products } />
        </div>
    )
}
