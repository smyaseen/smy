import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/hashnode/generated/graphql";
import Image from "next/image";

type Props = {
  badge: Badge;
};

export default function BadgeListItem({ badge }: Props) {
  return (
    <li>
      <Card>
        <CardHeader>
          <div className="py-2">
            <Image width={50} height={50} alt={badge.image} src={badge.image} />
          </div>
          <CardTitle>{badge.name}</CardTitle>
          <CardDescription>{new Date(badge.dateAssigned!).toLocaleDateString("en-GB")}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <span className="min-h-16 text-sm">{badge.description}</span>
        </CardContent>
      </Card>
    </li>
  );
}
