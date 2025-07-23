"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconGripVertical,
  IconLayoutColumns,
  IconTrendingUp,
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import Image from "next/image"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Product } from "@/types/product"

function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      { ...attributes }
      { ...listeners }
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

const columns: ColumnDef<Product>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={ row.original.id } />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={ (value) => table.toggleAllPageRowsSelected(!!value) }
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={ row.getIsSelected() }
          onCheckedChange={ (value) => row.toggleSelected(!!value) }
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: ({ row }) => (
      <div className="h-12 w-12 overflow-hidden rounded border">
        <Image
          src={ row.original.thumbnail }
          alt={ row.original.title }
          width={ 48 }
          height={ 48 }
          className="object-cover"
        />
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Product Name",
    cell: ({ row }) => {
      return <TableCellViewer item={ row.original } />
    },
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">
          { row.original.category }
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="w-full text-right">Price</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        ${ row.original.price.toFixed(2) }
      </div>
    ),
  },
  {
    accessorKey: "stock",
    header: () => <div className="w-full text-right">Stock</div>,
    cell: ({ row }) => (
      <div className={ `text-right ${ row.original.stock < 10 ? 'text-red-600 font-semibold' : 'text-green-700' }` }>
        { row.original.stock }
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <span>{ row.original.rating }</span>
        <span className="text-yellow-500">⭐</span>
      </div>
    ),
  }
]

function DraggableRow({ row }: { row: Row<Product> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={ row.getIsSelected() && "selected" }
      data-dragging={ isDragging }
      ref={ setNodeRef }
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={ {
        transform: CSS.Transform.toString(transform),
        transition: transition,
      } }
    >
      { row.getVisibleCells().map((cell) => (
        <TableCell key={ cell.id }>
          { flexRender(cell.column.columnDef.cell, cell.getContext()) }
        </TableCell>
      )) }
    </TableRow>
  )
}

export function DataTable({
  data: initialData,
}: {
  data: Product[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <Tabs
      defaultValue="products"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="analytics">
            Analytics <Badge variant="secondary">{ data.length }</Badge>
          </TabsTrigger>
          <TabsTrigger value="inventory">
            Inventory <Badge variant="secondary">{ data.filter(p => p.stock < 10).length }</Badge>
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              { table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={ column.id }
                      className="capitalize"
                      checked={ column.getIsVisible() }
                      onCheckedChange={ (value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      { column.id }
                    </DropdownMenuCheckboxItem>
                  )
                }) }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TabsContent
        value="products"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={ closestCenter }
            modifiers={ [restrictToVerticalAxis] }
            onDragEnd={ handleDragEnd }
            sensors={ sensors }
            id={ sortableId }
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                { table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={ headerGroup.id }>
                    { headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={ header.id } colSpan={ header.colSpan }>
                          { header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            ) }
                        </TableHead>
                      )
                    }) }
                  </TableRow>
                )) }
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                { table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={ dataIds }
                    strategy={ verticalListSortingStrategy }
                  >
                    { table.getRowModel().rows.map((row) => (
                      <DraggableRow key={ row.id } row={ row } />
                    )) }
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={ columns.length }
                      className="h-24 text-center"
                    >
                      No products found.
                    </TableCell>
                  </TableRow>
                ) }
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex justify-end px-4">
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={ `${ table.getState().pagination.pageSize }` }
                onValueChange={ (value) => {
                  table.setPageSize(Number(value))
                } }
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={ table.getState().pagination.pageSize }
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  { [10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={ pageSize } value={ `${ pageSize }` }>
                      { pageSize }
                    </SelectItem>
                  )) }
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page { table.getState().pagination.pageIndex + 1 } of{ " " }
              { table.getPageCount() }
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={ () => table.setPageIndex(0) }
                disabled={ !table.getCanPreviousPage() }
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={ () => table.previousPage() }
                disabled={ !table.getCanPreviousPage() }
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={ () => table.nextPage() }
                disabled={ !table.getCanNextPage() }
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={ () => table.setPageIndex(table.getPageCount() - 1) }
                disabled={ !table.getCanNextPage() }
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="analytics"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="inventory" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  )
}

const chartData = [
  { month: "January", sales: 186, orders: 80 },
  { month: "February", sales: 305, orders: 200 },
  { month: "March", sales: 237, orders: 120 },
  { month: "April", sales: 73, orders: 190 },
  { month: "May", sales: 209, orders: 130 },
  { month: "June", sales: 214, orders: 140 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--primary)",
  },
  orders: {
    label: "Orders",
    color: "var(--primary)",
  },
} satisfies ChartConfig

function TableCellViewer({ item }: { item: Product }) {
  const isMobile = useIsMobile()

  return (
    <Drawer direction={ isMobile ? "bottom" : "right" }>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          { item.title }
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{ item.title }</DrawerTitle>
          <DrawerDescription>
            Product details and analytics
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          { !isMobile && (
            <>
              <ChartContainer config={ chartConfig }>
                <AreaChart
                  accessibilityLayer
                  data={ chartData }
                  margin={ {
                    left: 0,
                    right: 10,
                  } }
                >
                  <CartesianGrid vertical={ false } />
                  <XAxis
                    dataKey="month"
                    tickLine={ false }
                    axisLine={ false }
                    tickMargin={ 8 }
                    tickFormatter={ (value) => value.slice(0, 3) }
                    hide
                  />
                  <ChartTooltip
                    cursor={ false }
                    content={ <ChartTooltipContent indicator="dot" /> }
                  />
                  <Area
                    dataKey="orders"
                    type="natural"
                    fill="var(--color-orders)"
                    fillOpacity={ 0.6 }
                    stroke="var(--color-orders)"
                    stackId="a"
                  />
                  <Area
                    dataKey="sales"
                    type="natural"
                    fill="var(--color-sales)"
                    fillOpacity={ 0.4 }
                    stroke="var(--color-sales)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 12% this month{ " " }
                  <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Product performance over the last 6 months showing sales and order trends.
                </div>
              </div>
              <Separator />
            </>
          ) }
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Product Name</Label>
              <Input id="title" defaultValue={ item.title } />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="price">Price</Label>
                <Input id="price" defaultValue={ item.price.toString() } type="number" step="0.01" />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" defaultValue={ item.stock.toString() } type="number" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={ item.category }>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" defaultValue={ item.brand } />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Input id="description" defaultValue={ item.description } />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
