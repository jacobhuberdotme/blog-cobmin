import { Separator } from "@/components/ui/separator";

const TokenInfo = ({ tokenInfo }: { tokenInfo: any }) => (
  <>
    <div className="space-y-1 mb-4">
      <p className="break-words"><strong>Token Address:</strong> {tokenInfo.token_address}</p>
    </div>
    <Separator className="my-4" />
    <div className="flex justify-center items-center space-x-4 text-sm mb-4">
      <div><strong>Symbol:</strong> {tokenInfo.token_symbol}</div>
      <Separator orientation="vertical" />
      <div><strong>Supply:</strong> {parseInt(tokenInfo.total_supply) + 1}</div>
      <Separator orientation="vertical" />
      <div><strong>Holders:</strong> {tokenInfo.total_holders}</div>
      <Separator orientation="vertical" />
      <div><strong>Transfers:</strong> {tokenInfo.total_transfers}</div>
    </div>
  </>
);

export default TokenInfo;
