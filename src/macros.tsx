import { Expression, Expressions, M } from "../deps.ts";

export function BigO({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      {`\\mathcal{O}(`}
      <exps x={children} />
      {")"}
    </M>
  );
}
