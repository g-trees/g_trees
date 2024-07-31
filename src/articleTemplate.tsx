import citationStyle from "../../macromania_temporary_monorepo/macromania_bib/styles/din-1505-2.csl.json" with { type: "json" };
// import citationStyle from "../../macromania_temporary_monorepo/macromania_bib/styles/acm-sig-proceedings.csl.json" with { type: "json" };
/*
The macromania_bib package reexports the citations styles from https://github.com/citation-style-language/styles as jsons trings that can be directly imported into typescript. Very convenient. 
*/

import {
  Bibliography,
  BibScope,
  ConfigDefref,
  ConfigHsection,
  ConfigPreviews,
  ConfigPseudocode,
  ConfigWip,
  Div,
  JsDependency,
  makeNumberingRenderer,
  PreviewScopePushWrapper,
  ScriptDependencyInfo,
  TableOfContents,
} from "../deps.ts";
import { Counter } from "../deps.ts";
import { Section } from "../deps.ts";
import {
  Assets,
  Config,
  ConfigKatex,
  ConfigMarginalia,
  CssDependency,
  Dir,
  Expression,
  Expressions,
  File,
  Hsection,
  Html5,
  ServerRoot,
} from "../deps.ts";
import { LayoutStyles } from "./layoutStyles.tsx";
import { bib } from "./bib.tsx";

export type ArticleTemplateProps = {
  title: Expression;
  titleId: string;
  abstract?: Expressions;
  authors?: AuthorInfo[];
};

export type AuthorInfo = {
  name: Expressions;
  email?: Expressions;
  affiliation?: Expressions;
  other?: Expressions;
};

const prettyPreviewsInfo: ScriptDependencyInfo = {
  dep: ["pretty_previews.js"],
  scriptProps: { defer: true, type: "module" },
};

const refHighlighting: ScriptDependencyInfo = {
  dep: ["defs.js"],
  scriptProps: { defer: true, type: "module" },
};

export function ArticleTemplate(
  { title, titleId, abstract, children, authors }: ArticleTemplateProps & {
    children?: Expressions;
  },
): Expression {
  const headingPreRenderer = makeNumberingRenderer(1);

  const sidenoteCounter = new Counter("sidenote-counter", 0);

  return (
    <Config
      options={[
        <ConfigPseudocode
          cssDeps={[{ dep: ["pseudocode.css"] }]}
          jsDeps={[{
            dep: ["pseudocode.js"],
            scriptProps: { defer: true, type: "module" },
          }]}
        />,
        <ConfigKatex stylesheet={["katex.min.css"]} />,
        <ConfigHsection
          titleRenderPre={(ctx, numbering) => {
            if (numbering.length <= 1) {
              return "";
            } else {
              return <>{headingPreRenderer(ctx, numbering)}{" "}</>;
            }
          }}
        />,
        <ConfigPreviews
          previewPath={["build", "previews"]}
          cssDeps={[{ dep: ["index.css"] }]}
          jsDeps={[prettyPreviewsInfo]}
        />,
        <ConfigDefref
          depsCssDef={[]}
          depsJsDef={[prettyPreviewsInfo, refHighlighting]}
          depsCssPreview={[]}
          depsJsPreview={[]}
          depsCssRef={[]}
          depsJsRef={[prettyPreviewsInfo, refHighlighting]}
        />,
        <ConfigMarginalia sidenoteCounter={sidenoteCounter} />,
        <ConfigWip
          // hideWIP // uncomment this line to hide all WIP annotations and silence the warning
        />
      ]}
    >
      {/* Create some assets before the "real" build step. */}
      <Dir clean={false} name="src">
        <Dir clean={false} name="assets">
          <File mode="assertive" name="layout.css">
            <LayoutStyles
              htmlFontSizeInPx={19.2}
              paddingLeft={0.8}
              paddingRight={0.8}
              maxMain={32}
              paddingMarginalia={1.6}
              marginalia={14}
              paddingToc={1.6}
              toc={13}
              // dev
            />
          </File>
        </Dir>
      </Dir>

      <Dir name="build">
        <ServerRoot url="g_trees">
          <Dir name="assets">
            {/* See https://github.com/worm-blossom/macromania-assets */}
            <Assets input={["src", "assets"]} assets={{}} />
          </Dir>
          <PreviewScopePushWrapper
            wrapper={(_ctx, preview) => {
              return <Div id="wrapContent">{preview}</Div>;
            }}
          >
            <File name="index.html">
              <BibScope
                style={citationStyle} // The citationStyle variable is set in the first line of this file. Look there for more information.
                lang="en-US" // Valid strings for specifying the locales are of the form `xx-YY` for which https://github.com/citation-style-language/locales contains a `locales-xx-YY.xml` file. 
                forceLang // Ensure the locale you specified is used even if the citation style specifies a default locale.
                items={bib}
              >
                <Html5
                  title="Geometric Search Trees"
                  headContents={`<meta name="viewport" content="width=device-width, initial-scale=1"><script>
  /*to prevent Firefox FOUC, this must be here*/
  let FF_FOUC_FIX;
</script>`}
                >
                  <CssDependency dep={["index.css"]} />
                  <JsDependency
                    dep={["toc.js"]}
                    scriptProps={{ defer: true }}
                  />

                  <Div id="wrapContent">
                    <Hsection title={title} n={titleId}>
                      <TableOfContents stopLevel={99} />
                      <Div>
                        <RenderAuthors authors={authors ?? []} />
                      </Div>
                      <Div>
                        <RenderAbstract children={abstract} />
                      </Div>
                      <exps x={children} />
                    </Hsection>
                  </Div>
                </Html5>
              </BibScope>
            </File>
          </PreviewScopePushWrapper>
        </ServerRoot>
      </Dir>
    </Config>
  );
}

function RenderAbstract({ children }: { children?: Expressions }): Expression {
  if (children === undefined) {
    return "";
  }
  return <Section clazz="abstract" children={children} />;
}

function RenderAuthors({ authors }: { authors: AuthorInfo[] }): Expression {
  if (authors.length === 0) {
    return "";
  }

  const authorRendering = authors.map(renderAuthor);
  return (
    <Div clazz="authors">
      <exps x={authorRendering} />
    </Div>
  );
}

function renderAuthor(author: AuthorInfo): Expression {
  return (
    <Div clazz="author">
      <Div clazz="authorName">{author.name}</Div>
      {author.affiliation
        ? <Div clazz="authorAffiliation">{author.affiliation}</Div>
        : ""}
      {author.email ? <Div clazz="authorEmail">{author.email}</Div> : ""}
      {author.other ? <Div clazz="authorOther">{author.other}</Div> : ""}
    </Div>
  );
}
