import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const SkeletonCard = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="skeleton h-6 w-32"></CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="p-3 rounded-lg bg-secondary/50">
              <div className="space-y-2">
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-3 w-1/2"></div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};