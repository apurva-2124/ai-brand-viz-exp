
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRecommendationBadge, getMentionsBadge } from "@/components/visibility/analysis/StatusBadges";

interface AIVsTraditionalTableProps {
  brandMentionCount: number;
  googleMentionCount: number;
  isExplicitlyRecommended: boolean;
  isTopGoogleResult: boolean;
  sentiment: any;
  recommendation: any;
}

export const AIVsTraditionalTable = ({
  brandMentionCount,
  googleMentionCount,
  isExplicitlyRecommended,
  isTopGoogleResult,
  sentiment,
  recommendation
}: AIVsTraditionalTableProps) => {
  return (
    <div className="mb-4">
      <h4 className="font-medium mb-2 underline">AI vs. Traditional Search: Quick Comparison</h4>
      <Table className="border">
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="font-medium">Search Type</TableHead>
            <TableHead className="font-medium">Brand Mentions</TableHead>
            <TableHead className="font-medium">Recommendation</TableHead>
            <TableHead className="font-medium">Sentiment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className={!brandMentionCount ? "bg-red-50" : ""}>
            <TableCell className="font-medium">AI Search</TableCell>
            <TableCell>
              {getMentionsBadge(brandMentionCount, true, recommendation.level)}
            </TableCell>
            <TableCell>
              {getRecommendationBadge(isExplicitlyRecommended, true)}
            </TableCell>
            <TableCell>{sentiment.sentiment}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Google Search</TableCell>
            <TableCell>
              {getMentionsBadge(googleMentionCount, false, isTopGoogleResult ? 'top' : 'regular')}
            </TableCell>
            <TableCell>
              {getRecommendationBadge(isTopGoogleResult, false)}
            </TableCell>
            <TableCell>Neutral</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
