import { Def, Index, R } from "../deps.ts";
import { Access, Span } from "../deps.ts";
import { Expression, Expressions, M } from "../deps.ts";

/////////////////////
// General-purpose //
/////////////////////

export function MCeil({ children }: { base?: Expressions, children?: Expressions }): Expression {
  return (
    <M>\lceil<exps x={children}/>\rceil</M>
  );
}

export function MFloor({ children }: { base?: Expressions, children?: Expressions }): Expression {
  return (
    <M>\lfloor<exps x={children}/>\rfloor</M>
  );
}

export function MLog({ children, base }: { base?: Expressions, children?: Expressions }): Expression {
  return (
    <M>\log{base ? <>_<Curly><exps x={base}/></Curly></> : ""}(<exps x={children}/>)</M>
  );
}

export function Mathcal({ children }: { children?: Expressions }): Expression {
  return (
    <M>\mathcal<Curly><exps x={children}/></Curly></M>
  );
}

export function MAligned({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      \begin<Curly>aligned</Curly>
        <exps x={children}/>
      \end<Curly>aligned</Curly>
    </M>
  );
}

export function MParen({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      \left(<exps x={children}/>\right)
    </M>
  );
}

export function Sum({ sub, sup, children }: { sub?: Expressions, sup?: Expressions, children?: Expressions }): Expression {
  return (
    <M>
      \sum
      {sub
        ? (
          <>
            _<Curly>
            <exps x={sub} />
            </Curly>
          </>
        )
        : ""}
      {sup
        ? (
          <>
            ^<Curly>
            <exps x={sup} />
            </Curly>
          </>
        )
        : ""}
        <exps x={children}/>
    </M>
  );
}

export function Exp({ sup, children }: { sup?: boolean, children?: Expressions }): Expression {
  return (
    <M>
      { sup
        ? <>e^<Curly><exps x={children}/></Curly></>
        : <>\exp\left(<exps x={children}/>\right)</>
      }
    </M>
  );
}

export function Mathfrak({ children }: { children?: Expressions }): Expression {
  return (
    <M>\mathfrak<Curly><exps x={children}/></Curly></M>
  );
}

export function MFrac({ num, de }: { num: Expressions, de: Expressions }): Expression {
  return (
    <M>\frac<Curly><exps x={num}/></Curly><Curly><exps x={de}/></Curly></M>
  );
}

export function Curly({ children }: { children?: Expressions }): Expression {
  return (
    <>{"{"}<exps x={children}/>{"}"}</>
  );
}

export function MSet({ children }: { children?: Expressions }): Expression {
  return (
    <M>{"\\{"}<exps x={children}/>{"\\}"}</M>
  );
}

export function BigO({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      <Mathcal>O</Mathcal>(<exps x={children} />)
    </M>
  );
}

export function Pr({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      ℙ \left(<exps x={children} />\right)
    </M>
  );
}

export function E({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      𝔼 \left(<exps x={children} />\right)
    </M>
  );
}

export function BigTheta({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      \Theta
      {"("}
      <exps x={children} />
      {")"}
    </M>
  );
}

export function BigOmega({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      \Omega
      {"("}
      <exps x={children} />
      {")"}
    </M>
  );
}

/**
 * \Nat^{+}
 */
export function Np(): Expression {
  return <M>\N^{`{+}`}</M>;
}

/**
 * Render a string as an operator name.
 */
export function OpName({ children }: { children: Expressions }): Expression {
  return (
    <M>
      \mathrm{"{"}
      <exps x={children} />
      {"}"}
    </M>
  );
}

/**
 * Mathy function name and optional type. Creates a DefRef def for the function. Children are the rendered name of the function.
 */
export function MFunDef(
  { n, preview, dom, co, sub, children }: {
    n: string;
    preview?: Expression;
    dom: Expressions;
    co: Expressions;
    sub?: Expressions;
    children: Expressions;
  },
): Expression {
  return (
    <M>
      <Def
        n={n}
        preview={preview}
        r={
          <OpName>
            <exps x={children} />
          </OpName>
        }
      />
      {sub
        ? (
          <>
            _{"{"}
            <exps x={sub} />
            {"}"}
          </>
        )
        : ""}
      {dom && co
        ? (
          <>
            {":"} <exps x={dom} /> \rightarrow <exps x={co} />
          </>
        )
        : ""}
    </M>
  );
}

export function NoWrap({ children }: { children: Expressions }): Expression {
  return (
    <Span clazz="nowrap">
      <exps x={children} />
    </Span>
  );
}

export function Quotes({ children }: { children: Expressions }): Expression {
  return (
    <>“<exps x={children} />”</>
  );
}

/////////////////////////////
// Specific to this paper. //
/////////////////////////////

export function TreeItems({ children }: { children: Expressions }): Expression {
  return (
    <NoWrap>
      <Access at="items">
        <exps x={children} />
      </Access>
    </NoWrap>
  );
}

/**
 * children are the index of the item.
 */
export function TreeItem(
  { tree, children }: { tree: Expressions; children: Expressions },
): Expression {
  return (
    <NoWrap>
      <Index index={<exps x={children} />}>
        <TreeItems>
          <exps x={tree} />
        </TreeItems>
      </Index>
    </NoWrap>
  );
}

export function TreeChildren(
  { children }: { children: Expressions },
): Expression {
  return (
    <NoWrap>
      <Access at="children">
        <exps x={children} />
      </Access>
    </NoWrap>
  );
}

/**
 * children are the index of the child.
 */
export function TreeChild(
  { tree, children }: { tree: Expressions; children: Expressions },
): Expression {
  return (
    <NoWrap>
      <Index index={<exps x={children} />}>
        <TreeChildren>
          <exps x={tree} />
        </TreeChildren>
      </Index>
    </NoWrap>
  );
}

/**
 * children are success probability.
 */
export function GeoDistribution(
  { children }: { children: Expressions },
): Expression {
  return (
    <M>
      <R n="geometric_distribution" />
      {`(`}
      <exps x={children} />
      {`)`}
    </M>
  );
}

/**
 * p is the probability. If children are given, renders a function call.
 */
export function Rank(
  { p, children }: { p?: Expressions; children?: Expressions },
): Expression {
  return (
    <M>
      <R n="fn_rank" />
      {p
        ? (
          <>
            _{"{"}
            <exps x={p} />
            {"}"}
          </>
        )
        : ""}
      {children === undefined ? "" : (
        <>
          (<exps x={children} />)
        </>
      )}
    </M>
  );
}

export function Hash(
  { children }: { children?: Expressions },
): Expression {
  return (
    <M><OpName>hash</OpName>\left(<exps x={children} />\right)</M>
  );
}

export function Orange({ children }: { children: Expressions }): Expression {
  return (
    <Span style="color: #ff8000">
      <exps x={children} />
    </Span>
  );
}

export function Magenta({ children }: { children: Expressions }): Expression {
  return (
    <Span style="color: #fb3199">
      <exps x={children} />
    </Span>
  );
}

export function Cyan({ children }: { children: Expressions }): Expression {
  return (
    <Span style="color: #00b9f2">
      <exps x={children} />
    </Span>
  );
}

export function Pink({ children }: { children: Expressions }): Expression {
  return (
    <Span style="color: #ffbfbf">
      <exps x={children} />
    </Span>
  );
}