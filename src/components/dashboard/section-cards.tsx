import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card" key="Total Revenue">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $15,430.75
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +8.7%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong sales in the last quarter <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Includes seasonal discounts
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card" key="New Customers">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            3,985
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -5.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Acquisition dropped due to holidays <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Marketing campaign planned
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card" key="Active Accounts">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            22,134
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +11.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            User engagement improved <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Mobile app users increased
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card" key="Growth Rate">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            6.8%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +6.8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Consistent growth month over month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Sales projections exceeded
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
