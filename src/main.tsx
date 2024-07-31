import {
  AccessStruct,
  AccessTuple,
  Application,
  Bib,
  Bibliography,
  BlankPattern,
  Br,
  DefValue,
  Dfn,
  Else,
  ElseIf,
  Enum,
  Gt,
  If,
  CommentLine,
  Img,
  Interface,
  Let,
  LetRaw,
  Loc,
  Lt,
  Match,
  QualifiedMember,
  Self,
  SpliceLoc,
  Struct,
  StructDef,
  Sup,
  Tuple,
  TupleType,
  TypeApplication,
  Wip,
  Table,
  Tr,
  Td,
  Tbody,
  Th,
  Thead,
  H6,
} from "macromaniajsx/jsx-runtime";
import {
  A,
  Code,
  Context,
  Counter,
  Def,
  Em,
  Expression,
  Expressions,
  FunctionItem,
  Hsection,
  Li,
  M,
  makeFigureMacro,
  makeNumberingRenderer,
  Marginale,
  MM,
  P,
  PreviewScope,
  Pseudocode,
  R,
  Rc,
  Rcb,
  ResolveAsset,
  Return,
  Rs,
  Rsb,
  Sidenote,
  Span,
  Ul,
} from "macromaniajsx/jsx-runtime";
import { ArticleTemplate } from "./articleTemplate.tsx";
import {
  BigO,
  Curly,
  Cyan,
  Magenta,
  Sum,
  Pr,
  E,
  Exp,
  Mathfrak,
  MAligned,
  MCeil,
  MFrac,
  MFunDef,
  MLog,
  MSet,
  NoWrap,
  Np,
  MParen,
  OpName,
  Hash,
  Orange,
  Pink,
  Quotes,
  Rank,
  TreeChild,
  TreeChildren,
  TreeItem,
} from "./macros.tsx";
import { TreeItems } from "./macros.tsx";
import { GeoDistribution } from "./macros.tsx";

const ctx = new Context();

/*
Create a custom annotation macro.
*/
function Todo(
  { children, inline }: { children?: Expressions; inline?: boolean },
): Expression {
  return (
    <Wip
      fg="#6804cc"
      bg="#ecdbfc"
      wrap={(_ctx, inner) => <>TODO: {inner}</>}
      children={children}
      inline={inline}
    />
  );
}

/*
Create macros for figures (which includes theorem-like blocks).
*/

const figureCounter = new Counter("figure-counter", 0);
const Fig = makeFigureMacro(ctx, {
  figureCounter: figureCounter,
  numberingInfo: {
    r: "Figure",
    rb: "Figure",
    rs: "Figures",
    rsb: "Figures",
    render: makeNumberingRenderer(),
  },
});

// A counter shared by several theorem-like blocks.
const thmCounter = new Counter("thm-counter", 0);

const Definition = makeFigureMacro(ctx, {
  figureCounter: thmCounter,
  numberingInfo: {
    r: "Definition",
    rb: "Definition",
    rs: "Definition",
    rsb: "Definition",
    render: makeNumberingRenderer(),
  },
  isTheoremLike: true,
});

// The full input to Macromania is a single expression, which we then evaluate.
const exp = (
  <ArticleTemplate
    title="Geometric Search Trees"
    titleId="title"
    abstract={
      <>
        <P>
          We describe the G-trees, a family of randomized, history-independent search tree data structures. The G-trees encompass several independently-discovered data structures such as zip-trees, zip-zip-trees, and dense skip-trees.
          The family further contains novel trees of arity greater than two, which are significantly more efficient in the presence of cache hierarchies or block storage than zip-trees.
          Traditionally, such randomized trees have been significantly more complex than their binary counterparts, whereas our <M>k</M>-ary G-trees have no additional conceptual overhead at all.
          We generalize the zip and unzip operations of zip-trees to provide a uniform, simple, and efficient implementation technique for all members of our family of data structures.
        </P>
      </>
    }
    authors={[
      {
        name: "Carson Farmer",
        affiliation: "Textile, Inc",
        email: <A href="mailto:carson@textile.io">carson@textile.io</A>,
      },
      {
        name: "Aljoscha Meyer",
        affiliation: "TU Berlin",
        email: <A href="mailto:research@aljoscha-meyer.de">research@aljoscha-meyer.de</A>,
      },
    ]}
  >
    <Hsection n="introduction" title="Introduction">
      <P>
        Randomized set data structures eschew self-balancing logic for simpler, probabilistic item organization.
        When deriving the necessary randomness via pseudorandom functions of the stored items themselves, the resulting graphs depend on the stored set only, but not the order of insertions and deletions.
        This <Def n="history_independent"
          r="history-independent"
          preview={
            <P>
              A <Def n="history_independent" fake /> set data structure is a data structure whose internal representation dependes only on the set it stores, not on the order of operations through which this set was created or modified.
            </P>
          }
        >
          history-independence
        </Def> ensures that no information about previously deleted items can be reconstructed<Bib item="naor2001anti" />, and it enables <Bib item="pugh1989incremental">efficient set fingerprinting</Bib> when using the data structure as a <Bib item="merkle1989certified">merkle-tree</Bib>.
      </P>

      <P>
        For these reasons, randomized search trees and related data structures have been studied for decades.
        The most prominent such data structures are <Def
          n="treap"
          rs="treaps"
          preview={
            <>
              <P>
                A <Def n="treap" fake>treap</Def> <Bib item="seidel1996randomized" /> is a randomized set data structure that assigns a <Def n="priority" rs="priorities" /> — selected uniformly at random — to each item, and then stores the items in the unique tree that is a search tree with respect to items and a heap with respect to their <Rs n="priority" />.
              </P>
              <P>
                Note that this tree is only unique if there are no duplicate <Rs n="priority" />, hence, the set of priorities to draw from must be fairly large.
              </P>
            </>
          }
        >
          treaps
        </Def><Bib item="seidel1996randomized" />, <Def
          n="skip_list"
          r="skip-list"
          rs="skip-lists"
          preview={
            <P>
              A <Def n="skip_list" fake>skip-list</Def><Bib item="pugh1990skip" /> is a randomized data structure that stores a set of items as a sequence of sorted lists. The first list contains all items, the second list aproximately half of them, the third list again half of those, and so on.
            </P>
          }
        >
          skip-lists
        </Def><Bib item="pugh1990skip" />, and, more recently, <Def
          n="zip_informal"
          r="zip-tree"
          rs="zip-trees"
          preview={
            <P>
              A <Def n="zip_informal" fake>zip-tree</Def><Bib item="tarjan2021zip" /> is a randomized set data structure that assigns a <Def n="rank_informal" r="rank" rs="ranks" /> — selected randomly from a geometric distribution — to each item, and then stores the items in a tree that is a search tree with respect to items and a heap with respect to their <Rs n="rank_informal" />.
              The tree is further constrained in that each left child must have lower <R n="rank_informal" /> than its parent — this makes the tree uniquely defined.
            </P>
          }
        >
          zip-trees
        </Def><Bib item="tarjan2021zip" />.
        All three are different takes on approximating the distribution of items in perfectly balanced binary search trees.
      </P>

      <P>
        While <Em>binary</Em> trees are highly efficient in theory, they are less efficient on actual hardware than trees that store more than one item per vertex.
        Unfortunately, generalizing binary randomized data structures to higher-arity counterparts has proven more difficult than in the case of deterministically self-balancing trees.
        Providing a simple such generalization is the impetus for our work.
        {" "}<Rcb n="fig_search_performance"/> plots lookup performance of a <R n="zip_informal"/> versus a 32-ary tree of ours; our tree is roughly twice as fast (note the logarithmic y-axis). On secondary storage, we can expect the performance difference to be even more pronounced.
      </P>
      <Fig
          n="fig_search_performance"
          wrapperTagProps={{clazz: "wide"}}
          title="Lookup Performance"
          caption={
            <>
              <P>
                Benchmarking search times for 100 randomly chosen items in randomly generated <Rs n="zip_informal"/> (red, top line) and 32-zip-trees (green, lower line). The latter is a novel variant of <Rs n="zip_informal"/> that arises naturally from our generalization of <Rs n="zip_informal"/> to <Rs n="gtree_informal"/>.
              </P>
            </>
          }
        >
          <Img
            src={<ResolveAsset asset={["graphics", "performance.svg"]} />}
            alt="A plot showing search performance of a zip-tree versus a 32-zip-tree; the latter is roughly twice as fast."
          />
        </Fig>

      <PreviewScope>
        <P>
          We present the <Def n="gtree_informal" r="G-tree" rs="G-trees">geometric search trees</Def> (<Def n="gtree_informal" fake>G-trees</Def>), a family of randomized search trees that provides a unified perspective on several independently researched data structures, including <Rs n="zip_informal" />, <Def
            n="zipzip"
            r="zip-zip-tree"
            rs="zip-zip-trees"
            preview={
              <>
                <P>
                  The <Def n="zipzip" fake>zip-zip-trees</Def><Bib item="gila2023zip" /> are a modification of the <Rs n="zip_informal" /> that distributes items with colliding <Rs n="rank_informal" /> more efficiently than the <Rs n="zip_informal" />.
                </P>
              </>
            }
          >
            zip-zip-trees
          </Def><Bib item="gila2023zip" />, <Def
            n="skip_tree"
            r="skip-tree"
            rs="skip-trees"
            preview={
              <>
                <P>
                  The <Def n="skip_tree" fake>skip-trees</Def><Bib item="messeguer1997skip" /> are the <Rs n="mst" />, specialized to a radix of two.
                </P>
              </>
            }
          >
            skip-trees
          </Def><Bib item="messeguer1997skip" />, <Def
            n="dense_skip_tree"
            r="dense skip-tree"
            rs="dense skip-trees"
            preview={
              <>
                <P>
                  The <Def n="dense_skip_tree" fake>dense skip-trees</Def><Bib item="spiegel2009dense" /> are randomized search trees that randomly select the height of each item.
                  Heights without any items are omitted from the tree.
                  The number of items per vertex is random and can grow arbitrarily large.
                </P>
              </>
            }
          >
            dense skip-trees
          </Def><Bib item="spiegel2009dense" />, and <Def
            n="mst"
            r="MST"
            rs="MSTs"
            preview={
              <>
                <P>
                  The <Def n="mst" fake>merkle-search-trees</Def><Bib item="auvolat2019merkle" /> are randomized search trees that randomly select the height of each item.
                  Heights without any items result in empty vertices in the tree.
                  The number of items per vertex is random and can grow arbitrarily large.
                </P>
              </>
            }
          >
            merkle-search-trees
          </Def><Bib item="auvolat2019merkle" />.
          Our framework allows us to trivially define efficient trees that store a bounded number of items per vertex.
          These trees are arguably the first such randomized search trees whose conceptual complexity is just as low as that of their binary counterparts.
        </P>
      </PreviewScope>

      <P>
        Our key insight is to take a byproduct of the usual definition of <Rs n="zip_informal" />, turn it into a defining property of its own, and to then generalize it.
        <Rsb n="zip_informal" />{" "} assign geometrically chosen <Rs n="rank_informal" /> to their items, and use these <Rs n="rank_informal" /> for probabilistic balancing.
        A consequence of their balancing mechanism is that certain sequences of items with colliding <Rs n="rank_informal" /> form sorted linked lists.
        It turns out we can view and even <Em>define</Em> <Rs n="zip_informal" /> as collections of such linked lists.
      </P>

      <P>
        From this definition, which is based on arranging <Em>sorted linked lists</Em> in a certain fashion, it is only a small step to arranging <Em>arbitrary set data structures</Em> in the same fashion.
        This yields our <Rs n="gtree_informal" />, a family of trees that is parameterized over a secondary search data structure.
        Using simple linked lists as the underlying data structure yields the <Rs n="zip_informal" />.
        Recursively instantiating the <Rs n="gtree_informal" /> with other <Rs n="gtree_informal" /> yields a natural (and efficient) generalization of the <Rs n="zipzip" />.
        And finally, using linked lists of <M>k</M> items per vertex yields a generalization of the <Rs n="zip_informal" /> where each node can store up to <M>k</M> items.
      </P>

      <P>
        The <Rs n="gtree_informal" /> not only define a unique tree shape for any set of items with associated ranks, they also offer a unified means of implementation.
        We provide generalizations of the zipping and unzipping algorithms of the original <Rs n="zip_informal" />, and use them to implement insertion and deletion.
        These general algorithms can be applied to all <Rs n="gtree_informal" /> whose underlying set data structure supports splitting at arbitrary keys and joining two non-overlapping sets.
        The algorithms perform a number of splits or joins proportional to the number of distinct ranks in the tree, which is logarithmic in the total number of items with high probability.
      </P>

      <P>
        We give an overview of related work in <Rc n="related_work"/>, before introducing preliminary definitions and notation in <Rc n="preliminaries"/>. We present the <R n="gtree_informal">geometric trees</R> in <Rc n="sec_gtrees"/>, including a thorough <R n="analysis">analysis</R> and a an overview of <R n="old_gtrees">old</R> and <R n="new_gtrees">novel</R> <Rs n="gtree_informal"/>. <Rcb n="implementation"/> describes efficient algorithms for mutating <Rs n="gtree_informal"/>.
      </P>
    </Hsection>

    <Hsection title="Related Work" n="related_work">
      <P>
        <Marginale>
          The practically-minded reader can safely skip ahead to <Rc n="preliminaries"/>, whereas the more academically inclined may wish to stick around for <Rc n="related_work"/>, where we outline the current state of the art and contextualize our contributions.
        </Marginale>
        Data structures whose exact shape is determined solely by their contents and not by the order of insertion and deletion operations have been studied for decades.
        This property has been given several names, such as <Bib item="snyder1977uniquely">unique representation</Bib>, <Bib item="auvolat2019merkle">structural unicity</Bib>, <Bib item="driscoll1994fully">confluent persistence</Bib>, and <Bib item="naor2001anti">anti-persistence or history-independence</Bib>.
        Deterministically self-balancing <R n="history_independent" /> set data structures necessarily take super-logarithmic time to update under arbitrary insertions and deletions<Bib item="snyder1977uniquely" />.
        Hence, several <Em>probabilistic</Em> <R n="history_independent" /> data structures have been devised which support membership queries and update operations in logarithmic time with high probability.
      </P>

      <P>
        Well-known such (pseuso-) randomized set data structures include <Def
          n="hash_trie"
          r="hash trie"
          preview={
            <P>
              A randomized set data structure that places its items in a <A href="https://en.wikipedia.org/wiki/Trie">trie (prefix tree)</A>, using a hash of each item as its key.
              Described, for example, by Pugh and Teitelbaum<Bib item="pugh1989incremental" />.
            </P>
          }
        >
          hash tries
        </Def> (as presented, for example, by Pugh and Teitelbaum<Bib item="pugh1989incremental" />), <Rs n="treap" /><Bib item="seidel1996randomized" />, and <Rs n="skip_list" /><Bib item="pugh1990skip" />.
        More recently, <Rs n="zip_informal" /> <Bib item="tarjan2021zip" /> and <Rs n="zipzip" /> <Bib item="gila2023zip" /> have been proposed as more efficient variants of <Rs n="skip_list" />.
      </P>

      <P>
        All these data structures approximate the vertex distribution of <Em>binary</Em> balanced search trees.
        While binary search trees are theoretically efficient, CPU caches or block-sized reads from secondary storage make it so that trees that store more than a single item per vertex outperform binary trees in practice.
        Theoretical models to capture this behavior in the analysis of algorithms and data structures include <Bib item="aggarwal1988input">external memory models</Bib> and <Bib item="frigo1999cache">cache-oblivious models</Bib>.
      </P>

      <PreviewScope>
        <P>
          Several attempts have been made to find randomized data structures that perform well in an external memory model.
          Golovin<Bib item="golovin2009b" /> has proposed <Def n="b_treap" r="B-treap" rs="B-treaps">bushy treaps</Def> (<Def n="b_treap" fake>B-treaps</Def>) to approximate the behavior of B-trees via treaps.
          Unfortunately, <Rs n="b_treap" /> are complicated enough that even their author recommends using simpler alternatives such as the <Def n="b_skip_list" r="B-skip-list" rs="B-skip-lists">B-skip-list</Def><Bib item="golovin2010b" />.
          The <R n="b_skip_list" /> still involves a tuning parameter beyond the probability distribution for assigning node levels, a nontrivial invariant, and virtual memory management via hash tables rather than simple usage of pointers.
          In short, the conceptual complexity goes far beyond that of binary <Rs n="skip_list" /> or <Rs n="treap" />.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          Safavi and Seybold<Bib item="safavi2023b" /> propose <Def n="rbst" r="RBST" rs="RBSTs">randomized-block-search-trees</Def> (<Def n="rbst" fake>RBSTs</Def>) as another generalization of binary <Rs n="treap" /> that performs well in an external-memory model.
          The construction involves multiple tuning parameters, two distinct layers of data structure internals, and a highly nontrivial complexity analysis.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          Bender et al<Bib item="bender2016anti" /> first specify a history-independent <Def n="pma" r="PMA" rs="PMAs">packed-memory array</Def> (<Def n="pma" fake>PMA</Def>), and then build a <R n="history_independent" /> B-tree analogon and an external-memory skip-list on top of the <R n="pma" />.
          So there is again a two-layered aproach; the <R n="pma" /> introduces a significant chunk of conceptual complexity that is not part of regular <Rs n="treap" /> or <Rs n="skip_list" />.
        </P>
      </PreviewScope>

      <P>
        Some proponents of randomized data structures claim that a significant advantage over self-balancing data structures is their greater simplicity<Bib item={["pugh1990skip", "seidel1996randomized"]} />.
        It seems safe to say that none of the external-memory constructions we have just listed retain this advantage.
      </P>

      <P>
        All prior work that <Em>does</Em> achieve sufficient simplicity buys it at the price of vertices that must store a dynamic, unbounded number of items.
        The <Rs n="skip_tree" /><Bib item="messeguer1997skip" /> are the first such data structure, effectively converting a <R n="skip_list"/> into a tree: each vertex stores sequences of items that are being skipped-over together in the corresponding <R n="skip_list"/>.
        The relatively unknown <Rs n="dense_skip_tree"/><Bib item="spiegel2009dense" /> provide two optimizations: expected node size can be increased by flipping coins of success probabilities <M post=","><MFrac num="1" de="k"/></M> and empty vertices are eliminated from the tree.
        The <Rs n="mst">merkle-search-trees</Rs> (<Rs n="mst" />)<Bib item="auvolat2019merkle" /> independently reinvent <Rs n="skip_tree" /> with flexible probabilities similar to <Rs n="dense_skip_tree"/>, but without the compression of empty vertices.
      </P>

      <P>
        None of these data structures can provide a non-probabilistic upper bound on the number of items per vertex.
        This hampers efficient implementation; and adversarial data suppliers can trivially produce <M>n</M> items in <BigO>n</BigO> expected time that must all be stored in the same vertex.
      </P>
    </Hsection>

    <Hsection title="Preliminaries" n="preliminaries">
      <P>
        Here, we define fundamental terminology, and provide proper definitions and background for <Rs n="zip_informal" />.
      </P>

      <Hsection title="Data Structures" n="prelims_data_structures">
        <PreviewScope>
          <P>
            A <Def n="tree" rs="trees" /> data structure for items from some universe <M><Def n="tree_u" r="U" /></M> is either the <Def n="tree_empty" r="empty tree" rs="empty trees" />, or a <Def n="vertex" rs="vertices" /> consisting of a sequence of <M>k - 1</M> <Def n="item" rs="items">items</Def> from <R n="tree_u" /> and a sequence of <M>k</M> <Rs n="tree" /> called its <Def n="child" rs="children">children</Def>.
          </P>

          <P>
            We write <TreeItems><R n="tree_t" /></TreeItems> for the <Rs n="item" /> of <NoWrap><R n="tree_t" />,</NoWrap> and <TreeItem tree={<R n="tree_t" />}><M>i</M></TreeItem> for the <M>i</M>-th <R n="item" /> of <NoWrap><R n="tree_t" />.</NoWrap>
            {" "}We write <TreeChildren><R n="tree_t" /></TreeChildren> for the <Rs n="child" /> of <NoWrap><R n="tree_t" />,</NoWrap> and <TreeChild tree={<R n="tree_t" />}><M>i</M></TreeChild> for the <M>i</M>-th <R n="child" /> of <NoWrap><R n="tree_t" />.</NoWrap>
            {" "}Indexing always starts at zero.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            Let <M><Def n="tree_t" r="t" /></M> be a <R n="tree" />.
            The set of <R n="tree_t" />, its <Rs n="child" />, <Em>their</Em> <Rs n="child" />, and so on, is called the set of <Def n="subtree" rs="subtrees">subtrees</Def> of <R n="tree_t" />.
            We say <R n="tree_t" /> is of <Def n="tree_arity" r="arity" rs="arities" /> <M>k</M> if all <Rs n="subtree" /> of <R n="tree_t" /> have at most <M>k</M> <Rs n="child" />.
            We say <R n="tree_t" /> is of <Def n="degree" r="degree" rs="degrees" /> <M>d</M> if it has <M>k</M> <Rs n="child" />.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            If <R n="tree_t" /> is a binary tree, we refer to its first child as its <Def n="left"/> child, and to its second child as its <Def n="right"/> child.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            Let <M><Def n="item_lte" r="\preceq" /></M> be a <A href="https://en.wikipedia.org/wiki/Total_order">total order</A> on <R n="tree_u" />, and let <M><Def n="tree_d" r="d" /></M> be the <R n="degree" /> of <R n="tree_t" />.
            Then <R n="tree_t" /> is a <Def n="search_tree" r="search tree" rs="search trees" /> <Marginale>
              In a <R n="search_tree" />, intuitively speaking, the <Rs n="item" /> are sorted from left to right. That is, an <A href="https://en.wikipedia.org/wiki/Tree_traversal#In-order,_LNR">in-order traversal</A> yields a sorted sequence.
            </Marginale> (with respect to <R n="tree_u" />) if it is the <R n="tree_empty" />, or if<Ul>
              <Li>
                <TreeItems><R n="tree_t" /></TreeItems> is sorted with respect to <R n="tree_u" />,
              </Li>
              <Li>
                all <Rs n="item" /> in <TreeChild tree={<R n="tree_t" />}><M>0</M></TreeChild> are less than <TreeItem tree={<R n="tree_t" />}><M>0</M></TreeItem>,
              </Li>
              <Li>
                for all <M post=",">0 \lt <Def n="searchtree_i" r="i" /> \lt <R n="tree_d" /> - 1</M> all <Rs n="item" /> in <TreeChild tree={<R n="tree_t" />}><M><R n="searchtree_i" /></M></TreeChild> are less than <TreeItem tree={<R n="tree_t" />}><M><R n="searchtree_i" /> + 1</M></TreeItem> and greater than <NoWrap><TreeItem tree={<R n="tree_t" />}><M><R n="searchtree_i" /> - 1</M></TreeItem>,</NoWrap> and
              </Li>
              <Li>
                all <Rs n="item" /> in <TreeChild tree={<R n="tree_t" />}><M><R n="tree_d" /> - 1</M></TreeChild> are greater than <TreeItem tree={<R n="tree_t" />}><M><R n="tree_d" /> - 2</M></TreeItem>.
              </Li>
            </Ul>
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            We call <R n="tree_t" /> a <Def n="heap" rs="heaps" /><Marginale>
              In a <R n="heap" />, intuitively speaking, no <R n="item" /> is a descendant of a lesser item.
            </Marginale> if it is the <R n="tree_empty" />, or if<Ul>
              <Li>
                the greatest <R n="item" /> in all strict <Rs n="subtree" /> of <R n="tree_t" /> is less than or equal to the least <R n="item" /> amongst <TreeItems><R n="tree_t" /></TreeItems>, and
              </Li>
              <Li>
                all <Rs n="child" /> of <R n="tree_t" /> are themselves <Rs n="heap" />.
              </Li>
            </Ul>
          </P>
        </PreviewScope>
      </Hsection>

      <Hsection
        title="Pseudorandom Geometric Distributions"
        n="prelim_geometric_distribution"
      >
        <PreviewScope>
          <P>
            Let <M><Def n="geo_p" r="p" /></M> be a probability.<Marginale>
              In plain language: take a coin that shows heads with probability <R n="geo_p"/>.
              Flip until it shows heads.
              Count the total number of flips.
            </Marginale>
            {" "}A <Def
              n="geometric_distribution"
              r="geometric distribution"
              rs="geometric distributions"
              math="\mathcal{G}"
            /> <GeoDistribution><R n="geo_p" /></GeoDistribution> is a discrete probability distribution where the random variable <M><Def n="geo_x" r="X" /></M> takes on value <M><Def n="geo_k" r="k" /> \in <Np /></M> with probability <M>P(<R n="geo_x" /> = <R n="geo_k" />) = <R n="geo_p" /> \cdot (1 - <R n="geo_p" />)^{`{`}<R n="geo_k" /> - 1{`}`}</M>.
            We can interpret <R n="geo_k" /> as the outcome of a series of Bernoulli trials with success probability <NoWrap><R n="geo_p" />,</NoWrap> where the rank <R n="geo_k" /> represents the total number of trials until (and including) a first success.
            As is customary, we often write <M><Def n="geo_q" r="q"/> := 1 - <R n="geo_p" /></M> for the failure probability of the Bernoulli trial.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            The expected value of <R n="geo_x"/> is <M><Def n="geo_expected" r="E"/>[<R n="geo_x"/>] = <MFrac num="1" de={<R n="geo_p" />}/> = <MFrac num="1" de={<>1 - <R n="geo_q"/></>}></MFrac></M><Sidenote note={<>Most people would actually look this up <A href="https://en.wikipedia.org/wiki/Geometric_distribution#Moments_and_cumulants">on Wikipedia</A> rather than in a textbook.</>}><Bib item="forbes2011statistical"/></Sidenote>.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            We often wish to pseudorandomly map items from some universe <M><Def n="geo_u" r="U" /></M> to geometrically distributed <Def n="rank" rs="ranks">ranks</Def>.
            To this end, we require a rank function <MFunDef
              n="fn_rank"
              dom={<R n="geo_u" />}
              co="\N"
              sub={<R n="geo_p" />}
            >rank</MFunDef>, such that <Rank p={<R n="geo_p" />}><R n="geo_arg_u" /></Rank> for any <M><Def n="geo_arg_u" r="u" /> \in <R n="geo_u" /></M> is drawn independently from a random geometric distribution <GeoDistribution><R n="geo_p" /></GeoDistribution>.
            We simply write <Rank><R n="geo_arg_u" /></Rank> when <R n="geo_p" /> is unimportant or clear from context.
          </P>
        </PreviewScope>

        <P>
          In practice, <Rank p="(1/2)"><R n="geo_arg_u" /></Rank> can be implemented by hashing <R n="geo_arg_u" /> with a secure hash function and counting the number of trailing zeros in the binary representation of the digest.
          This can also be interpreted as the largest power of two that divides the digest of <R n="geo_arg_u" />, as used by Pugh and Teitelbaum<Bib item="pugh1989incremental" />.
          Auvolat and Taïani<Bib item="auvolat2019merkle" /> generalize this construction to distributions <GeoDistribution>\frac<Curly>1</Curly><Curly>2^k</Curly></GeoDistribution> by counting trailing or leading zeroes in the base-<M>k</M> representation of uniformly distributed pseudorandom integers. This is equivalent to counting all-zero groupings of <M>k</M> successive digits in a binary representation.
        </P>
      </Hsection>

      <Hsection title="Zip-Trees" n="prelims_zip_trees">
        <PreviewScope>
          <P>
            We can now give a formal definition of <Rs n="zip_tree"/><Bib item="tarjan2021zip"/>.
            Let <Rank p={<>\frac<Curly>1</Curly><Curly>2</Curly></>}/> be a rank function.
            The <Def n="zip_tree" r="zip tree" rs="zip trees"/> of some set <M><Def n="zip_s" r="S"/></M> is the unique <R n="search_tree"/> whose set of <Rs n="item"/> is <R n="zip_s"/>, and which is a <R n="heap"/> when ordering by <R n="rank"/> first, <R n="item"/> second.
            Equivalently, it must be a <R n="heap"/> with respect to <Rs n="rank"/> such that <R n="left"/> <Rs n="child"/> always have strictly lesser <R n="rank"/> than their parents.
            {" "}<Rcb n="fig_ziptree_basic"/> gives an example.
            <Marginale>
              The example tree is taken from a <A href="https://stackoverflow.com/questions/61944198/what-is-a-zip-tree-and-how-does-it-work">stackoverflow answer</A>, the interested reader can find there a detailed description of the isomorphism to <Rs n="skip_list"/> for that same example tree.
            </Marginale> 
          </P>
        </PreviewScope>

        <Fig
          n="fig_ziptree_basic"
          title="A Zip-Tree"
          caption={
            <>
              <P>
                <Rsb n="item"/> are the numbers in the vertices, <Rs n="rank"/> are the gray numbers above the vertices. 
                {" "}<Rsb n="item"/> are increasing from left to right (the tree is a <R n="search_tree"/> with respect to <Rs n="item"/>), <Rs n="rank"/> are decreasing from top to bottom (the tree is a <R n="heap"/> with respect to <Rs n="rank"/>), and no <R n="vertex"/> has a <R n="left"/> <R n="child"/> of equal <R n="rank"/> (yielding a unique tree shape).
              </P>
            </>
          }
        >
          <Img
            src={<ResolveAsset asset={["graphics", "ziptreeBasic.svg"]} />}
            alt="A rendering of a zip tree."
          />
        </Fig>
      </Hsection>
    </Hsection>

    <Hsection title="G-Trees" n="sec_gtrees">
      <P>
        We derive our <Rs n="gtree_informal"/> by generalizing <Rs n="zip_tree"/>. To do so, we start with a non-standard definition of <Rs n="zip_tree"/>:
      </P>

      <Definition n="zip_tree_recursive" title="Zip-Tree, Recursively">
          <P>
            Define the <Def n="partition" r="partition item" rs="partition items"/> of a set <M><Def n="partition_s" r="S"/>\subseteq <R n="tree_u"/></M> as the least element of <R n="partition_s"/> among those of maximal <R n="rank"/>.
            {" "}The <Def n="zip_tree_rec" r="zip-tree" rs="zip-trees"/> of any set <R n="partition_s"/> with <R n="partition"/> <M><Def n="partition_p" r="ρ"/></M> is the binary <R n="tree"/> whose <R n="item"/> is <R n="partition_p"/>, whose <R n="left"/> <R n="child"/> is the <R n="zip_tree_rec"/> of <M><MSet>s \in <R n="partition_s"/> : s \prec <R n="partition_p"/></MSet></M> (i.e., all items in <R n="partition_s"/> which precede <R n="partition_p"/>), and whose <R n="right"/> <R n="child"/> is the <R n="zip_tree_rec"/> of <M><MSet>s \in <R n="partition_s"/> : s \succ <R n="partition_p"/></MSet></M> (i.e., all items in <R n="partition_s"/> which succeed <R n="partition_p"/>).
          </P>
      </Definition>

      <PreviewScope>
        <P>
          This recursive definition reveals an interesting property of zip trees: <Def n="colliding"/> ranks. From this definition, it is easy to see that the <Rs n="item"/> of maximal <R n="rank"/> form a linked list of <R n="right"/> <Rs n="child"/> at the root of the <R n="zip_tree_rec"/>.
          The same holds recursively in all <Rs n="subtree"/> as well.
          We can characterize these linked lists of <Rs n="item"/> of equal <R n="rank"/> as a sequence <M><Def n="colliding_q" r="Q"/> = <Def n="colliding_q0" r="q_0"/> \prec <Def n="colliding_q1" r="q_1"/> \prec \ldots <Def n="colliding_qk" r="q_k"/></M> of <Rs n="item"/> <R n="colliding"/> in a superset <M><Def n="colliding_s" r="S"/> \supseteq <R n="colliding_q"/></M> if all <R n="item"/> in <R n="colliding_q"/> have equal <R n="rank"/>, and there is no <M><Def n="colliding_nope" r="s"/> \in <R n="colliding_s"/></M> of greater <R n="rank"/> such that <M post="."><R n="colliding_q0"/> \prec <R n="colliding_nope"/> \prec <R n="colliding_qk"/></M>
          {" "}<Rcb n="fig_ziptree_colliding"/> visualizes the linked lists formed by maximal sets of <R n="colliding"/> <Rs n="item"/> in a <R n="zip_tree"/>.
        </P>
      </PreviewScope>

      <Fig
          n="fig_ziptree_colliding"
          title="Colliding Sequences"
          caption={
            <P>
              The same <R n="zip_tree"/> as in <Rc n="fig_ziptree_basic"/>, highlighting linked lists of <R n="colliding"/> <Rs n="item"/> of <Rs n="rank"/> <Orange>three</Orange>, <Magenta>two</Magenta>, <Cyan>two</Cyan>, and <Pink>one</Pink>.
              All other <Rs n="vertex"/> form <R n="colliding"/> sequences of length one.
            </P>
          }
        >
        <Img
          src={<ResolveAsset asset={["graphics", "ziptreeColliding.svg"]} />}
          alt="A rendering of a zip tree, highlighting maximal colliding sequences in different colors."
        />
      </Fig>

      <P>
        We can even <Em>define</Em> <Rs n="zip_tree"/> in terms of maximal <R n="colliding"/> <R n="item"/> sequences, by using all <Rs n="item"/> of maximal <R n="rank"/> as <Rs n="partition"/> in a single construction step:
      </P>

      <Definition n="zip_tree_colliding" title="Zip-Tree, Via Colliding Sequences">
          <P>
            Let <M><Def n="zip_colliding_s" r="S"/> \subseteq <R n="tree_u"/></M> be a set, and let <M><Def n="zip_colliding_m" r="M"/> = (m_0, m_1, \ldots, m_<Curly>|<R n="zip_colliding_m"/>| - 1</Curly>)</M> be the <Rs n="item"/> of maximal <R n="rank"/> in <R n="zip_colliding_s"/>.
            The <Def n="zip_tree_col" r="zip-tree" rs="zip-trees"/> of <R n="zip_colliding_s"/> is a pair, containing:<Ul>
              <Li>
                <Marginale>
                  To emphasize: the linked list is not a list of <Rs n="item"/> only, but a list of <R n="item"/>-<R n="zip_colliding_left_subtree">subtree</R>-pairs.
                </Marginale>
                a linked list of the <Rs n="item"/> in <R n="zip_colliding_m"/> in ascending order, paired with their <Rs n="zip_colliding_left_subtree"/>, where the <Def n="zip_colliding_left_subtree" r="left subtree" rs="left subtrees"/> of <R n="item"/> <M>m_i</M> is the <R n="zip_tree_col"/> of <M><MSet>s \in <R n="zip_colliding_s"/> : m_<Curly>i - 1</Curly> \succ s \succ m_i</MSet></M>, and
              </Li>
              <Li>
                a single <Def n="zip_colliding_right_subtree" r="right subtree" rs="right subtrees"/>, which is the <R n="zip_tree_col"/> of <M><MSet>s \in <R n="zip_colliding_s"/> : m_<Curly>|<R n="zip_colliding_m"/>| - 1</Curly> \prec s</MSet></M>.
              </Li>
            </Ul> 
          </P>
      </Definition>

      <P>
        <Rcb n="fig_ziptree_lists"/> vizualizes this perspective on <Rs n="zip_tree"/>.
        Note how the linked-list pointers are exactly the pointers between <Rs n="item"/> of equal <R n="rank"/>, whereas both <R n="zip_colliding_left_subtree">left</R> and <R n="zip_colliding_right_subtree">right child</R> pointers always involve a strict decrease in <R n="rank"/>.
        In that sense, the <R n="zip_tree_col">list-based definition</R> fixes an asymmetry of the <R n="zip_tree">original definition</R>, which only requires strictly decreasing <Rs n="rank"/> for <R n="left"/> <Rs n="child"/>.
      </P>

      <Fig
          n="fig_ziptree_lists"
          wrapperTagProps={{clazz: "wide"}}
          title="Zip-Trees as Lists"
          caption={
            <P>
              A <R n="zip_tree_col"/>, interpreted as a collection of sorted linked lists.
              Linked list pointers are <Span style="color: #808080;">dashed</Span>, child pointers are solid.
              The colorless vertices are linked lists of length one.
              The three layers of the layout correspond to the three different <Rs n="rank"/>.
              Note that the graph is isomorphic to that of <Rc n="fig_ziptree_colliding"/>, we simply interpret its structure in a different way.
            </P>
          }
        >
        <Img
          src={<ResolveAsset asset={["graphics", "ziptreeOfLists.svg"]} />}
          alt="A rendering of a zip tree as a collection of maximal colliding lists."
        />
      </Fig>

      <P>
      From this non-standard characterization of <Rs n="zip_tree_col"/>, there is a natural generalization: rather than representing maximal sequences of <R n="colliding"/> <Rs n="item"/> (and the <Rs n="item"/>’ <Rs n="zip_colliding_left_subtree"/>) with sorted linked lists, we can represent them with arbitrary set data structures:
      </P>

      <Definition n="def_gtree" title="Geometric Search Tree">
          <P>
            Let <M><Def n="gtree_s" r="S"/> \subseteq <R n="tree_u"/></M> be a set, and let <M><Def n="gtree_m" r="M"/> = (m_0, m_1, \ldots, m_<Curly>|<R n="gtree_m"/>| - 1</Curly>)</M> be the <Rs n="item"/> of maximal <R n="rank"/> in <R n="gtree_s"/>, and let <M><Def n="gtree_g" r={<Mathfrak>S</Mathfrak>}/></M> be a data structure for representing sets.
            The <Def n="gtree" r="G-tree" rs="G-trees">geometric search tree</Def> (<Def n="gtree" fake>G-tree</Def>) of <R n="gtree_s"/> using <R n="gtree_g"/> is a pair, containing:<Ul>
              <Li>
                <Marginale>
                  To emphasize: <R n="gtree_g"/> does not store <Rs n="item"/> only, but <R n="item"/>-<R n="gtree_left_subtree">subtree</R>-pairs.
                </Marginale>
                an instance of <R n="gtree_g"/> storing the <Rs n="item"/> in <R n="gtree_m"/> in ascending order, paired with their <Rs n="gtree_left_subtree"/>, where the <Def n="gtree_left_subtree" r="left subtree" rs="left subtrees"/> of <R n="item"/> <M>m_i</M> is the <R n="gtree"/> of <M><MSet>s \in <R n="gtree_s"/> : m_<Curly>i - 1</Curly> \succ s \succ m_i</MSet></M>, and
              </Li>
              <Li>
                a single <Def n="gtree_right_subtree" r="right subtree" rs="right subtrees"/>, which is the <R n="gtree"/> of <M><MSet>s \in <R n="gtree_s"/> : m_<Curly>|<R n="gtree_m"/>| - 1</Curly> \prec s</MSet></M>.
              </Li>
            </Ul> 
          </P>
      </Definition>

      <P>
        This generalization turns out to be remarkably powerful.
        We can express several well-known data structures as <Rs n="gtree"/> (<Rc n="old_gtrees"/>), we find novel, cache-efficient data structures amongst the <Rs n="gtree"/> (<Rc n="new_gtrees"/>), and we can derive efficient implementation techniques for all of them (<Rc n="implementation"/>).
      </P>

      <PreviewScope>
        <P>
          We can regard any <R n="gtree"/> from two perspectives.
          First, as a high-level tree of maximal <R n="colliding"/> sequences.
          We refer to the nodes of this conceptual tree as <Def n="gnode" r="G-node" rs="G-nodes">G-nodes</Def>.
          The height of this tree is equal to the number of distinct ranks of the underlying set, which is in <BigO>\log(n)</BigO> with high probability (we give an analysis in <Rc n="analysis"/>).
          {" "}<Rcb n="fig_gnodes"/> visualizes our running example from this perspective.
        </P>

        <P>
          And second, given a specific set data structure <R n="gtree_g"/>, we can study the resulting in-memory graphs with pointers as edges.
          If <R n="gtree_g"/> is the type of sorted linked lists, for example, these concrete graphs are isomorphic to the <Rs n="zip_tree"/> (compare <Rc n="fig_ziptree_lists"/>, which we can interpret as depicting a <R n="gtree"/> using sorted linked lists).
        </P>
      </PreviewScope>

      <Fig
          n="fig_gnodes"
          wrapperTagProps={{clazz: "wide"}}
          title="High-Level View — G-Nodes"
          caption={
            <P>
              A <R n="gtree"/> from a high-level view: we disregard the internal structure of its <Rs n="gnode"/>, rendering them as single vertices. 
              We neither know nor care about the choice of <R n="gtree_g"/>.
              The set of <Rs n="item"/> is identical to that of <Rc n="fig_ziptree_lists"/>.
            </P>
          }
        >
        <Img
          src={<ResolveAsset asset={["graphics", "gtree.svg"]} />}
          alt="A rendering of a G-tree, collapsing each G-node into a single vertex."
        />
      </Fig>

      <P>
        When we select the <R n="rank"/> of each <R n="item"/> as a pseudorandom function of the <R n="item"/> itself, a tree of <Rs n="gnode"/> is uniquely determined by the set of its <Rs n="item"/>.
        Hence, if <R n="gtree_g"/> is <R n="history_independent"/>, so is the <R n="gtree"/>.
      </P>

      <P>
        When interpreted as trees of <Rs n="gnode"/>, the <Rs n="gtree"/> are exactly the <Rs n="dense_skip_tree"/> of Spiegel and Reynolds Jr<Bib item="spiegel2009dense"/>.
        Spiegel and Reynolds Jr never consider the internal structure of the <Rs n="gnode"/>, however, thus missing the instantiations that we discuss later.
      </P>

      <Hsection title="Analysis" n="analysis">
      <P>
        <Marginale>
          The math-averse reader can safely skip ahead to <Rc n="old_gtrees"/>, as long as they believe us when we say that <Rs n="gnode"/> form trees of logarithmic height with high probability, and that each <R n="gnode"/> contains <BigO>1</BigO> <Rs n="item"/> with high probability.
        </Marginale>
        We now give a formal analysis of the performance-related properties of <Rs n="gtree"/>. Roughly speaking, we show that <Rs n="gtree"/> with a <R n="geometric_distribution"/> of some probability <M>1 - <MFrac num="1" de="k"/></M> are similar to perfectly balanced <M post="-ary">k</M> trees with high probability: the height (in terms of <Rs n="gnode"/>) stays within a constant factor of <M><MLog base="k">n</MLog></M>, and the maximal number of <Rs n="item"/> per <R n="gnode"/> stays within a constant factor of <M>k</M>.
      </P>

      <PreviewScope>
        <P>
          Throughout our analyses, we let <M><Def n="ana_k" r="k"/></M> be a natural number greater than or equal to two; <R n="ana_k"/> is the intended average number of children per <R n="gnode"/> (leaving us with an intended average of <M><R n="ana_k"/> - 1</M> <Rs n="item"/> per <R n="gnode"/>).
          We let <M><Def n="ana_T" r="T"/></M> be a <R n="gtree"/> of <M><Def n="ana_n" r="n"/></M> <Rs n="item"/>. We then consider <Rs n="gtree"/> for the <R n="geometric_distribution"/> <M><GeoDistribution><R n="ana_p" /></GeoDistribution></M> with <M><Def n="ana_p" r="p"/> := 1 - <MFrac num="1" de={<R n="ana_k"/>}/></M>, and set <M post=","><Def n="ana_q" r="q"/> := 1 - <R n="ana_p"/> = <MFrac num="1" de={<R n="ana_k"/>}/></M> as this will yield the intended average <R n="gnode"/> size.
        </P>
      </PreviewScope>

      <Hsection n="gtree_height" title="G-Tree Height">
        <PreviewScope>
          <P>
            The <R n="rank"/> of any <R n="gnode"/> is a geometric random variable with parameter <M><R n="ana_p"/> = 1 - <MFrac num="1" de={<R n="ana_k"/>}/> = 1 - <R n="ana_q"/></M>. The height of <R n="ana_T"/> is upper-bounded by the <R n="rank"/> of its root node, since each child has a strictly lesser <R n="rank"/> than its parent.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            The root rank, <M><Def n="ana_Mn" r="M_T"/></M> is the maximum of the <Rs n="rank"/> of all <Rs n="item"/> in <R n="ana_T"/>, i.e., it is the maximum of <R n="ana_n"/> independent samples of the <R n="geometric_distribution"/> <M><GeoDistribution><R n="ana_p" /></GeoDistribution></M>. While it is known that the expected value of <M><R n="ana_Mn"/></M> is roughly <M><MLog base={<R n="ana_k"/>}><R n="ana_n"/></MLog> + <BigO>1</BigO></M>, there is no simple closed form expression <Bib item={["szpankowski1990yet", "eisenberg2008expectation"]} />.
          </P>
        </PreviewScope>
        <PreviewScope>
          <P>
            To explicitly bound <R n="ana_Mn"/>, fix any <M post="."><Def n="ana_r" r="r"/> \leq <MCeil><MLog base={<R n="ana_k"/>}> <R n="ana_n"/></MLog></MCeil></M>
            {" "}Then, the probability that the <R n="rank"/> of a <R n="gnode"/> <M><Def n="ana_g" r="g"/></M> is at least <R n="ana_r"/> is at most <M><R n="ana_q"/>^<Curly><R n="ana_r"/> − 1</Curly></M>, i.e., <M post="."><Pr><Rank><R n="ana_g" /></Rank> ≥ <R n="ana_r"/></Pr> ≤ <R n="ana_q"/>^<Curly><R n="ana_r"/> - 1</Curly></M>
            {" "}By the union bound, the probability that there exists <Em>some</Em> <R n="gnode"/> such that <M><Rank><R n="ana_g" /></Rank> ≥ <R n="ana_r"/></M> is <M post=","><Pr>∃ <R n="ana_g"/>,<Rank><R n="ana_g" /></Rank> ≥ <R n="ana_r"/></Pr> ≤ <R n="ana_n"/><R n="ana_q"/>^<Curly><R n="ana_r"/> − 1</Curly></M> and so for some positive constant <M>c</M>, <M><Pr><R n="ana_Mn"/> ≥ (c + 1) <MLog base={<R n="ana_k"/>}><R n="ana_n"/></MLog></Pr> ≤ <R n="ana_n"/>^<Curly>-c</Curly></M><Bib item="golovin2010b" />.
          </P>
        </PreviewScope>
        <PreviewScope>
          <P>
            Even for <M><R n="ana_r"/> \gt <MCeil><MLog base={<R n="ana_k"/>}> <R n="ana_n"/></MLog></MCeil></M>, the tail probability contribution is relatively small; we can estimate it by simplifying the geometric series:
            
            <MM>
              <Sum sub={<><R n="ana_r"/> = <MCeil><MLog base={<R n="ana_k"/>}> <R n="ana_n"/></MLog></MCeil> + 1</>} sup="∞"><R n="ana_n"/> <R n="ana_p"/>^<Curly><R n="ana_r"/>-1</Curly></Sum> = <R n="ana_n"/> <R n="ana_p"/>^<Curly><MCeil><MLog base={<R n="ana_k"/>}> <R n="ana_n"/></MLog></MCeil></Curly> ≤ <R n="ana_n"/> <R n="ana_p"/>^<Curly><MLog base={<R n="ana_k"/>}><R n="ana_n"/></MLog></Curly> = \frac<Curly>1</Curly><Curly>1 - <R n="ana_p"/></Curly> = \frac<Curly>1</Curly><Curly><R n="ana_q"/></Curly> = <R n="ana_k"/>.
            </MM>

            Hence, <M post={","}><E><R n="ana_Mn"/></E> ≈ <MCeil><MLog base={<R n="ana_k"/>}><R n="ana_n"/></MLog></MCeil></M> and <M><E><R n="ana_Mn"/></E></M> is at most <M><MCeil><MLog base={<R n="ana_k"/>}><R n="ana_n"/></MLog></MCeil> + <R n="ana_k"/></M>, with high probability.
          </P>
        </PreviewScope>
        <PreviewScope>
          <P>
            By construction, the <M><Def n="height_fn" r={<OpName>height</OpName>} />(<R n="ana_T" />)</M> of a geometric tree is less than or equal to its maximum rank <R n="ana_Mn"/>. Like zip trees, geometric trees <Em>compress</Em> their depth where <Rs n="rank" /> are missing or skipped; 
            <Marginale>
              While we don't bother with tight bounds on this compressed height, <Bib item="archibald2006number"></Bib> provides an expectation on the number of <Em>distinct</Em> <Rs n="rank" /> in a geometrically distributed random sample, which could provide slightly tighter bounds.
            </Marginale>
            {" "}as such, <M><E><OpName><R n="height_fn" /></OpName>(<R n="ana_T" />)</E> ≤ <E><R n="ana_Mn"/></E> ≤ <MCeil><MLog base={<R n="ana_k"/>}><R n="ana_n"/></MLog></MCeil> + <R n="ana_k"/></M>. Thus we have that the height of a geometric tree is in <BigO>\log <R n="ana_n"/></BigO> with high probability.
            {" "}<Rcb n="fig_stats_gheight"/> confirms our analysis with experimental data.
          </P>
        </PreviewScope>

        <Fig
          n="fig_stats_gheight"
          title="G-Tree Maximum Ranks"
          caption={
            <P>
              Average maximal ranks and heights (in <Rs n="gnode"/>) of 200 randomly generated <Rs n="gtree"/>, for various combinations of <R n="ana_n"/> and <R n="ana_k"/>.
              The numbers in parentheses give the <A href="https://en.wikipedia.org/wiki/Variance">variance</A>. 
            </P>
          }
        >
          <H6 clazz="dataHeading">Maximum Rank</H6>
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th><M>n = 100</M></Th>
                <Th><M>n = 1,000</M></Th>
                <Th><M>n = 10,000</M></Th>
                <Th><M>n = 100,000</M></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Th><M>k = 2</M></Th>
                <Td>8.0 (3.48)</Td>
                <Td>11.3 (4.00)</Td>
                <Td>14.7 (3.88)</Td>
                <Td>17.9 (3.27)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 4</M></Th>
                <Td>4.2 (0.90)</Td>
                <Td>5.9 (0.98)</Td>
                <Td>7.5 (0.86)</Td>
                <Td>9.2 (0.92)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 16</M></Th>
                <Td>2.4 (0.30)</Td>
                <Td>3.2 (0.21)</Td>
                <Td>4.1 (0.25)</Td>
                <Td>4.9 (0.29)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 64</M></Th>
                <Td>1.8 (0.19)</Td>
                <Td>2.2 (0.19)</Td>
                <Td>3.0 (0.12)</Td>
                <Td>3.35 (0.24)</Td>
              </Tr>
            </Tbody>
          </Table>
          <H6 clazz="dataHeading">Height</H6>
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th><M>n = 100</M></Th>
                <Th><M>n = 1,000</M></Th>
                <Th><M>n = 10,000</M></Th>
                <Th><M>n = 100,000</M></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Th><M>k = 2</M></Th>
                <Td>6.7 (0.75)</Td>
                <Td>9.9 (0.75)</Td>
                <Td>13.2 (0.72)</Td>
                <Td>16.7 (0.73)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 4</M></Th>
                <Td>4.0 (0.51)</Td>
                <Td>5.6 (0.51)</Td>
                <Td>7.3 (0.44)</Td>
                <Td>9.0 (0.47)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 16</M></Th>
                <Td>2.3 (0.24)</Td>
                <Td>3.2 (0.18)</Td>
                <Td>4.1 (0.25)</Td>
                <Td>4.9 (0.24)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 64</M></Th>
                <Td>1.8 (0.18)</Td>
                <Td>2.2 (0.17)</Td>
                <Td>3.0 (0.11)</Td>
                <Td>3.3 (0.23)</Td>
              </Tr>
            </Tbody>
          </Table>
        </Fig>
      </Hsection>

      <Hsection n="gtree_node_size" title="G-Node Size">
        <PreviewScope>
          <P>
            Given the geometric distribution of (independent) <Rs n="rank" /> over input values <M>s ∈ <R n="gtree_s"/></M>, the expected number of values with <R n="rank" /> <M><R n="ana_r"/></M> is about <M><R n="ana_k"/></M> times the expected number of values with <R n="rank" /> <M><R n="ana_r"/> + 1</M>, i.e., <M><Pr><Rank>s</Rank> {">"} <R n="ana_r"/> | <Rank>s</Rank> ≥ <R n="ana_r"/></Pr> = <R n="ana_q"/></M>. Recall that each <R n="gnode"/> in a geometric tree contains a set of <Rs n="item" /> with the same <R n="rank" />, and that the <R n="rank" /> of the <R n="gnode" /> is the maximum <R n="rank" /> of its <Rs n="item" />. Thus, we can think of <Rs n="gnode" /> within <R n="ana_T" /> as disjoint subsets formed by splitting the (sorted) items of <R n="rank" /> <M><R n="ana_r" /></M> at values of <R n="rank" /> <M><R n="ana_r" /> + 1</M>. In other words, the number of nodes with a given <R n="rank" /> <M><R n="ana_r" /></M> is a direct function of the number of <Rs n="gnode" /> with <R n="rank" /> <M><R n="ana_r" /> + 1</M>.
          </P>
        </PreviewScope>
        <PreviewScope>
          <P>
            The above node layout implies that the size <M>|<R n="ana_g" /> | </M> of a <R n="gnode" /> is itself a random variable drawn from a geometric distribution, this time with <Em>success</Em> probability <M><MFrac num={"1"} de={<R n="ana_k" />}/></M> and support <M>[n] = <MSet>1, \ldots, <R n="ana_n" /></MSet></M>. The expected value is roughly <R n="ana_k" />, and the observed size is at most <M>c</M> times the expected value with probability at least <M>1 − (1 − <MFrac num={"1"} de={<R n="ana_k" />} />)^<Curly>c <R n="ana_k" /></Curly></M>. In other words, <M><Pr>|<R n="ana_g" />| ≥ c <R n="ana_k" /></Pr> ≤ (1 − <MFrac num={"1"} de={<R n="ana_k" />} />)^<Curly>c <R n="ana_k" /></Curly></M>. 

            Setting <M>c = <MCeil><MLog base={<R n="ana_k" />}><R n="ana_n" /></MLog></MCeil></M>, and using <M>1 - <MFrac num={"1"} de={<R n="ana_k" />} /> ≤ <Exp>- <MFrac num={"1"} de={<R n="ana_k" />} /></Exp></M>, we have that 

            <MM>
            <MAligned>
              <Pr>|<R n="ana_g" />| ≥ <MCeil><MLog base={<R n="ana_k" />}><R n="ana_n" /></MLog></MCeil> <R n="ana_k" /></Pr>
              &≤ <MParen>1 − <MFrac num={"1"} de={<R n="ana_k" />} /></MParen>^<Curly><MCeil><MLog base={<R n="ana_k" />}><R n="ana_n" /></MLog></MCeil> <R n="ana_k" /></Curly>\\\
              &≤ <Exp>-<MFrac num={"1"} de={<R n="ana_k" />} /></Exp>^<Curly><MCeil><MLog base={<R n="ana_k" />}><R n="ana_n" /></MLog></MCeil> <R n="ana_k" /></Curly>\\\
              &= <Exp>-<MFrac num={"1"} de={<R n="ana_k" />} /> <MCeil><MLog base={<R n="ana_k" />}><R n="ana_n" /></MLog></MCeil> <R n="ana_k" /></Exp>
            </MAligned>
            </MM>

            which for large <M><R n="ana_n" /></M>, where <M><MCeil><MLog base={<R n="ana_k" />}><R n="ana_n" /></MLog></MCeil> ≈ <MLog base={<R n="ana_k" />}><R n="ana_n" /></MLog></M>, we get 

            <MM>
            <Exp>-<MFrac num={"1"} de={<R n="ana_k" />} /> <MLog base={<R n="ana_k" />}><R n="ana_n" /></MLog> <R n="ana_k" /></Exp>
            = <Exp>- <MLog base={<R n="ana_k" />}><R n="ana_n" /></MLog></Exp>
            = <R n="ana_n" />^<Curly>-1</Curly>
            </MM>

            This bound demonstrates that the probability that the size of any <R n="gnode" /> deviates from <M><R n="ana_k" /></M> decreases exponentially with <M><R n="ana_n" /></M>.
          </P>
        </PreviewScope>

        <P>
          <Rcb n="fig_stats_gnode_size"/> shows experimental measurements of average <R n="gnode"/> sizes.
          For low <R n="ana_n" />, nodes contain slightly too few items: items are spread-out, and there are not enough items to <Quotes>fill up</Quotes> all nodes.
          The variances are small; average <R n="gnode"/> sizes are indeed as stable as our analysis suggests.
        </P>

        <Fig
          n="fig_stats_gnode_size"
          title="G-Node Average Sizes"
          caption={
            <P>
              Average <R n="gnode"/> sizes of 200 randomly generated <Rs n="gtree"/>, for various combinations of <R n="ana_n"/> and <R n="ana_k"/>.
              The numbers in parentheses give the <A href="https://en.wikipedia.org/wiki/Variance">variance</A>. 
            </P>
          }
        >
          <H6 clazz="dataHeading">Average G-Node Size</H6>
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th><M>n = 100</M></Th>
                <Th><M>n = 1,000</M></Th>
                <Th><M>n = 10,000</M></Th>
                <Th><M>n = 100,000</M></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Th><M>k = 2</M></Th>
                <Td>1.9095 (0.0000334)</Td>
                <Td>1.9940 (0.0000162)</Td>
                <Td>1.9983 (0.0000006)</Td>
                <Td>1.9998 (0.0000000)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 4</M></Th>
                <Td>3.6374 (0.0000063)</Td>
                <Td>3.9516 (0.0000036)</Td>
                <Td>3.9942 (0.0000012)</Td>
                <Td>4.0002 (0.0000008)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 16</M></Th>
                <Td>12.1596 (0.0257947)</Td>
                <Td>15.2423 (0.0011409)</Td>
                <Td>15.9084 (0.0001009)</Td>
                <Td>15.9850 (0.0000016)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 64</M></Th>
                <Td>30.6534 (0.0817688)</Td>
                <Td>56.3768 (0.0023357)</Td>
                <Td>62.6815 (0.0219051)</Td>
                <Td>63.7859 (0.0235732)</Td>
              </Tr>
            </Tbody>
          </Table>
        </Fig>
      </Hsection>

      <Hsection n="gtree_size" title="G-Tree Size">
        <PreviewScope>
          <P>
            The total expected number of <Rs n="gnode" /> in a <R n="gtree" /> is intuitively <M><E>|<R n="ana_T"/>|</E> = <MFrac num={<R n="ana_n"/>} de={<R n="ana_k"/>} /> + 1</M>. Given that <M><R n="ana_q"/> = <MFrac num={"1"} de={<R n="ana_k" />} /></M> this can also be expressed as <M><R n="ana_n"/><R n="ana_q"/> + 1</M>. While this expectation is intuitive, it can be estimated more directly as the sum of the expected number of <Rs n="gnode" /> at every possible <R n="rank" /> (plus a root node).

            Since the number of <Rs n="gnode" /> at <R n="rank" /> <R n="ana_r" /> is equal to the number of <Em><Rs n="item" /></Em> having <R n="rank" /> <M><R n="ana_r" /> + 1</M>, and since the <R n="rank" /> assignments for <Rs n="item" /> are independent, the number of <Rs n="gnode" /> with <R n="rank" /> <M><R n="ana_r" /></M> in a <R n="gtree" /> can be modeled as a binomial random variable <Def n="ana_Xr" r={<M>X_r</M>}/>, with parameters <M><R n="ana_n" /></M> (the number of trials, i.e., the number of <Rs n="item" />) and <M>p = (1 - <R n="ana_q" />)<R n="ana_q" />^<Curly><R n="ana_r" /></Curly></M> (the probability of success, i.e., the probability that a <R n="item" /> has <R n="rank" /> <M><R n="ana_r" /> + 1</M>).

            <Marginale>
                To see why, consider that a binomial random variable describes the number of successes in a fixed number of independent trials, where each trial has the same probability of success. Here each <R n="item" /> is an independent trial, the <Quotes>success</Quotes> is the event that a <R n="item" /> has <R n="rank" /> <M><R n="ana_r" /></M>, and the probability of success is <M>(1 - <R n="ana_q" />)<R n="ana_q" />^<Curly><R n="ana_r" /></Curly></M>.
            </Marginale>

            {" "}Thus, the expected number of <Rs n="gnode" /> at <R n="rank" /> <M><R n="ana_r" /></M> is <M><E><R n="ana_Xr" /></E> = <R n="ana_n" />(1 - <R n="ana_q" />)<R n="ana_q" />^<Curly><R n="ana_r" /></Curly></M>, and by the linearity of expectation, the total expected number of <Rs n="gnode" /> in a <R n="gtree" /> is a geometric series with sum

            <MM>
            <E>|<R n="ana_T"/>|</E> = <Sum sub={<><R n="ana_r" />=1</>} sup={"∞"}> n(1 - <R n="ana_q" />)<R n="ana_q" />^<Curly><R n="ana_r" /></Curly></Sum> + 1= <R n="ana_n" />(1 - <R n="ana_q" />) <Sum sub={<><R n="ana_r" />=1</>} sup="∞"> <R n="ana_q" />^<Curly><R n="ana_r" /></Curly></Sum> + 1
            </MM>

            and recognizing that for <M>|q| {"<"} 1</M> the rightmost infinite sum simplifies to <M><MFrac num={<R n="ana_q" />} de={<>1 - <R n="ana_q" /></>}/></M>, we get

            <MM post=".">
            <E>|<R n="ana_T"/>|</E> = <R n="ana_n" /> (1 - <R n="ana_q" />) \frac<Curly><R n="ana_q" /></Curly><Curly>1 - <R n="ana_q" /></Curly> + 1= <R n="ana_n" /><R n="ana_q" /> + 1
            </MM>

            To provide bounds, we can use the usual multiplicative form of a Chernoff bound for the sum of independent (but not identically distributed) Bernoulli random variables<Sidenote note={<>Again, you'll probably want to look this up <A href="https://en.wikipedia.org/wiki/Chernoff_bound#Multiplicative_form_(relative_error)">on Wikipedia</A> rather than in a textbook.</>}><Bib item="dubhashiChernoff2009"/></Sidenote>. Then, for any <M>c {">"} 0</M>

            <MM>
              <Pr>|<R n="ana_T"/>| ≥ (1 + c)<R n="ana_n" /><R n="ana_q" /></Pr> ≤ <MParen><MFrac num={<Exp sup>c</Exp>} de={<>(1 + c)^<Curly>1 + c</Curly></>}/></MParen>^<Curly><R n="ana_n" /><R n="ana_q" /></Curly>
            </MM>

            or perhaps more conveniently, for <M>0 {"<"} c {"<"} 1</M> and recalling that <M><R n="ana_q"/> = <MFrac num={"1"} de={<R n="ana_k" />} /></M>,

            <MM post=".">
              <Pr>|<R n="ana_T"/>| {">"} (1 + c)<MFrac num={<R n="ana_n" />} de={<R n="ana_k" />}/></Pr> ≤ <Exp><MFrac num={<>-c^2<R n="ana_n" /></>} de={<>3 <R n="ana_k" /></>}/></Exp>
            </MM>
            
            This provides an exponentially small probability that the total number of <Rs n="gnode" /> in a geometric tree is much more than <M><MFrac num={<R n="ana_n" />} de={<R n="ana_k" />}/> + 1</M>, and thus the <R n="gtree" /> size is in <M><BigO><R n="ana_n" /></BigO></M>.
            {" "}<Rcb n="fig_stats_gnode_count"/> gives experimental measurements that confirm the analysis.
          </P>
        </PreviewScope>

        <Fig
          n="fig_stats_gnode_count"
          title="G-Node Counts"
          caption={
            <P>
              Average number of <Rs n="gnode"/> in 200 randomly generated <Rs n="gtree"/>, for various combinations of <R n="ana_n"/> and <R n="ana_k"/>.
              The numbers in parentheses give the <A href="https://en.wikipedia.org/wiki/Variance">variance</A>. 
            </P>
          }
        >
          <H6 clazz="dataHeading">Average Number of G-Nodes</H6>
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th><M>n = 100</M></Th>
                <Th><M>n = 1,000</M></Th>
                <Th><M>n = 10,000</M></Th>
                <Th><M>n = 100,000</M></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Th><M>k = 2</M></Th>
                <Td>52.21 (25.081)</Td>
                <Td>502.5 (257.2)</Td>
                <Td>5002 (2394.5)</Td>
                <Td>50001 (26339)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 4</M></Th>
                <Td>27.51 (19.086)</Td>
                <Td>252.9 (191.70)</Td>
                <Td>2504 (1826.1)</Td>
                <Td>25004 (18939)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 16</M></Th>
                <Td>8.33 (6.716)</Td>
                <Td>65.46 (57.22)</Td>
                <Td>628.2 (572.4)</Td>
                <Td>6255.3 (6113.3)</Td>
              </Tr>
              <Tr>
                <Th><M>k = 64</M></Th>
                <Td>3.29 (2.213)</Td>
                <Td>17.75 (15.25)</Td>
                <Td>159.16 (160.2)</Td>
                <Td>1564 (1486.8)</Td>
              </Tr>
            </Tbody>
          </Table>
        </Fig>

        This analysis provides some intuition for the practical efficiency and scalability of <Rs n="gtree"/>: the expected number of <Rs n="gnode"/> is linear in the number of <Rs n="item"/>, and is very close to a balanced tree structure.
        By understanding the total number of nodes and their size distribution, we can optimize and parameterize <Rs n="gtree"/> to minimize disk accesses, align nodes with disk block sizes, and design effective caching and buffer management strategies. This ensures that the tree operations are performed with high I/O efficiency, reducing latency and increasing throughput. Moreover, it helps in predicting performance, identifying bottlenecks, and managing storage costs by ensuring efficient space allocation and utilization. 
        Combined with the fixed size of the <Rs n="k_list" /> (see <Rc n="new_gtrees"/>) this makes <Rs n="gtree"/> potentially well-suited for external memory models while retaining much of their simplicity in practice.
      </Hsection>
    </Hsection>

      <Hsection title="Well-Known G-Trees" n="old_gtrees">
        <P>
          We now discuss how several well-known probabilistic data structures can be expressed as <Rs n="gtree"/>.
        </P>

        <Hsection title="Zip-Trees as G-Trees" n="gtree_zip_trees">
          <P>
            As we described in our derivation of the <Rs n="gtree"/>, instantiating <Rs n="gtree"/> with sorted linked lists yields the <Rs n="zip_tree"/>.
            Aside from mentioning <Rs n="zip_tree"/> here for the sake of completeness, we want to point out an interesting implementation detail: whereas <Rs n="zip_tree"/> store the <R n="rank"/> of every <R n="item"/> in its <R n="vertex"/>, a sorted linked list <R n="gtree"/> only needs to store one <R n="rank"/> per linked list that it contains, i.e., one <R n="rank"/> per <R n="gnode"/>.
          </P>
        </Hsection>

        <Hsection title="Zip-Zip-Trees and Beyond" n="gtree_zipzip_trees">
          <P>
            Instantiation of <Rs n="gtree"/> requires a set data structure.
            {" "}<Rsb n="gtree"/> <Em>are</Em> set data structures themselves.
            How about some recursion?
          </P>

          <P>
            Instantiating <Rs n="gtree"/> with <Rs n="zip_tree"/>, i.e., with <Rs n="gtree"/> instantiated with sorted linked lists, yields exactly the <Rs n="zipzip"/>.
            {" "}<Rsb n="zipzip"/><Bib item="gila2023zip"/> were initially introduced as a modification of the tie-breaking algorithm of <Rs n="zip_tree"/>.
            This modification is essentially an ad-hoc variation, whereas our description of <Rs n="zipzip"/> highlights them as a (highly relevant) member of a family of <Rs n="gtree"/> obtained from recursive self-instantiation.
            In particular, once <Rs n="gtree"/> and sorted linked lists have been implemented, the difference between implementing <Rs n="zip_tree"/> and <Rs n="zipzip"/> consists of a single type-level operation, whereas the algorithmic definition of <Rs n="zipzip"/> requires manual adjustment of all tree manipulation algorithms.
          </P>

          <PreviewScope>
            <P>
              More generally, we can instantiate <Rs n="gtree"/> with <Rs n="gtree"/> that are themselves recursively instantiated, to an arbitrary depth and choice of recursion anchor.
              Using sorted linked lists as recursion anchors yields a family of <Def n="zipk_tree" r={<><M>\text<Curly>zip</Curly>^k</M>-tree</>} rs={<><M>\text<Curly>zip</Curly>^k</M>-trees</>}><><M>\mathit<Curly>zip</Curly>^k</M>-trees</></Def> whose first two members are the <Rs n="zip_tree"/> and the <Rs n="zipzip"/>.
            </P>
          </PreviewScope>
        </Hsection>

        <Hsection title="Treaps as G-Trees" n="gtree_treaps">
          <P>
            We end this section with a fun observation: if we restrict each nested tree structure in the <Rs n="zipk_tree"/> to store ranks in a single bit (i.e., we cap the <R n="geometric_distribution"/> at two), we obtain exactly the <Rs n="treap"/> with k-bit <Rs n="priority"/>.
            We doubt that this has any practical applications, but it shows that the family of recursively instantiated <Rs n="gtree"/> is interesting beyond just the <Rs n="zipzip"/>.
          </P>
        </Hsection>
      </Hsection>

      <Hsection title="Novel G-Trees" n="new_gtrees">
        <P>
          Having shown that the <Rs n="gtree"/> encompass several useful and well-known data structures, we now give some members of the family that have <Em>not</Em> been independently described before.
          In particular, we tackle the problem of finding <R n="history_independent"/> data structures that are efficient on secondary storage (or in terms of cpu caches) by storing up to <M>k</M> items in a single vertex.
          Previous solutions<Bib item={["golovin2009b", "golovin2010b", "bender2016anti", "safavi2023b"]}/> all incur a significant overhead in terms of conceptual complexity compared to their binary counterparts.
          With <Rs n="gtree"/>, we merely need to change the underlying set datastructure <R n="gtree_g"/> to one that stores <Rs n="item"/> in blocks of <M>k</M>.
        </P>

        <P>
          A key intuition behind classic <Rs n="zip_tree"/> is that of choosing <Rs n="rank"/> from a <R n="geometric_distribution"/> with <M><R n="geo_p"/> = 1 - <MFrac num="1" de="2"/> = <MFrac num="1" de="2"/></M> because this is the distribution of the height of a randomly chosen vertex in a perfectly balanced binary <R n="tree"/>.
          For <M>k</M>-ary trees, the same intuition instructs us to draw <Rs n="rank"/> from a <R n="geometric_distribution"/> with <M post=","><R n="geo_p"/> = 1 - <MFrac num="1" de="k"/></M> as this is the distribution of heights in a perfectly balanced <M>k</M>-ary <R n="tree"/>. Our <R n="analysis">analysis</R> confirmes that — with high probability — the resulting trees are of logarithmic height and their <Rs n="gnode"/> store <BigO>k</BigO> <Rs n="item"/>.
        </P>

        <P>
          The second key insight toward an efficient <M>k</M>-ary data structure is, paradoxically, that there is no need to be clever about it.
          Sorted linked lists are naïve, inefficient data structures, yet <Rs n="zip_tree"/> are efficient. We can be similarly naïve for our <M>k</M>-ary construction.
        </P>

          <PreviewScope>
            <P>
              We use a sorted linked list in which every node stores up to <M>k</M> <Rs n="item"/>.
              We require all <Rs n="item"/> to be stored as early in the list as possible; this is the simplemost way of achieving <R n="history_independent">history-independence</R>.
              In other words, the only node to store fewer than <M>k</M> <Rs n="item"/> is the final node. We call such a list a <Def n="k_list" r={<><M>k</M>-list</>} rs={<><M>k</M>-lists</>}/> (see <Rc n="fig_klist"/>).
            </P>
          </PreviewScope>

          <Fig
              n="fig_klist"
              title="A 3-List"
              caption={
                <P>
                  The sorted <R n="k_list"><M>3</M>-list</R> containing <M>1, 4, 5, 8, 23, 26, 32, 35</M>.
                  Sometimes, things are just that simple.
                </P>
              }
            >
            <Img
              src={<ResolveAsset asset={["graphics", "klist.svg"]} />}
              alt="A rendering of a 3-list."
            />
          </Fig>

          <PreviewScope>
            <P>
              Instantiating <Rs n="gtree"/> with the <Rs n="k_list"/> and a <R n="geometric_distribution"/> of <M><R n="geo_p"/> = 1 - <MFrac num="1" de="1 + k"/></M> yields a family of data structures we call the <Def n="kzip_tree" r={<><M>k</M>-zip-tree</>} rs={<><M>k</M>-zip-trees</>}><M>k</M>-zip-trees</Def>.
              {" "}<Rcb n="fig_2ziptree"/> depicts the <R n="kzip_tree"><M>2</M>-zip-tree</R> for our running example set.
            </P>
          </PreviewScope>

          <Fig
              n="fig_2ziptree"
              title="2-Zip-Tree"
              wrapperTagProps={{clazz: "wide"}}
              caption={
                <P>
                  A <R n="kzip_tree"><M>2</M>-zip-tree</R>.
                  Linked list pointers are <Span style="color: #808080;">dashed</Span>, child pointers are solid.
                  The three layers of the layout correspond to the three different <Rs n="rank"/>.
                  Observe how contracting the linked lists effectively yields <Rc n="fig_gnodes"/>.
                </P>
              }
            >
            <Img
              src={<ResolveAsset asset={["graphics", "kziptree.svg"]} />}
              alt="A rendering of a 2-zip-tree."
            />
          </Fig>

          <P>
            The <Rs n="k_list"/> are inefficient data structures — inserting or deleting the first item requires <BigO>n</BigO> time in a <R n="k_list"/> of <M>n</M> items.
            The <Rs n="kzip_tree"/> are nevertheless efficient, because the expected size of the <Rs n="gnode"/>, and hence, the expected length of the <Rs n="k_list"/>, is constant for any <R n="geo_p"/>. More efficient alternatives to <Rs n="k_list"/> exist, such as <Bib item="shao1994unrolling">unrolled linked lists</Bib>. These are not <R n="history_independent"/>, however.
          </P>

          <P>
            What is the expected height of a <R n="kzip_tree"/>? Asymptotically, we know it to be in <BigO>\log n</BigO>, since we have <Rs n="gnode"/> of <BigO>\log n</BigO> different <Rs n="rank"/>, each a list of <BigO>k</BigO> <Rs n="item"/> (which has a length in <BigO>k</BigO>). <Rcb n="fig_kzip_height"/> gives experimental measures for some specific <M>n</M> and <M>k</M>.
            The <Dfn>height amplification</Dfn> we report is the height of each tree divided by the height of a perfectly-balanced <M>k+1</M>-ary tree on <M>n</M> vertices.
          </P>

          <Fig
            n="fig_kzip_height"
            title="K-Zip-Tree Height"
            caption={
              <>
                <P>
                  The heights of 200 randomly generated <Rs n="gtree"/>, i.e., the maximal number of pointers to traverse from the root to a leaf; for various combinations of <R n="ana_n"/> and <R n="ana_k"/>.
                  The numbers in parentheses give the <A href="https://en.wikipedia.org/wiki/Variance">variance</A>. 
                </P>
                <P>
                  The second table normalizes the heights by the heights of perfectly-balanced <M>k+1</M>-ary trees on <M>n</M> vertices.
                </P>
              </>
            }
          >
            <H6 clazz="dataHeading">Tree Height</H6>
            <Table>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th><M>n = 100</M></Th>
                  <Th><M>n = 1,000</M></Th>
                  <Th><M>n = 10,000</M></Th>
                  <Th><M>n = 100,000</M></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Th><M>k = 1</M></Th>
                  <Td>15.29 (5.61)</Td>
                  <Td>26.59 (8.89)</Td>
                  <Td>38.20 (9.47)</Td>
                  <Td>50.58 (11.86)</Td>
                </Tr>
                <Tr>
                  <Th><M>k = 3</M></Th>
                  <Td>8.61 (2.40)</Td>
                  <Td>14.92 (3.38)</Td>
                  <Td>21.97 (4.41)</Td>
                  <Td>29.13 (4.93)</Td>
                </Tr>
                <Tr>
                  <Th><M>k = 15</M></Th>
                  <Td>4.28 (0.98)</Td>
                  <Td>8.06 (2.04)</Td>
                  <Td>12.36 (2.43)</Td>
                  <Td>16.66 (2.45)</Td>
                </Tr>
                <Tr>
                  <Th><M>k = 63</M></Th>
                  <Td>2.37 (0.24)</Td>
                  <Td>5.05 (1.43)</Td>
                  <Td>8.43 (1.69)</Td>
                  <Td>12.08 (2.52)</Td>
                </Tr>
              </Tbody>
            </Table>

            <H6 clazz="dataHeading">Height Amplification</H6>
            <Table>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th><M>n = 100</M></Th>
                  <Th><M>n = 1,000</M></Th>
                  <Th><M>n = 10,000</M></Th>
                  <Th><M>n = 100,000</M></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Th><M>k = 1</M></Th>
                  <Td>2.18 (0.11)</Td>
                  <Td>2.66 (0.09)</Td>
                  <Td>2.73 (0.05)</Td>
                  <Td>2.98 (0.04)</Td>
                </Tr>
                <Tr>
                  <Th><M>k = 3</M></Th>
                  <Td>2.15 (0.15)</Td>
                  <Td>2.98 (0.14)</Td>
                  <Td>3.14 (0.09)</Td>
                  <Td>3.24 (0.06)</Td>
                </Tr>
                <Tr>
                  <Th><M>k = 15</M></Th>
                  <Td>2.14 (0.24)</Td>
                  <Td>2.69 (0.23)</Td>
                  <Td>3.09 (0.15)</Td>
                  <Td>3.33 (0.10)</Td>
                </Tr>
                <Tr>
                  <Th><M>k = 63</M></Th>
                  <Td>1.18 (0.06)</Td>
                  <Td>2.53 (0.36)</Td>
                  <Td>2.81 (0.19)</Td>
                  <Td>4.03 (0.28)</Td>
                </Tr>
              </Tbody>
            </Table>
          </Fig>

          <P>
            Another concern of interest is space amplification: in the worst case, every <R n="item"/> would be in its own <R n="k_list"/>, resulting in a space amplification factor of <M>k</M>. Intuitively, this occurs only rarely, however: the expected size of each <R n="gnode"/> is <M>k</M>, and the probability for a <R n="gnode"/> to have size <M>s \lt k</M> decreases exponentially in <M>k - s</M>. Any overfull <R n="gnode"/> consists of one or more full linked-list vertices, plus exactly one underfull linked-list vertex. Hence, the overfull <Rs n="gnode"/> contribute an amplification factor of at most two. Roughly half of the nodes will be overful, so we can expect a space amplification around <M>1.5</M>. <Rcb n="fig_space_amplification"/> backs up this intuition with experimental data.
          </P>

          <Fig
            n="fig_space_amplification"
            title="Space Amplification"
            caption={
              <P>
                Total number of <R n="item"/> slots divided by total number of <Rs n="item"/> in 200 randomly generated <Rs n="gtree"/>, for various combinations of <R n="ana_n"/> and <R n="ana_k"/>.
                The numbers in parentheses give the <A href="https://en.wikipedia.org/wiki/Variance">variance</A>. 
              </P>
            }
          >
            <H6 clazz="dataHeading">Space Amplification</H6>
            <Table>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th><M>n = 100</M></Th>
                  <Th><M>n = 1,000</M></Th>
                  <Th><M>n = 10,000</M></Th>
                  <Th><M>n = 100,000</M></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Th><M>k = 1</M></Th>
                  <Td>1 (0)</Td>
                  <Td>1 (0)</Td>
                  <Td>1 (0)</Td>
                  <Td>1 (0)</Td>
                </Tr>
                <Tr>
                  <Th><M>k = 3</M></Th>
                  <Td>1.338 (0.0055)</Td>
                  <Td>1.302 (0.0006)</Td>
                  <Td>1.298 (0.0000)</Td>
                  <Td>1.297 (0.0000)</Td>
                </Tr>
                <Tr>
                  <Th><M>k = 15</M></Th>
                  <Td>1.743 (0.0786)</Td>
                  <Td>1.544 (0.0061)</Td>
                  <Td>1.515 (0.0006)</Td>
                  <Td>1.512 (0.0000)</Td>
                </Tr>
                <Tr>
                  <Th><M>k = 63</M></Th>
                  <Td>2.431 (0.612)</Td>
                  <Td>1.669 (0.0316)</Td>
                  <Td>1.578 (0.0032)</Td>
                  <Td>1.565 (0.0003)</Td>
                </Tr>
              </Tbody>
            </Table>
          </Fig>

          <PreviewScope>
            <P>
              Recursive instantiation of <Rs n="gtree"/> with other <Rs n="gtree"/> leads to the family of <Rs n="zipk_tree"/> when using linked lists (i.e., <R n="k_list"><M>1</M>-lists</R>) as the recursion anchor. We can similarly use arbitrary <Rs n="k_list"/> as the recursion anchor to obtain the <Rs n="kzip_tree"/>, the <Def n="kzipzip_tree" r={<><M>k</M>-zip-zip-tree</>} rs={<><M>k</M>-zip-zip-trees</>}><M>k</M>-zip-zip-trees</Def>, and so on.
            </P>
          </PreviewScope>

          <P>
            Through some small adjustments, the definition of <Rs n="gtree"/> can be adapted to yield generalizations of <Rs n="skip_list"/> and <R n="history_independent"/> analogons of <Bib item="comer1979ubiquitous">B<Sup>+</Sup>-trees</Bib>. We sketch these extensions in <R n="variants">Appendix B</R>.
          </P>
      </Hsection>
    </Hsection>

    <Hsection title="Algorithms" n="implementation">
      <P>
        We now present asymptotically efficient algorithms for working with <Rs n="gtree"/>. To optimize for clarity of presentation, we describe purely functional algorithms: all functions return new values rather than mutating their inputs.
      </P>

      <P>
        We explicitly distinguish between non-empty and possibly-empty <Rs n="gtree"/> and internal set data structures, to clarify which cases can arise in our algorithms. To reinforce those distinctions, our pseudocode comes with pseudotypes. The typing also aids in keeping straight the multiple levels of parametric polymorphism (<Quotes>generics</Quotes>). Finally, pseudotypes allow us to explicitly define the functions that must be available on <R n="gtree_g"/> for our algorithms to work. {/*<Rcb n="fig_set_interface"/> provides all type-level definitions we need.*/}
      </P>

      {/* <Fig
          n="fig_set_interface"
        > */}
        <Pseudocode n="interface_set" lineNumbering>
          <Interface
            id={["NonemptySet", "c_neset"]}
            comment={<>
              Interface for non-empty sets of pairs of <Rs n="item"/> (of type <R n="c_neset_item"/>) and their <Rs n="gtree_left_subtree"/>. To be implemented by <R n="gtree_g"/>.
            </>}
            generics={[{
              id: ["I", "c_neset_item"],
            }]}
            members={[
              {
                comment: <>Create a set containing a single <R n="item"/> and its <R n="gtree_left_subtree"/>.</>,
                id: ["singleton", "c_neset_singleton"],
                args: [
                  ["item", "c_neset_singleton_item", <R n="c_neset_item" />],
                  ["subtree", "c_neset_singleton_subtree", <TypeApplication constr="c_gtree" args={[<Self/>]}/>],
                ],
                ret: <Self/>,
              },
              {
                comment: <>Split <R n="c_neset_split_self"/> into the set of <Rs n="item"/> and their <Rs n="gtree_left_subtree"/> strictly less than <R n="c_neset_split_key"/>, the <R n="gtree_left_subtree"/> of <R n="c_neset_split_key"/> if <R n="c_neset_split_key"/> is an <R n="item"/> in <R n="c_neset_split_self"/>, and the set of <Rs n="item"/> and their <Rs n="gtree_left_subtree"/> strictly greater than <R n="c_neset_split_key"/>.</>,
                id: ["split", "c_neset_split"],
                args: [
                  ["self", "c_neset_split_self", <Self/>],
                  ["key", "c_neset_split_key", <R n="c_neset_item" />],
                ],
                ret: <TupleType types={[
                  <TypeApplication constr="c_set" args={[<Self/>]}/>,
                  <TypeApplication constr="Option" args={[<TypeApplication constr="c_gtree" args={[<Self/>]} />]}/>,
                  <TypeApplication constr="c_set" args={[<Self/>]}/>,
                ]}/>,
                multiline: true,
              },
              {
                comment: <>Join two sets <R n="c_neset_join_left"/> and <R n="c_neset_join_right"/> into a single set, assuming that all <Rs n="item"/> in <R n="c_neset_join_left"/> are less than any <Rs n="item"/> in <R n="c_neset_join_right"/>.</>,
                id: ["join", "c_neset_join"],
                args: [
                  ["left", "c_neset_join_left", <Self/>],
                  ["right", "c_neset_join_right", <Self/>],
                ],
                ret: <Self/>,
              },
              {
                comment: <>Split <R n="c_neset_remove_min_self"/> into the least <R n="item"/> and its <R n="gtree_left_subtree"/>, and the remaining set.</>,
                id: ["remove_min", "c_neset_remove_min"],
                args: [
                  ["self", "c_neset_remove_min_self", <Self/>],
                ],
                ret: <TupleType types={[
                  <TupleType types={[
                    <R n="c_neset_item"/>,
                    <TypeApplication constr="c_gtree" args={[<Self/>]} />
                  ]}/>,
                  <TypeApplication constr="c_set" args={[<Self/>]}/>,
                ]}/>,
                multiline: true,
              },
              {
                comment: <>Insert an <R n="item"/> and its <R n="gtree_left_subtree"/> into <R n="c_neset_remove_min_self"/>. The new <R n="item"/> must be strictly less than any <R n="item"/> in <R n="c_neset_remove_min_self"/>.</>,
                id: ["insert_min", "c_neset_insert_min"],
                args: [
                  ["self", "c_neset_insert_min_self", <Self/>],
                  ["new_min", "c_neset_insert_min_new", <TupleType types={[
                    <R n="c_neset_item"/>,
                    <TypeApplication constr="c_gtree" args={[<Self/>]} />
                  ]}/>],
                ],
                ret: <Self/>,
                multiline: true,
              },
            ]}
          />
          <Loc/>
          <Enum
            id={["Set", "c_set"]}
            comment="A set, possibly empty. Parameterized over a type of non-empty sets."
            generics={[{
              id: [<><Mathfrak>S</Mathfrak></>, "c_set_s"],
            }]}
            variants={[
              {
                tuple: true,
                id: ["NonEmpty", "c_set_nonempty"],
                fields: [<R n="c_set_s" />],
              },
              {
                tuple: true,
                id: ["Empty", "c_set_empty"],
              },
            ]}
          />
          <Loc />
          <StructDef
            comment={<>A <R n="gnode"/>.</>}
            id={["GTreeNode", "c_gtree_node"]} 
            generics={[
              {
                id: ["I", "c_gtree_node_i"], 
              }, {
                id: [<><Mathfrak>S</Mathfrak></>, "c_gtree_node_s"],
                bounds: [<TypeApplication constr="c_neset" args={[<R n="c_gtree_node_i"/>]}/>],
              },
            ]}
            fields={[
              [["rank", "c_gtree_node_rank"], <M>\N</M>],
              {
                commented: {
                  segment: [["set", "c_gtree_node_set"], <R n="c_gtree_node_s" />],
                  comment: <>Nonzero number of <Rs n="item"/> and their <Rs n="gtree_left_subtree"/>.</>,
                  dedicatedLine: true,
                },
              },
              {
                commented: {
                  segment: [["right", "c_gtree_node_right"], <TypeApplication constr="c_gtree" args={[<R n="c_gtree_node_s"/>]} />],
                  comment: <>The one <R n="gtree_right_subtree"/>.</>,
                  dedicatedLine: true,
                },
              },
            ]}
          />
          <Loc/>
          <Enum
            id={["GTree", "c_gtree"]}
            comment={<>A <R n="gtree"/>, possibly empty.</>}
            generics={[
              {
                id: ["I", "c_gtree_i"], 
              }, {
                id: [<><Mathfrak>S</Mathfrak></>, "c_gtree_s"],
                bounds: [<TypeApplication constr="c_neset" args={[<R n="c_gtree_i"/>]}/>],
              },
            ]}
            variants={[
              {
                tuple: true,
                id: ["NonEmpty", "c_gtree_nonempty"],
                fields: [<TypeApplication constr="c_gtree_node" args={[<R n="c_gtree_s" />]} />],
              },
              {
                tuple: true,
                id: ["Empty", "c_gtree_empty"],
              },
            ]}
          />
          <Loc/>
          <Enum
            id={["Option", "Option"]}
            comment="An optional value."
            generics={[{
              id: ["V", "OptionV"],
            }]}
            variants={[
              {
                tuple: true,
                id: ["Some", "OptionSome"],
                fields: [<R n="OptionV" />],
              },
              {
                tuple: true,
                id: ["None", "OptionNone"],
              },
            ]}
          />
        </Pseudocode>
      {/* </Fig> */}

      <P>
        The functions we require of a <R n="c_neset"/> are standard functions that are easily implemented in <BigO>\log(n)</BigO> time with typical set data <Sidenote note={
          <>
            Not that we needed an efficient implementation: since <Rs n="gnode"/> have constant expected size, even <BigO>n</BigO> implementations do not hurt the asymptotic efficiency of our algorithms.
          </>
        }>structures</Sidenote>. The only choice worth commenting on is that of using a specialized <R n="c_neset_insert_min"/> function instead of a generic <Code>insert</Code> function. This choice is to allow for more efficient, specialized implementations, as well as to highlight that our algorithms interact with the internal set data structures in a surprisingly constrained manner.
      </P>

      <P>
        Before giving our main algorithms, we define some helper functions:
      </P>

      <Pseudocode n="code_helpers" lineNumbering>
        <FunctionItem
          comment={<>Insert an <R n="item"/> and its <R n="gtree_left_subtree"/> into a possibly empty set. The new <R n="item"/> must be strictly less than any <R n="item"/> in <R n="c_set_insert_min_set"/>.</>}
          id={["set_insert_min", "c_set_insert_min"]}
          generics={[{
            id: ["I", "c_set_insert_min_item"], 
          }, {
            id: [<><Mathfrak>S</Mathfrak></>, "c_set_insert_min_s"],
            bounds: [<TypeApplication constr="c_neset" args={[<R n="c_set_insert_min_item"/>]}/>],
          }]}
          args={[
            ["set", "c_set_insert_min_set", <TypeApplication constr="c_set" args={[<R n="c_set_insert_min_s"/>]} />],
            ["new_min", "c_set_insert_min_new", <TupleType types={[
              <R n="c_set_insert_min_item"/>,
              <TypeApplication constr="c_gtree" args={[<R n="c_set_insert_min_s"/>]} />
            ]}/>],
          ]}
          multilineArgs
          ret={<R n="c_set_insert_min_s"/>}
          body={[
            <Match
              exp={<R n="c_set_insert_min_set"/>}
              cases={[
                [
                  <QualifiedMember type={<R n="c_set"/>} member="c_set_empty" />,
                  <Return><Application multilineArgs fun="c_neset_singleton" args={[
                    <AccessTuple at={0}><R n="c_set_insert_min_new"/></AccessTuple>,
                    <AccessTuple at={1}><R n="c_set_insert_min_new"/></AccessTuple>,
                  ]}/></Return>,
                ],
                [
                  <Tuple name={<QualifiedMember type={<R n="c_set"/>} member="c_set_nonempty" />} fields={[<DefValue n="c_set_insert_min_set_s" r="s" />]} />,
                  [<Return><Application
                    fun="c_neset_insert_min"
                    args={[
                      <R n="c_set_insert_min_set_s"/>,
                      <R n="c_set_insert_min_new"/>,
                    ]}
                  /></Return>],
                ],
              ]}
            />
          ]}
        />
        <Loc/>
        <FunctionItem
          comment={<>Replace the leftmost <R n="gtree_left_subtree"/> of a <R n="c_gtree_node"/>.</>}
          id={["update_leftmost", "c_update_leftmost"]}
          generics={[{
            id: ["I", "c_update_leftmost_i"], 
          }, {
            id: [<><Mathfrak>S</Mathfrak></>, "c_update_leftmost_s"],
            bounds: [<TypeApplication constr="c_neset" args={[<R n="c_update_leftmost_i"/>]}/>],
          }]}
          args={[
            ["node", "c_update_leftmost_node", <TypeApplication constr="c_gtree_node" args={[<R n="c_update_leftmost_i"/>, <R n="c_update_leftmost_s"/>]} />],
            ["new_left", "c_update_leftmost_new", <TypeApplication constr="c_gtree" args={[<R n="c_update_leftmost_i"/>, <R n="c_update_leftmost_s"/>]} />],
          ]}
          multilineArgs
          ret={<TypeApplication constr="c_gtree_node" args={[<R n="c_update_leftmost_i"/>, <R n="c_update_leftmost_s"/>]}/>}
          body={[
            <LetRaw lhs={<Tuple multiline fields={[
              <Tuple fields={[
                <DefValue n="c_update_leftmost_leftmost_item" r="leftmost_item"/>,
                <BlankPattern/>,
              ]} />,
              <DefValue n="c_update_leftmost_others" r="other_pairs"/>,
            ]}/>}>
              <Application fun="c_neset_remove_min" args={[<AccessStruct field="c_gtree_node_set"><R n="c_update_leftmost_node"/></AccessStruct>]}/>
            </LetRaw>,
            <Return>
              <Struct name="c_gtree_node" multiline fields={[
                ["c_gtree_node_rank", <AccessStruct field="c_gtree_node_rank"><R n="c_update_leftmost_node"/></AccessStruct>],
                ["c_gtree_node_set", <Application fun="c_set_insert_min" multilineArgs args={[
                  <R n="c_update_leftmost_others"/>,
                  <Tuple fields={[
                    <R n="c_update_leftmost_leftmost_item"/>,
                    <R n="c_update_leftmost_new"/>,
                  ]}/>
                ]}/>],
                ["c_gtree_node_right", <AccessStruct field="c_gtree_node_right"><R n="c_update_leftmost_node"/></AccessStruct>],
              ]} />
            </Return>
          ]}
        />
        <Loc/>
        <FunctionItem
          comment={<>Replace the <R n="gtree_right_subtree"/> of a <R n="c_gtree_node"/>.</>}
          id={["update_right", "c_update_right"]}
          generics={[{
            id: ["I", "c_update_right_i"], 
          }, {
            id: [<><Mathfrak>S</Mathfrak></>, "c_update_right_s"],
            bounds: [<TypeApplication constr="c_neset" args={[<R n="c_update_right_i"/>]}/>],
          }]}
          args={[
            ["node", "c_update_right_node", <TypeApplication constr="c_gtree_node" args={[<R n="c_update_right_i"/>, <R n="c_update_right_s"/>]} />],
            ["new_right", "c_update_right_new", <TypeApplication constr="c_gtree" args={[<R n="c_update_right_i"/>, <R n="c_update_right_s"/>]} />],
          ]}
          multilineArgs
          ret={<TypeApplication constr="c_gtree_node" args={[<R n="c_update_right_i"/>, <R n="c_update_right_s"/>]}/>}
          body={[
            <Return>
              <Struct name="c_gtree_node" multiline fields={[
                ["c_gtree_node_rank", <AccessStruct field="c_gtree_node_rank"><R n="c_update_right_node"/></AccessStruct>],
                ["c_gtree_node_set", <AccessStruct field="c_gtree_node_set"><R n="c_update_right_node"/></AccessStruct>],
                ["c_gtree_node_right", <R n="c_update_right_new"/>],
              ]} />
            </Return>
          ]}
        />
        <Loc/>
        <FunctionItem
          comment={<>
            A (non-empty) <R n="c_gtree"/> has a root <R n="c_gtree_node"/> that consists of a <R n="rank"/>, a <R n="gtree_right_subtree"/>, and a non-empty set of pairs of <Rs n="item"/> and their <Rs n="gtree_left_subtree"/>.<Br/>

            Occasionally, we need to construct a non-empty <R n="c_gtree"/> from a <R n="rank"/>, a <R n="gtree_right_subtree"/>, and a <Em>possibly empty</Em> set of pairs of <Rs n="item"/> and their <Rs n="gtree_left_subtree"/>. If the set is empty, the lifted <R n="c_gtree"/> is simply the supplied <R n="gtree_right_subtree"/>.
          </>}
          id={["lift", "c_norm"]}
          generics={[{
            id: ["I", "c_norm_i"], 
          }, {
            id: [<><Mathfrak>S</Mathfrak></>, "c_norm_s"],
            bounds: [<TypeApplication constr="c_neset" args={[<R n="c_norm_i"/>]}/>],
          }]}
          args={[
            ["s", "c_norm_arg", <TypeApplication constr="c_set" args={[<R n="c_norm_s"/>]} />],
            ["right", "c_norm_right", <TypeApplication constr="c_gtree" args={[<R n="c_norm_i"/>, <R n="c_norm_s"/>]} />],
            ["rank", "c_norm_rank", <M>\N</M>],
          ]}
          multilineArgs
          ret={<TypeApplication constr="c_gtree" args={[<R n="c_norm_i"/>, <R n="c_norm_s"/>]}/>}
          body={[
            <Match
              exp={<R n="c_norm_arg"/>}
              cases={[
                [
                  <QualifiedMember type={<R n="c_set"/>} member="c_set_empty" />,
                  <Return><R n="c_norm_right"/></Return>,
                ],
                [
                  <Tuple name={<QualifiedMember type={<R n="c_set"/>} member="c_set_nonempty" />} fields={[<DefValue n="c_norm_bla" r="set" />]} />,
                  <Return>
                    <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                      <Struct name="c_gtree_node" multiline fields={[
                        ["c_gtree_node_rank", <R n="c_norm_rank"/>],
                        ["c_gtree_node_set", <R n="c_norm_bla"/>],
                        ["c_gtree_node_right", <R n="c_norm_right"/>],
                      ]} />,
                    ]} />
                  </Return>,
                ],
              ]}
            />
          ]}
        />
      </Pseudocode>

      <P>
        While it is possible to derive insertion and deletion algorithms by generalizing the original <R n="zip_tree"/> algorithms (see <R n="explicit_implementations">Appendix C</R> for examples), we opt for a fully self-contained presentation here. Zipping and unzipping are similar to the join and split functions of <Bib item="blelloch2016just">join-based tree algorithms</Bib>. We consistently use zip and unzip terminology when operating on <Rs n="gtree"/>, and join and split terminology when operating on the underlying set datastructure <R n="gtree_g"/>.
      </P>

      <P>
        We build our insertion and deletion algorithms from algorithms for unzipping and zipping <Rs n="gtree"/>. Unzipping takes a key and splits a <R n="gtree"/> into the tree of all <Rs n="item"/> less than the key and the tree of all <Rs n="item"/> greater than the key<Marginale>The key itself occurs in neither returned tree, even if it is part of the input tree.</Marginale>. Zipping takes two trees, the first containing only <Rs n="item"/> strictly lesser than any <R n="item"/> of the second, and joins them together into a single tree. We call this version of zipping <Code>zip2</Code>, because it takes <Em>two</Em> arguments. We also use a <Code>zip3</Code> function, which additionally incorporates a single <R n="item"/> into the tree that is strictly greater than all <Rs n="item"/> of the first tree, and strictly less than all <Rs n="item"/> of the second tree. Insertion and deletion can then be implemented as composition of unzipping and zipping (<Code>zip3</Code> and <Code>zip2</Code>, respectively) — see <Rc n="fig_insert_and_delete"/>.
      </P>

      <Fig
          n="fig_insert_and_delete"
          title="Insertion and Deletion"
          caption={
            <P>
              Example of inserting or deleting <R n="item"/> <M>18</M> of <R n="rank"/> <M>3</M> via unzipping followed by zipping.
            </P>
          }
        >
        <Img
          src={<ResolveAsset asset={["graphics", "gtreeInsertDelete.svg"]} />}
          alt="A G-tree, before and after inserting an item, with the unzipped tree as an intermediate step."
          style="max-width: 450px; margin: 0 auto;"
        />
      </Fig>

      <P>
        To unzip a <R n="gtree"/>, <R n="c_neset_split"/> the inner <R n="c_gtree_node_set"/> of the root <R n="c_gtree_node"/>, and then performs a case distinction<Marginale>We give a more thorough description in the form of code comments.</Marginale> to determine whether it is necessary to recurse:
      </P>

      <Pseudocode n="code_unzip" lineNumbering>
        <FunctionItem
          comment={<>Split <R n="c_unzip_t"/> into two trees of <Rs n="item"/> strictly less and greater than <R n="c_unzip_key"/> respectively.</>}
          id={["unzip", "c_unzip"]}
          generics={[
            {
              id: ["I", "c_unzip_i"], 
            }, {
              id: [<><Mathfrak>S</Mathfrak></>, "c_unzip_s"],
              bounds: [<TypeApplication constr="c_neset" args={[<R n="c_unzip_i"/>]}/>],
            },
          ]}
          args={[
            ["t", "c_unzip_t", <TypeApplication constr="c_gtree" args={[<R n="c_unzip_s"/>]} />],
            ["key", "c_unzip_key", <R n="c_unzip_i"/>],
          ]}
          multilineArgs
          ret={<TupleType types={[
            <TypeApplication constr="c_gtree" args={[<R n="c_unzip_s"/>]} />,
            <TypeApplication constr="c_gtree" args={[<R n="c_unzip_s"/>]} />,
          ]}/>}
          body={[<Match
            exp={<R n="c_unzip_t"/>}
            cases={[
              {
                commented: {
                  comment: "Unzipping the empty tree is trivial.",
                  dedicatedLine: true,
                  segment: [
                    <QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_empty" />,
                    <>
                      <Return>
                        <Tuple fields={[
                          <R n="c_gtree_empty"/>,
                          <R n="c_gtree_empty"/>,
                        ]}/>
                      </Return>
                      <SpliceLoc/>
                    </>,
                  ],
                },
              },
              {
                commented: {
                  comment: <>
                    For non-empty trees, split the inner set.
                  </>,
                  dedicatedLine: true,
                  segment: [
                    <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} fields={[<DefValue n="c_unzip_set" r="s" />]} />,
                    <Match
                      exp={<Application fun="c_neset_split" args={[
                        <AccessStruct field="c_gtree_node_set"><R n="c_unzip_set"/></AccessStruct>,
                        <R n="c_unzip_key"/>
                      ]} />}
                      cases={[
                        {
                          commented: {
                            comment: <>If <AccessStruct field="c_gtree_node_set"><R n="c_unzip_set"/></AccessStruct> contains the split point (<R n="c_unzip_key"/>), then everything up until the split point becomes the left return value, with the <R n="gtree_left_subtree"/> of the split point becoming the <R n="gtree_right_subtree"/> of the left return. Everything after the split point becomes the right return, with the <R n="gtree_right_subtree"/> of the current node becoming the <R n="gtree_right_subtree"/> of the right return. No further recursion.</>,
                            dedicatedLine: true,
                            segment: [
                              <Tuple multiline fields={[
                                <DefValue n="c_left_set_0" r="left_set"/>,
                                <Tuple name={<QualifiedMember type={<R n="Option"/>} member="OptionSome" />} fields={[<DefValue n="c_left_subtree_of_key" r="left_subtree_of_key" />]} />,
                                <DefValue n="c_right_set_0" r="right_set"/>,
                              ]} />,
                              <Return>
                                <Tuple multiline fields={[
                                  <Application fun="c_norm" args={[
                                    <R n="c_left_set_0"/>,
                                    <R n="c_left_subtree_of_key"/>,
                                    <AccessStruct field="c_gtree_node_rank"><R n="c_unzip_set"/></AccessStruct>,
                                  ]}/>,
                                  <Application fun="c_norm" args={[
                                    <R n="c_right_set_0"/>,
                                    <AccessStruct field="c_gtree_node_right"><R n="c_unzip_set"/></AccessStruct>,
                                    <AccessStruct field="c_gtree_node_rank"><R n="c_unzip_set"/></AccessStruct>,
                                  ]}/>,
                                ]}/>
                              </Return>,
                            ],
                          },                          
                        },

                        {
                          commented: {
                            comment: <>If <AccessStruct field="c_gtree_node_set"><R n="c_unzip_set"/></AccessStruct> does not contain the split point, and all its <Rs n="item"/> are less than the split point, then recursively split the <R n="gtree_right_subtree"/> of <R n="c_unzip_set"/>.</>,
                            dedicatedLine: true,
                            segment: [
                              <Tuple fields={[
                                <BlankPattern/>,
                                <QualifiedMember type={<R n="Option"/>} member="OptionNone" />,
                                <QualifiedMember type={<R n="c_set"/>} member="c_set_empty" />,
                              ]}/>,
                              [
                                <LetRaw lhs={<Tuple fields={[
                                  <DefValue n="c_left_0" r="left"/>,
                                  <DefValue n="c_right_0" r="right"/>,
                                ]}/>}>
                                  <Application fun="c_unzip" args={[
                                    <AccessStruct field="c_gtree_node_right"><R n="c_unzip_set"/></AccessStruct>,
                                    <R n="c_unzip_key"/>,
                                  ]} />
                                </LetRaw>,
                                <Return>
                                  <Tuple multiline fields={[
                                    <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} fields={[
                                      <Application fun="c_update_right" args={[
                                        <R n="c_unzip_set"/>,
                                        <R n="c_left_0"/>
                                      ]}/>,
                                    ]} />,
                                    <R n="c_right_0"/>,
                                  ]}/>
                                </Return>,
                              ],
                            ],
                          },                          
                        },

                        {
                          commented: {
                            comment: <>If <AccessStruct field="c_gtree_node_set"><R n="c_unzip_set"/></AccessStruct> does not contain the split point, but it does contain <Rs n="item"/> greater than the split point, then recursively split the <R n="gtree_left_subtree">leftmost subtree</R> of those greater <Rs n="item"/>.</>,
                            dedicatedLine: true,
                            segment: [
                              <Tuple fields={[
                                <DefValue n="c_left_set_1" r="left_set"/>,
                                <QualifiedMember type={<R n="Option"/>} member="OptionNone" />,
                                <Tuple name={<QualifiedMember type={<R n="c_set"/>} member="c_set_nonempty" />} fields={[<DefValue n="c_r_0" r="r"/>]}/>,
                              ]}/>,
                              [
                                <LetRaw lhs={<Tuple multiline fields={[
                                  <Tuple fields={[<DefValue n="r_leftmost_item"/>, <DefValue n="r_leftmost_subtree"/>]}/>,
                                  <DefValue n="r_remaining"/>,
                                ]}/>}>
                                  <Application fun="c_neset_remove_min" args={[<R n="c_r_0"/>]} />
                                </LetRaw>,
                                <LetRaw lhs={<Tuple multiline fields={[
                                  <DefValue n="c_left_1" r="left"/>,
                                  <DefValue n="c_right_1" r="right"/>,
                                ]}/>}>
                                  <Application fun="c_unzip" args={[
                                    <R n="r_leftmost_subtree"/>,
                                    <R n="c_unzip_key"/>,
                                  ]} />
                                </LetRaw>,
                                <Return>
                                  <Tuple multiline fields={[
                                    <Application fun="c_norm" args={[
                                      <R n="c_left_set_1"/>,
                                      <R n="c_left_1"/>,
                                      <AccessStruct field="c_gtree_node_rank"><R n="c_unzip_set"/></AccessStruct>,
                                    ]}/>,
                                    <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} fields={[
                                      <Struct name="c_gtree_node" multiline fields={[
                                        ["c_gtree_node_rank", <AccessStruct field="c_gtree_node_rank"><R n="c_unzip_set"/></AccessStruct>],
                                        ["c_gtree_node_set", <Application fun="c_set_insert_min" multilineArgs args={[
                                          <R n="r_remaining"/>,
                                          <Tuple fields={[
                                            <R n="r_leftmost_item"/>,
                                            <R n="c_right_1"/>,
                                          ]}/>
                                        ]}/>],
                                        ["c_gtree_node_right", <AccessStruct field="c_gtree_node_right"><R n="c_unzip_set"/></AccessStruct>],
                                      ]} />,
                                    ]} />,
                                  ]}/>
                                </Return>,
                              ],
                            ],
                          },                          
                        },
                      ]}
                    />
                  ],
                },
              },
            ]}
          />]}
        />
      </Pseudocode>

      <P>
        Since the expected size of <Rs n="gnode"/> is constant with high probability, we can treat all functions of the <R n="c_neset"/> interface as running in constant time. Each recursive call of the <R n="c_unzip"/> function is to a <R n="c_gtree_node"/> of strictly decreasing <R n="c_gtree_node_rank"/>, so the recursion depth is bounded by the height of the <R n="gtree"/>, which is logarithmic with high probability. Hence, the overall running time is in <BigO>\log(n)</BigO> with high probability.
      </P>

      <P>
        We can similarly give a recursive algorithm<Marginale>Again, the main description takes the form of code comments.</Marginale> for zipping together two <Rs n="gtree"/> with the same complexity properties:
      </P>

      <Pseudocode n="code_zip2" lineNumbering>
        <FunctionItem
          comment={<>Join two trees <R n="c_zip2_left"/> and <R n="c_zip2_right"/> into a single tree, assuming that all <Rs n="item"/> in <R n="c_zip2_left"/> are less than any <Rs n="item"/> in <R n="c_zip2_right"/>.</>}
          id={["zip2", "c_zip2"]}
          generics={[
            {
              id: ["I", "c_zip2_i"], 
            }, {
              id: [<><Mathfrak>S</Mathfrak></>, "c_zip2_s"],
              bounds: [<TypeApplication constr="c_neset" args={[<R n="c_zip2_i"/>]}/>],
            },
          ]}
          args={[
            ["left", "c_zip2_left", <TypeApplication constr="c_gtree" args={[<R n="c_zip2_s"/>]} />],
            ["right", "c_zip2_right", <TypeApplication constr="c_gtree" args={[<R n="c_zip2_s"/>]} />],
          ]}
          multilineArgs
          ret={<TypeApplication constr="c_gtree" args={[<R n="c_zip2_s"/>]} />}
          body={[
            <Match
              exp={<Tuple fields={[
                <R n="c_zip2_left"/>,
                <R n="c_zip2_right"/>,
              ]}/>}
              cases={[
                {commented: {
                  comment: <>If <R n="c_zip2_left"/> is empty, then the join is the other tree.</>,
                  dedicatedLine: true,
                  segment: [
                    <Tuple fields={[
                      <QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_empty" />,
                      <BlankPattern/>,
                    ]}/>,
                    <Return><R n="c_zip2_right"/></Return>,
                  ],
                }},
                {commented: {
                  comment: <>If <R n="c_zip2_right"/> is empty, then the join is the other tree.</>,
                  dedicatedLine: true,
                  segment: [
                    <Tuple fields={[
                      <BlankPattern/>,
                      <QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_empty" />,
                    ]}/>,
                    <Return><R n="c_zip2_left"/></Return>,
                  ],
                }},
                {commented: {
                  comment: <>Neither tree is empty, so there is real work to do. What that entails depends on how the ranks of the root nodes of the two trees compare.</>,
                  dedicatedLine: true,
                  segment: [
                    <Tuple fields={[
                      <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} fields={[<DefValue n="c_zip2_l" r="l" />]} />,
                      <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} fields={[<DefValue n="c_zip2_r" r="r" />]} />
                    ]}/>,
                    [
                      <If
                        cond={
                          <><AccessStruct field="c_gtree_node_rank"><R n="c_zip2_l"/></AccessStruct> <Lt/> <AccessStruct field="c_gtree_node_rank"><R n="c_zip2_l"/></AccessStruct></>
                        }
                        body={[
                          {commented: {
                            comment: <>Zip <R n="c_zip2_l"/> into the leftmost <R n="gtree_left_subtree"/> of <R n="c_zip2_r"/>.</>,
                            dedicatedLine: true,
                            segment: <LetRaw lhs={<Tuple multiline fields={[
                              <Tuple fields={[<BlankPattern/>, <DefValue n="c_zip2_r_leftmost_subtree" r="r_leftmost_subtree"/>]}/>,
                              <BlankPattern/>,
                            ]}/>}>
                              <Application fun="c_neset_remove_min" args={[<R n="c_zip2_r"/>]} />
                            </LetRaw>
                          }},
                          <Let id={["zipped", "c_zip2_zipped_0"]}>
                            <Application fun="c_zip2" args={[
                              <R n="c_zip2_left"/>,
                              <R n="c_zip2_r_leftmost_subtree"/>
                            ]}/>
                          </Let>,
                          <Return>
                            <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                              <Application fun="c_update_leftmost" args={[
                                <R n="c_zip2_r"/>,
                                <R n="c_zip2_zipped_0"/>
                              ]}/>,
                            ]} />
                          </Return>,
                        ]}
                      />,
                      <ElseIf
                        cond={
                          <><AccessStruct field="c_gtree_node_rank"><R n="c_zip2_l"/></AccessStruct> <Gt/> <AccessStruct field="c_gtree_node_rank"><R n="c_zip2_l"/></AccessStruct></>
                        }
                        body={[
                          {commented: {
                            comment: <>Zip <R n="c_zip2_r"/> into the <R n="gtree_right_subtree"/> of <R n="c_zip2_l"/>.</>,
                            dedicatedLine: true,
                            segment: <Let id={["zipped", "c_zip2_zipped_1"]}>
                              <Application fun="c_zip2" args={[
                                <AccessStruct field="c_gtree_node_right"><R n="c_zip2_l"/></AccessStruct>,
                                <R n="c_zip2_right"/>,
                              ]}/>
                            </Let>,
                          }},
                          <Return>
                            <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                              <Application fun="c_update_right" args={[
                                <R n="c_zip2_l"/>,
                                <R n="c_zip2_zipped_1"/>
                              ]}/>,
                            ]} />
                          </Return>,
                        ]}
                      />,
                      <Else body={[
                        {commented: {
                          comment: <>Equal ranks. Join the two inner sets, with the <R n="gtree_right_subtree"/> of the left node being zipped into the leftmost <R n="gtree_left_subtree"/> of the right node.</>,
                          dedicatedLine: true,
                          segment: <LetRaw lhs={<Tuple multiline fields={[
                            <Tuple fields={[<DefValue n="c_zip2_r_leftmost_item2" r="r_leftmost_item"/>, <DefValue n="c_zip2_r_leftmost_subtree2" r="r_leftmost_subtree"/>]}/>,
                            <DefValue n="c_zip2_r_others" r="r_others"/>,
                          ]}/>}>
                              <Application fun="c_neset_remove_min" args={[<R n="c_zip2_r"/>]} />
                            </LetRaw>,
                          }},
                          <Let id={["zipped", "c_zip2_zipped_2"]}>
                              <Application fun="c_zip2" args={[
                                <AccessStruct field="c_gtree_node_right"><R n="c_zip2_l"/></AccessStruct>,
                                <R n="c_zip2_r_leftmost_subtree2"/>,
                              ]}/>
                          </Let>,
                          <>
                            <Let id={["r_set", "c_zip2_r_set"]}>
                              <Application fun="c_neset_insert_min" multilineArgs args={[
                                <R n="c_zip2_r_others"/>,
                                <Tuple fields={[
                                  <R n="c_zip2_r_leftmost_item2"/>,
                                  <R n="c_zip2_zipped_2"/>,
                                ]}/>,
                              ]}/>
                            </Let>
                            <SpliceLoc/>
                          </>,
                          <Return>
                            <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                              <Struct name="c_gtree_node" multiline fields={[
                                ["c_gtree_node_rank", <AccessStruct field="c_gtree_node_rank"><R n="c_zip2_l"/></AccessStruct>],
                                ["c_gtree_node_set", <Application fun="c_neset_join" args={[
                                  <AccessStruct field="c_gtree_node_set"><R n="c_zip2_l"/></AccessStruct>,
                                  <R n="c_zip2_r_set"/>,
                                ]}/>],
                                ["c_gtree_node_right", <AccessStruct field="c_gtree_node_right"><R n="c_zip2_r"/></AccessStruct>],
                              ]} />,
                            ]} />
                          </Return>,
                      ]}/>
                    ],
                  ],
                }},
              ]}
            />
          ]}
        />
      </Pseudocode>

      <P>
        To implement zipping of two <Rs n="gtree"/> with an additional <R n="item"/> in between them, we can simply convert that <R n="item"/> into a singleton <R n="gtree"/>, and then call <R n="c_zip2"/> twice:
      </P>

      <Pseudocode n="code_zip3" lineNumbering>
        <FunctionItem
          comment={<>Join two trees <R n="c_zip3_left"/> and <R n="c_zip3_right"/> and the item <R n="c_zip3_item"/> into a single tree, assuming that all <Rs n="item"/> in <R n="c_zip3_left"/> are less than <R n="c_zip3_item"/>, and all <Rs n="item"/> in <R n="c_zip3_right"/> are greater than <R n="c_zip3_item"/>.</>}
          id={["zip3", "c_zip3"]}
          generics={[
            {
              id: ["I", "c_zip3_i"], 
            }, {
              id: [<><Mathfrak>S</Mathfrak></>, "c_zip3_s"],
              bounds: [<TypeApplication constr="c_neset" args={[<R n="c_zip3_i"/>]}/>],
            },
          ]}
          args={[
            ["left", "c_zip3_left", <TypeApplication constr="c_gtree" args={[<R n="c_zip3_s"/>]} />],
            ["item", "c_zip3_item", <R n="c_zip3_i"/>],
            ["rank", "c_zip3_rank", <M>\N</M>],
            ["right", "c_zip3_right", <TypeApplication constr="c_gtree" args={[<R n="c_zip3_s"/>]} />],
          ]}
          multilineArgs
          ret={<TypeApplication constr="c_gtree" args={[<R n="c_zip3_s"/>]} />}
          body={[
            <>
              <Let id={["mid", "c_zip3_mid"]}>
                <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                  <Struct name="c_gtree_node" multiline fields={[
                    ["c_gtree_node_rank", <R n="c_zip3_rank"/>],
                    ["c_gtree_node_set", <Application fun="c_neset_singleton" args={[
                      <R n="c_zip3_item"/>,
                      <QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_empty" />,
                    ]}/>],
                    ["c_gtree_node_right", <QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_empty" />],
                  ]} />,
                ]} />
              </Let>
              <SpliceLoc/>
            </>,
            <Return>
              <Application fun="c_zip2" args={[
                <Application fun="c_zip2" args={[
                  <R n="c_zip3_left"/>,
                  <R n="c_zip3_mid"/>,
                ]}/>,
                <R n="c_zip3_right"/>
              ]}/>
            </Return>
          ]}
        />
      </Pseudocode>

      <P>
        With <R n="c_unzip"/>, <R n="c_zip2"/>, and <R n="c_zip3"/> in place, insertion and deletion in expected logarithmic time become trivial:
      </P>

      <Pseudocode n="code_insert_delete" lineNumbering>
        <FunctionItem
          comment={<>Insert an <R n="item"/> at a given <R n="rank"/> into a <R n="gtree"/>.</>}
          id={["insert", "c_insert"]}
          generics={[
            {
              id: ["I", "c_insert_i"], 
            }, {
              id: [<><Mathfrak>S</Mathfrak></>, "c_insert_s"],
              bounds: [<TypeApplication constr="c_neset" args={[<R n="c_insert_i"/>]}/>],
            },
          ]}
          args={[
            ["t", "c_insert_t", <TypeApplication constr="c_gtree" args={[<R n="c_insert_s"/>]} />],
            ["item", "c_insert_item", <R n="c_insert_i"/>],
            ["rank", "c_insert_rank", <M>\N</M>],
          ]}
          multilineArgs
          ret={<TypeApplication constr="c_gtree" args={[<R n="c_insert_s"/>]} />}
          body={[
            <LetRaw lhs={<Tuple fields={[
              <DefValue n="c_insert_left" r="left"/>,
              <DefValue n="c_insert_right" r="right"/>,
            ]}/>}>
              <Application fun="c_unzip" args={[
                <R n="c_insert_t"/>,
                <R n="c_insert_item"/>,
              ]}/>
            </LetRaw>,
            <Return>
              <Application fun="c_zip3" args={[
                <R n="c_insert_left"/>,
                <R n="c_insert_item"/>,
                <R n="c_insert_rank"/>,
                <R n="c_insert_right"/>,
              ]}/>
            </Return>,
          ]}
        />
        <Loc/>
        <FunctionItem
          comment={<>Delete an <R n="item"/> from a <R n="gtree"/>.</>}
          id={["delete", "c_delete"]}
          generics={[
            {
              id: ["I", "c_delete_i"], 
            }, {
              id: [<><Mathfrak>S</Mathfrak></>, "c_delete_s"],
              bounds: [<TypeApplication constr="c_neset" args={[<R n="c_delete_i"/>]}/>],
            },
          ]}
          args={[
            ["t", "c_delete_t", <TypeApplication constr="c_gtree" args={[<R n="c_delete_s"/>]} />],
            ["item", "c_delete_item", <R n="c_delete_i"/>],
          ]}
          multilineArgs
          ret={<TypeApplication constr="c_gtree" args={[<R n="c_delete_s"/>]} />}
          body={[
            <LetRaw lhs={<Tuple fields={[
              <DefValue n="c_delete_left" r="left"/>,
              <DefValue n="c_delete_right" r="right"/>,
            ]}/>}>
              <Application fun="c_unzip" args={[
                <R n="c_delete_t"/>,
                <R n="c_delete_item"/>,
              ]}/>
            </LetRaw>,
            <Return>
              <Application fun="c_zip2" args={[
                <R n="c_delete_left"/>,
                <R n="c_delete_right"/>,
              ]}/>
            </Return>,
          ]}
        />
      </Pseudocode>

      <P>
        We want to emphasize that our choice of algorithms optimizes for elegance, not for (non-asymptotic) efficiency. Implementations based on in-place mutations will outperform our immutable algorithms. A direct implementation of <R n="c_zip3"/> will outperform the reduction to two applications of <R n="c_zip2"/>. Iterative implementations might outperform recursive implementations. And finally, direct implementations of insertion and deletion should outperform those based off unzipping and zipping the full trees. The <Bib item="tarjan2021zip">original zip-tree paper</Bib> contains examples of direct algorithms that zip and unzip only parts of a tree; our algorithms can be adapted to work analogously, and we provide variants for <Rs n="gtree"/> in <R n="explicit_implementations">Appendix C</R>.
      </P>
    </Hsection>

    <Hsection n="conclusion" title="Conclusion">
      <P>
          We have generalized the <Rs n="zip_tree"/> to the rich family of <Rs n="gtree"/>. <Rsb n="gtree"/> must be instantiated with a concrete set data structure; using a linked list yields the <Rs n="zip_tree"/>, and direct recursive self-instantiation yields the <Rs n="zipzip"/>. All <Rs n="gtree"/> are <R n="history_independent"/> if the underlying set data structure is <R n="history_independent"/>, and admit the same <R n="implementation">efficient algorithms</R> for mutating them. We have <R n="analysis">proven</R> the <Rs n="gtree"/> to be similar to perfectly balanced search trees with high probability, a property that makes them asymptotically and practically efficient.
      </P>

      <P>
        Beyond merely generalizing existing data structures, we have defined the <Rs n="kzip_tree"/>, a conceptually simple family of <R n="history_independent"/> data structures that store up to <M>k</M> <Rs n="item"/> in a single vertex. Such data structures make more efficient use of hardware caches than binary trees, allowing the <Rs n="kzip_tree"/> to <R n="fig_search_performance">outperform</R> the binary <Rs n="zip_tree"/>. 
      </P>
    </Hsection>

    <Hsection title="References" n="bibliography" noNumbering>
      <Bibliography />
    </Hsection>

    <Hsection n="experiments" title="Appendix A: Code" noNumbering>
      <P>
        We have published the code powering our experiments <A href="https://github.com/g-trees/gtree_experiments">on github</A> (under the MIT license). The implementation written is in <A href="https://www.rust-lang.org/">rust</A>, and can be built with the <A href="https://doc.rust-lang.org/cargo/">cargo package manager</A>.

        Run <Code>cargo run --bin stats</Code> to replicate the experiments for <Rc n="fig_stats_gheight"/>, <Rc n="fig_stats_gnode_size"/>, <Rc n="fig_stats_gnode_count"/>, <Rc n="fig_kzip_height"/>, and <Rc n="fig_space_amplification"/>.

        Run <Code>cargo bench</Code> to recreate the benchmark for <Rc n="fig_search_performance"/>.
      </P>
    </Hsection>

    <Hsection n="variants" title="Appendix B: G-Tree Variants" noNumbering>
      <P>
        We now sketch several variants of <Rs n="gtree"/> that might be useful in practice. Highlights include a <R n="gtree"/>-analogon of the <Bib item="comer1979ubiquitous">B<Sup>+</Sup>-tree</Bib>, and a cache-efficient generalization of the <R n="skip_list"/>. 
      </P>

      <PreviewScope>
        <P>
          When search trees store not only keys but key-value pairs, some usecases benefit from storing all key-value pairs in leaves of the tree. To support efficient lookup of the leaves, the inner vertices of the tree store duplicates of certain keys. We can easily adapt <Rs n="gtree"/> to this behavior by placing <Rs n="item"/> not only in the tree layer corresponding to their <R n="rank"/> but also on all lower layers. <Rcb n="fig_leafy_gtree"/> depicts such a <Def n="naive_leafy_gtree" r="naïve leafy G-tree"/>, and <Rc n="fig_leafy_1zip"/> and <Rc n="fig_leafy_2zip"/> show concrete instantiations with a <R n="k_list">1-list</R> (a <Def n="naive_leafy_zip_tree" r="naïve leafy zip-tree"/>) and a <R n="k_list">2-list</R> (a <Def n="naive_leafy_2zip_tree" r="naïve leafy 2-zip-tree"/>) respectively. We <Sidenote note={<>Spoiler: the ordering is arbitrary <Em>in principle</Em>, but our choice will surface a deep connection to <Rs n="skip_list"/> in a few paragraphs.</>}>arbitrarily</Sidenote> choose to sort <Rs n="item"/> of lower <R n="rank"/> to the right of their copies of higher <R n="rank"/>.
        </P>
      </PreviewScope>

      <Fig
        n="fig_leafy_gtree"
        wrapperTagProps={{clazz: "wide"}}
        title="Naïve Leafy G-Tree"
        caption={<>
          <P>
            An example <R n="naive_leafy_gtree"/> that stores the same <Rs n="item"/> as the <R n="gtree"/> in <Rc n="fig_gnodes"/>.
          </P>
        </>}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "leafGtree.svg"]} />}
        />
      </Fig>

      <Fig
        n="fig_leafy_1zip"
        wrapperTagProps={{clazz: "wide"}}
        title="Naïve Leafy Zip-Tree"
        caption={<>
          <P>
            An example <R n="naive_leafy_zip_tree"/>, a concrete instantiation of the <R n="naive_leafy_gtree"/> in <Rc n="fig_leafy_gtree"/>. Compare also with <Rc n="fig_ziptree_lists"/>, which depicts the <R n="zip_tree"/> for the same <Rs n="item"/>.
          </P>
        </>}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "leafGtreeOfLists.svg"]} />}
        />
      </Fig>

      <Fig
        n="fig_leafy_2zip"
        wrapperTagProps={{clazz: "wide"}}
        title="Naïve Leafy 2-Zip-Tree"
        caption={<>
          <P>
            An example <R n="naive_leafy_2zip_tree"/>, a concrete instantiation of the <R n="naive_leafy_gtree"/> in <Rc n="fig_leafy_gtree"/>. Compare also with <Rc n="fig_2ziptree"/>, which depicts the <R n="kzip_tree">2-zip-tree</R> for the same <Rs n="item"/>.
          </P>
        </>}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "leafGtree2Lists.svg"]} />}
        />
      </Fig>

      <PreviewScope>
        <P>
          The figures clearly show a deficiency of this naïve approach: almost all <Rs n="item"/> have a single pointer to the layer below, except for the first <R n="item"/> of each <R n="rank"/>, which needs two pointers.
          We can restore uniformity by adding a dummy element <M>\bot</M> at the start of each layer.
          {" "}<Rcb n="fig_leafy_bot_gtree"/> gives an example of the resulting (proper) <Def n="leafy_gtree" r="leafy G-tree" rs="leafy G-trees"/>; <Rc n="fig_leafy_bot_1zip"/> shows a <Def n="leafy_zip_tree" r="leafy zip-tree"/>, and <Rc n="fig_leafy_bot_2zip"/> shows a <Def n="leafy_2zip_tree" r="leafy 2-zip-tree"/>.
        </P>
      </PreviewScope>

      <Fig
        n="fig_leafy_bot_gtree"
        title="Leafy G-Tree"
        wrapperTagProps={{clazz: "wide"}}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "leafBotGtree.svg"]} />}
        />
      </Fig>

      <Fig
        n="fig_leafy_bot_1zip"
        title="Leafy Zip-Tree"
        wrapperTagProps={{clazz: "wide"}}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "leafBot1zip.svg"]} />}
        />
      </Fig>

      <Fig
        n="fig_leafy_bot_2zip"
        title="Leafy 2-Zip-Tree"
        wrapperTagProps={{clazz: "wide"}}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "leafBot2zip.svg"]} />}
        />
      </Fig>

      <P>
        The reader familiar with <Rs n="skip_list"/> should immediately see that <Rc n="fig_leafy_bot_1zip"/> — the rendering of a <R n="leafy_zip_tree"/> — essentially shows a <R n="skip_list"/>, except that some of the edges within the same layer are missing. <Rcb n="fig_linked_leafy_bot_1zip"/> shows a proper <R n="skip_list"/> with the same <Rs n="item"/> and <Rs n="rank"/> for comparison.
        Characterizing the <Quotes>missing</Quotes> edges from the perspective of <Rs n="leafy_gtree"/> is trivial: there are no edges between vertices of equal <R n="rank"/> that belong to different <Rs n="gnode"/>.
      </P>

      <P>
        Characterizing the missing edges from the perspective of <Rs n="skip_list"/> is quite instructive. Consider the algorithm for searching in a <R n="skip_list"/>: start in the topmost layer, follow pointers within a layer until overshooting the search target, drop down a layer when you would overshoot.
        The <Quotes>missing</Quotes> edges are exactly the edges that are always guaranteed to overshoot — if they did not overshoot, the search would never have descended into this part of the <R n="skip_list"/> in the first place. Search in a <R n="leafy_zip_tree"/> encounters a null pointer at the end of each <R n="gnode"/>, whereas search in a <R n="skip_list"/> blindly dereferences a pointer and performs a comparison whose result is already predetermined.
      </P>

      <P>
        As far as we are aware, this observation of two classes of next-pointers in <Rs n="skip_list"/> — those that always overshoot in a search, and those which might not overshoot in some searches — is novel. The fact that <Rs n="skip_list"/> get to conflate the two classes and algorithmically handle them in a uniform way might well be the underlying reason why <Rs n="skip_list"/> are so appealing compared to binary search trees.
      </P>

      <PreviewScope>
        <P>
          We can easily augment the <Rs n="leafy_gtree"/> to generalize the <Rs n="skip_list"/> by adding pointers between successive <Rs n="gnode"/> of equal <R n="rank"/>. <Rcb n="fig_linked_leafy_bot_gtree"/> shows the resulting <Def n="linked_leafy_gtree" r="linked leafy G-tree" rs="linked leafy G-trees"/> for our running example. <Rcb n="fig_linked_leafy_bot_1zip"/> instantiates with a linked list, obtaining a <Def n="linked_leafy_zip_tree" r="linked leafy zip-tree" rs="linked leafy zip-trees"/>, i.e., a <R n="skip_list"/>. <Rcb n="fig_linked_leafy_bot_2zip"/> shows the instantiation with a <R n="k_list">2-list</R>, yielding a <Def n="linked_leafy_2zip_tree" r="linked leafy 2-zip-tree" rs="linked leafy 2-zip-trees"/>. Instantiating the <Rs n="linked_leafy_zip_tree"/> with <Rs n="k_list"/> gives a family of generalizations of <Rs n="skip_list"/> that store <M>k</M> <Rs n="item"/> per vertex. Finding such a family could easily be reason for a dedicated publication, were it not for the fact that the powerful framework of geometric trees gives us this family essentially for free.
        </P>
      </PreviewScope>

      <Fig
        n="fig_linked_leafy_bot_gtree"
        title="Linked Leafy G-Tree"
        wrapperTagProps={{clazz: "wide"}}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "linkedLeafBotGtree.svg"]} />}
        />
      </Fig>

      <Fig
        n="fig_linked_leafy_bot_1zip"
        title="Linked Leafy Zip-Tree aka Skip-List"
        wrapperTagProps={{clazz: "wide"}}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "linkedLeafBot1zip.svg"]} />}
        />
      </Fig>

      <Fig
        n="fig_linked_leafy_bot_2zip"
        title="Linked Leafy 2-Zip-Tree aka 2-Skip-List"
        wrapperTagProps={{clazz: "wide"}}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "linkedLeafBot2zip.svg"]} />}
        />
      </Fig>

      <PreviewScope>
        <P>
          To conclude, we point out that linking only the <Em>leaves</Em> of a <R n="leafy_gtree"/> yields a family analogous to the <Bib item="comer1979ubiquitous">B<Sup>+</Sup>-trees</Bib>. <Rcb n="fig_gplus_gtree"/> shows such a <Def n="gplus_tree" r={<>G<Sup>+</Sup>-tree</>}/>; <Rc n="fig_gplus_1zip"/> shows an instantiation with a linked list (a <Def n="zipplus_tree" r={<>zip<Sup>+</Sup>-tree</>}/>), and <Rc n="fig_gplus_2zip"/> shows an instantiation with a <R n="k_list">2-list</R> (a <Def n="zip2plus_tree" r={<>2-zip<Sup>+</Sup>-tree</>}/>).
        </P>
      </PreviewScope>

      <Fig
        n="fig_gplus_gtree"
        title={<>G<Sup>+</Sup>-Tree</>}
        wrapperTagProps={{clazz: "wide"}}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "gPlusGtree.svg"]} />}
        />
      </Fig>

      <Fig
        n="fig_gplus_1zip"
        title={<>Zip<Sup>+</Sup>-Tree</>}
        wrapperTagProps={{clazz: "wide"}}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "gPlus1zip.svg"]} />}
        />
      </Fig>

      <Fig
        n="fig_gplus_2zip"
        title={<>2-Zip<Sup>+</Sup>-Tree</>}
        wrapperTagProps={{clazz: "wide"}}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "gPlus2zip.svg"]} />}
        />
      </Fig>
    </Hsection>

    <Hsection n="explicit_implementations" title="Appendix C: Explicit Insertion and Deletion" noNumbering>
      <PreviewScope>
        <P>
          As alluded to in <Rc n="implementation"/>, it is possible to derive direct insertion and deletion functions for <Rs n="gtree"/> that are analgous to Algorithm 1 from the original <R n="zip_tree"/> paper. For completeness, we provide pseudocode for purely functional variants of these functions for <Rs n="gtree"/>. The functions leverage the previously defined <R n="c_zip2"/> and various helper functions.
        </P>
      </PreviewScope>
      <P>
        We also define an additional helper function which joins a possibly empty <R n="c_set"/> with a greater <R n="c_neset"/>.:
      </P>

        <Pseudocode n="code_explicit_helpers" lineNumbering>
          <FunctionItem
            comment={<>Join a (possibly empty) <R n="c_set"/> with a greater <R n="c_neset"/>.</>}
            id={["set_join", "c_set_join"]}
            generics={[
              {
                id: ["I", "c_set_join_i"], 
              }, {
                id: [<><Mathfrak>S</Mathfrak></>, "c_set_join_s"],
                bounds: [<TypeApplication constr="c_neset" args={[<R n="c_set_join_i"/>]}/>],
              },
            ]}
            args={[
              ["left", "c_set_join_left", <TypeApplication constr="c_set" args={[<R n="c_set_join_s"/>]} />],
              ["right", "c_set_join_right", <R n="c_set_join_s"/>],
            ]}
            multilineArgs
            ret={<R n="c_set_join_s"/>}
            body={[
              <Match exp={<R n="c_set_join_left"/>} cases={[
                [
                  <QualifiedMember type={<R n="c_set"/>} member="c_set_empty" />,
                  <Return><R n="c_set_join_right"/></Return>,
                ],
                [
                  <Tuple name={<QualifiedMember type={<R n="c_set"/>} member="c_set_nonempty" />} fields={[<DefValue n="c_set_join_l" r="l" />]} />,
                  <Application fun="c_neset_join" args={[
                    <R n="c_set_join_l"/>,
                    <R n="c_set_join_right"/>,
                  ]} />,
                ],
              ]}/>,
            ]}
          />
        </Pseudocode>
      <P>
        The following explicit <R n="x_delete" /> pseudocode follows a very similar structure to Algorithm 1 from <Bib item="tarjan2021zip" />, though we use pattern matching here for consistency.
      </P>

      <Pseudocode n="code_explicit_delete" lineNumbering>
        <FunctionItem
          comment={<>Delete an <R n="item"/> from a <R n="gtree"/>.</>}
          id={["delete", "x_delete"]}
          generics={[
            {
              id: ["I", "x_delete_i"], 
            }, {
              id: [<><Mathfrak>S</Mathfrak></>, "x_delete_s"],
              bounds: [<TypeApplication constr="c_neset" args={[<R n="x_delete_i"/>]}/>],
            },
          ]}
          args={[
            ["t", "x_delete_t", <TypeApplication constr="c_gtree" args={[<R n="x_delete_s"/>]} />],
            ["item", "x_delete_item", <R n="x_delete_i"/>],
          ]}
          multilineArgs
          ret={<TypeApplication constr="c_gtree" args={[<R n="x_delete_s"/>]} />}
          body={[
            <Match
              exp={<R n="x_delete_t"/>}
              cases={[
                {
                  commented: {
                    comment: "Deletion in the empty tree is trivial.",
                    dedicatedLine: true,
                    segment: [
                      <QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_empty" />,
                      <>
                        <Return><R n="c_gtree_empty"/></Return>
                        <SpliceLoc/>
                      </>,
                    ],
                  },
                },

                {
                  commented: {
                    comment: <>
                      For non-empty trees, split the inner set.
                    </>,
                    dedicatedLine: true,
                    segment: [
                      <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} fields={[<DefValue n="x_delete_set" r="s" />]} />,
                      <Match
                        exp={<Application fun="c_neset_split" args={[
                          <AccessStruct field="c_gtree_node_set"><R n="x_delete_set"/></AccessStruct>,
                          <R n="x_delete_item"/>
                        ]} />}
                        cases={[
                          {
                            commented: {
                              comment: <>The target <R n="x_delete_item"/> was found. Simply exclude it and zip the left and right subtrees together.</>,
                              dedicatedLine: true,
                              segment: [
                                <Tuple multiline fields={[
                                  <DefValue n="x_left_set_0" r="left_set"/>,
                                  <Tuple name={<QualifiedMember type={<R n="Option"/>} member="OptionSome" />} fields={[<DefValue n="x_left_subtree_of_key" r="left_subtree_of_key" />]} />,
                                  <DefValue n="x_right_set_0" r="right_set"/>,
                                ]} />,
                                <Return>
                                  <Application fun="c_zip2" multilineArgs args={[
                                    <Application fun="c_norm" args={[
                                      <R n="x_left_set_0"/>,
                                      <R n="x_left_subtree_of_key"/>,
                                      <AccessStruct field="c_gtree_node_rank"><R n="x_delete_set"/></AccessStruct>,
                                    ]}/>,
                                    <Application fun="c_norm" args={[
                                      <R n="x_right_set_0"/>,
                                      <AccessStruct field="c_gtree_node_right"><R n="x_delete_set"/></AccessStruct>,
                                      <AccessStruct field="c_gtree_node_rank"><R n="x_delete_set"/></AccessStruct>,
                                    ]}/>,
                                  ]}/>
                                </Return>,
                              ],
                            },
                          },

                          {
                            commented: {
                              comment: <>The target <R n="x_delete_item"/> is strictly greater than all items in <AccessStruct field="c_gtree_node_set"><R n="x_delete_set"/></AccessStruct>, recurse into the <AccessStruct field="c_gtree_node_right"><R n="x_delete_set"/></AccessStruct> subtree and build from the left.</>,
                              dedicatedLine: true,
                              segment: [
                                <Tuple fields={[
                                  <DefValue n="x_left_set_1" r="left_set"/>,
                                  <QualifiedMember type={<R n="Option"/>} member="OptionNone" />,
                                  <QualifiedMember type={<R n="c_set"/>} member="c_set_empty" />,
                                ]} />,
                                [
                                  <Return>
                                    <Application fun="c_norm" multilineArgs args={[
                                      <R n="x_left_set_1"/>,
                                      <Application fun="x_delete" args={[
                                        <AccessStruct field="c_gtree_node_right"><R n="x_delete_set"/></AccessStruct>,
                                        <R n="x_delete_item"/>,
                                      ]}/>,
                                      <AccessStruct field="c_gtree_node_rank"><R n="x_delete_set"/></AccessStruct>,
                                    ]}/>
                                  </Return>,
                                ],
                              ],
                            },
                          },

                          {
                            commented: {
                              comment: <>The target <R n="x_delete_item"/> is strictly less than the <R n="x_leftmost_item" /> of <R n="x_r_0"/>, recurse down the left and build from the right.</>,
                              dedicatedLine: true,
                              segment: [
                                <Tuple fields={[
                                  <DefValue n="x_left_set_2" r="left_set"/>,
                                  <QualifiedMember type={<R n="Option"/>} member="OptionNone" />,
                                  <Tuple name={<QualifiedMember type={<R n="c_set"/>} member="c_set_nonempty" />} fields={[<DefValue n="x_r_0" r="r"/>]}/>,
                                ]}/>,
                                [
                                  <LetRaw lhs={<Tuple multiline fields={[
                                    <Tuple fields={[<DefValue n="x_leftmost_item" r="leftmost_item"/>, <DefValue n="x_leftmost_subtree" r="leftmost_subtree"/>]}/>,
                                    <DefValue n="x_remaining" r="remaining"/>,
                                  ]}/>}>
                                    <Application fun="c_neset_remove_min" args={[<R n="x_r_0"/>]} />
                                  </LetRaw>,
                                  <Let id={["new_right", "x_new_right"]}>
                                    <Application fun="c_neset_insert_min" args={[
                                      <R n="x_remaining"/>,
                                      <Tuple multiline fields={[
                                        <R n="x_leftmost_item"/>,
                                        <Application fun="x_delete" args={[
                                          <R n="x_leftmost_subtree"/>,
                                          <R n="x_delete_item"/>,
                                        ]}/>
                                      ]}/>
                                    ]} />
                                  </Let>,
                                  <Return>
                                    <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                                      <Struct name="c_gtree_node" multiline fields={[
                                        ["c_gtree_node_set", <Application fun="c_set_join" args={[
                                          <R n="x_left_set_2"/>,
                                          <R n="x_new_right"/>,
                                        ]}/>],
                                        ["c_gtree_node_right", <AccessStruct field="c_gtree_node_right"><R n="x_delete_set"/></AccessStruct>],
                                        ["c_gtree_node_rank", <AccessStruct field="c_gtree_node_rank"><R n="x_delete_set"/></AccessStruct>],
                                      ]} />,
                                    ]} />
                                  </Return>,
                                ]
                              ],
                            },                          
                          },
                        ]}
                      />,
                    ],
                  },
                },
              ]}
            />
          ]}
        />
      </Pseudocode>
      <P>
        While the explicit insert function requires a bit more code, it also follows the same <Em>general structure</Em> of its original <R n="zip_tree"/> counterpart. The bulk of the additional code is devoted to operations on the inner set, whereas the matched patterns remain mostly equivalent.
      </P>
      <Pseudocode n="code_explicit_insert" lineNumbering>
        <FunctionItem
          comment={<>Insert an <R n="item"/> into a <R n="gtree"/>.</>}
          id={["insert", "y_insert"]}
          generics={[
            {
              id: ["I", "y_insert_i"], 
            }, {
              id: [<><Mathfrak>S</Mathfrak></>, "y_insert_s"],
              bounds: [<TypeApplication constr="c_neset" args={[<R n="y_insert_i"/>]}/>],
            },
          ]}
          args={[
            ["t", "y_insert_t", <TypeApplication constr="c_gtree" args={[<R n="y_insert_s"/>]} />],
            ["item", "y_insert_item", <R n="y_insert_i"/>],
            ["rank", "y_insert_rank", <M>\N</M>],
          ]}
          multilineArgs
          ret={<TypeApplication constr="c_gtree" args={[<R n="y_insert_s"/>]} />}
          body={[
            <Match
              exp={<R n="y_insert_t"/>}
              cases={[
                {
                  commented: {
                    comment: "Insertion into the empty tree is trivial.",
                    dedicatedLine: true,
                    segment: [
                      <QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_empty" />,
                      <>
                        <Return>
                          <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                            <Struct name="c_gtree_node" multiline fields={[
                              ["c_gtree_node_set", <Application fun="c_neset_singleton" args={[
                                <R n="y_insert_item"/>,
                                <QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_empty" />,
                              ]}/>],
                              ["c_gtree_node_right", <QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_empty" />],
                              ["c_gtree_node_rank", <R n="y_insert_rank"/>],
                            ]} />,
                          ]} />
                        </Return>
                        <SpliceLoc/>
                      </>,
                    ],
                  },
                },

                {
                  commented: {
                    comment: <>
                      For non-empty trees, split the inner set.
                    </>,
                    dedicatedLine: true,
                    segment: [
                      <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} fields={[<DefValue n="y_insert_set" r="s" />]} />,
                      <Match
                        exp={<Application fun="c_neset_split" args={[
                          <AccessStruct field="c_gtree_node_set"><R n="y_insert_set"/></AccessStruct>,
                          <R n="y_insert_item"/>
                        ]} />}
                        cases={[
                          {
                            commented: {
                              comment: <>Found the <R n="y_insert_item"/>, nothing more to do.</>,
                              dedicatedLine: true,
                              segment: [
                                <Tuple fields={[
                                  <BlankPattern/>,
                                  <Tuple name={<QualifiedMember type={<R n="Option"/>} member="OptionSome" />} fields={[<BlankPattern/>]} />,
                                  <BlankPattern/>,
                                ]} />,
                                <Return><R n="y_insert_t"/></Return>,
                              ],
                            },
                          },

                          {
                            commented: {
                              comment: <>The <R n="c_neset"/> of the current <R n="c_gtree_node"/> contains no <Rs n="item"/> greater than <R n="y_insert_item"/>.</>,
                              dedicatedLine: true,
                              segment: [
                                <Tuple fields={[
                                  <DefValue n="y_left_set_1" r="left_set"/>,
                                  <QualifiedMember type={<R n="Option"/>} member="OptionNone" />,
                                  <QualifiedMember type={<R n="c_set"/>} member="c_set_empty" />,
                                ]} />,
                                [
                                  <>
                                    <If
                                      cond={<><R n="y_insert_rank"/> <Lt/> <AccessStruct field="c_gtree_node_rank"><R n="y_insert_set"/></AccessStruct></>}
                                      body={[
                                        <Return>
                                          <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                                            <Struct name="c_gtree_node" multiline fields={[
                                              ["c_gtree_node_set", <AccessStruct field="c_gtree_node_set"><R n="y_insert_set"/></AccessStruct>],
                                              ["c_gtree_node_right", <Application fun="y_insert" args={[
                                                <AccessStruct field="c_gtree_node_right"><R n="y_insert_set"/></AccessStruct>,
                                                <R n="y_insert_item"/>,
                                                <R n="y_insert_rank"/>,
                                              ]} />],
                                              ["c_gtree_node_rank", <AccessStruct field="c_gtree_node_rank"><R n="y_insert_set"/></AccessStruct>],
                                            ]} />,
                                          ]} />
                                        </Return>
                                      ]}
                                    />{" "}
                                    <ElseIf
                                      cond={<><R n="y_insert_rank"/> <M>=</M> <AccessStruct field="c_gtree_node_rank"><R n="y_insert_set"/></AccessStruct></>}
                                      body={[
                                        <LetRaw lhs={<Tuple fields={[
                                          <DefValue n="y_l_1" r="l"/>,
                                          <DefValue n="y_r_1" r="r"/>,
                                        ]}/>}>
                                          <Application fun="c_unzip" args={[
                                            <AccessStruct field="c_gtree_node_right"><R n="y_insert_set"/></AccessStruct>,
                                            <R n="y_insert_item"/>,
                                          ]}/>
                                        </LetRaw>,
                                        <Return>
                                          <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                                            <Struct name="c_gtree_node" multiline fields={[
                                              ["c_gtree_node_set", <Application fun="c_set_join" multilineArgs args={[
                                                <R n="y_left_set_1"/>,
                                                <Application fun="c_neset_singleton" args={[
                                                  <R n="y_insert_item"/>,
                                                  <R n="y_l_1"/>,
                                                ]}/>,
                                              ]}/>],
                                              ["c_gtree_node_right", <R n="y_r_1"/>,],
                                              ["c_gtree_node_rank", <AccessStruct field="c_gtree_node_rank"><R n="y_insert_set"/></AccessStruct>],
                                            ]} />,
                                          ]} />
                                        </Return>
                                      ]}
                                    />{" "}
                                    <Else body={[
                                      <LetRaw lhs={<Tuple fields={[
                                        <DefValue n="y_l_2" r="l"/>,
                                        <DefValue n="y_r_2" r="r"/>,
                                      ]}/>}>
                                        <Application fun="c_unzip" args={[
                                          <AccessStruct field="c_gtree_node_right"><R n="y_insert_set"/></AccessStruct>,
                                          <R n="y_insert_item"/>,
                                        ]}/>
                                      </LetRaw>,
                                      <Let id={["left_subtree", "y_left_subtree1"]}>
                                        <Application fun="c_norm" multilineArgs args={[
                                          <R n="y_left_set_1"/>,
                                          <R n="y_l_2"/>,
                                          <AccessStruct field="c_gtree_node_rank"><R n="y_insert_set"/></AccessStruct>,
                                        ]}/>
                                      </Let>,
                                      <Return>
                                        <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                                          <Struct name="c_gtree_node" multiline fields={[
                                            ["c_gtree_node_set", <Application fun="c_neset_singleton" args={[
                                              <R n="y_insert_item"/>,
                                              <R n="y_left_subtree1"/>,
                                            ]}/>],
                                            ["c_gtree_node_right", <R n="y_r_2"/>,],
                                            ["c_gtree_node_rank", <R n="y_insert_rank"/>,],
                                          ]} />,
                                        ]} />
                                      </Return>,
                                    ]}/>
                                  </>
                                ],
                              ],
                            },
                          },

                          {
                            commented: {
                              comment: <>The <R n="c_neset"/> of the current <R n="c_gtree_node"/> does contain <Rs n="item"/> greater than <R n="y_insert_item"/>.</>,
                              dedicatedLine: true,
                              segment: [
                                <Tuple multiline fields={[
                                  <DefValue n="y_left_set_2" r="left_set"/>,
                                  <QualifiedMember type={<R n="Option"/>} member="OptionNone" />,
                                  <Tuple name={<QualifiedMember type={<R n="c_set"/>} member="c_set_nonempty" />} fields={[<DefValue n="y_right_set_2" r="right_set"/>]} />,
                                ]} />,
                                [
                                  <LetRaw lhs={<Tuple multiline fields={[
                                    <Tuple fields={[<DefValue n="y_leftmost_item" r="leftmost_item"/>, <DefValue n="y_leftmost_subtree" r="leftmost_subtree"/>]}/>,
                                    <DefValue n="y_remaining" r="remaining"/>,
                                  ]}/>}>
                                    <Application fun="c_neset_remove_min" args={[<R n="y_right_set_2"/>]} />
                                  </LetRaw>,
                                  <>
                                    <If
                                      cond={<><R n="y_insert_rank"/> <Lt/> <AccessStruct field="c_gtree_node_rank"><R n="y_insert_set"/></AccessStruct></>}
                                      body={[
                                        <Let id={["new_subtree", "y_new_subtree"]}>
                                          <Application fun="y_insert" multilineArgs args={[
                                            <R n="y_leftmost_subtree"/>,
                                            <R n="y_insert_item"/>,
                                            <R n="y_insert_rank"/>,
                                          ]} />
                                        </Let>,
                                        <Let id={["new_right", "y_new_right"]}>
                                          <Application fun="c_set_insert_min" multilineArgs args={[
                                            <R n="y_remaining"/>,
                                            <Tuple fields={[
                                              <R n="y_leftmost_item"/>,
                                              <R n="y_new_subtree"/>,
                                            ]}/>
                                          ]} />
                                        </Let>,
                                        <Return>
                                          <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                                            <Struct name="c_gtree_node" multiline fields={[
                                              ["c_gtree_node_set", <Application fun="c_set_join"  args={[
                                                <R n="y_left_set_2"/>,
                                                <R n="y_new_right"/>,
                                              ]}/>],
                                              ["c_gtree_node_right", <AccessStruct field="c_gtree_node_right"><R n="y_insert_set"/></AccessStruct>],
                                              ["c_gtree_node_rank", <AccessStruct field="c_gtree_node_rank"><R n="y_insert_set"/></AccessStruct>],
                                            ]} />,
                                          ]} />
                                        </Return>
                                      ]}
                                    />{" "}
                                    <ElseIf
                                      cond={<><R n="y_insert_rank"/> <M>=</M> <AccessStruct field="c_gtree_node_rank"><R n="y_insert_set"/></AccessStruct></>}
                                      body={[
                                        <LetRaw lhs={<Tuple fields={[
                                          <DefValue n="y_l_3" r="l"/>,
                                          <DefValue n="y_r_3" r="r"/>,
                                        ]}/>}>
                                          <Application fun="c_unzip" args={[
                                            <R n="y_leftmost_item"/>,
                                            <R n="y_insert_item"/>,
                                          ]}/>
                                        </LetRaw>,
                                        <Let id={["new_right", "y_new_right2"]}>
                                        <Application fun="c_neset_insert_min" multilineArgs args={[
                                          <Application fun="c_neset_insert_min" args={[
                                            <R n="y_remaining"/>,
                                            <Tuple fields={[
                                              <R n="y_leftmost_item"/>,
                                              <R n="y_r_3"/>,
                                            ]}/>
                                          ]}/>,
                                          <Tuple fields={[
                                            <R n="y_insert_item"/>,
                                            <R n="y_l_3"/>,
                                          ]}/>
                                        ]} />
                                      </Let>,
                                        <Return>
                                          <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                                            <Struct name="c_gtree_node" multiline fields={[
                                              ["c_gtree_node_set", <Application fun="c_set_join" args={[
                                                <R n="y_left_set_2"/>,
                                                <R n="y_new_right2"/>,
                                              ]}/>],
                                              ["c_gtree_node_right", <AccessStruct field="c_gtree_node_right"><R n="y_insert_set"/></AccessStruct>],
                                              ["c_gtree_node_rank", <AccessStruct field="c_gtree_node_rank"><R n="y_insert_set"/></AccessStruct>],
                                            ]} />,
                                          ]} />
                                        </Return>
                                      ]}
                                    />{" "}
                                    <Else body={[
                                      <LetRaw lhs={<Tuple fields={[
                                        <DefValue n="y_l_4" r="l"/>,
                                        <DefValue n="y_r_4" r="r"/>,
                                      ]}/>}>
                                        <Application fun="c_unzip" args={[
                                          <R n="y_leftmost_item"/>,
                                          <R n="y_insert_item"/>,
                                        ]}/>
                                      </LetRaw>,
                                      <Let id={["left_subtree", "y_left_subtree2"]}>
                                        <Application fun="c_norm" multilineArgs args={[
                                          <R n="y_left_set_2"/>,
                                          <R n="y_l_4"/>,
                                          <AccessStruct field="c_gtree_node_rank"><R n="y_insert_set"/></AccessStruct>,
                                        ]}/>
                                      </Let>,
                                      <Let id={["right_subtree", "y_right_subtree2"]}>
                                        <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                                          <Struct name="c_gtree_node" multiline fields={[
                                            ["c_gtree_node_set", <Application fun="c_neset_insert_min" multilineArgs args={[
                                              <R n="y_remaining"/>,
                                              <Tuple fields={[
                                                <R n="y_leftmost_item"/>,
                                                <R n="y_r_4"/>,
                                              ]}/>
                                            ]}/>],
                                            ["c_gtree_node_right", <AccessStruct field="c_gtree_node_right"><R n="y_insert_set"/></AccessStruct>],
                                            ["c_gtree_node_rank", <AccessStruct field="c_gtree_node_rank"><R n="y_insert_set"/></AccessStruct>],
                                          ]} />,
                                        ]} />
                                      </Let>,
                                      <Return>
                                        <Tuple name={<QualifiedMember type={<R n="c_gtree"/>} member="c_gtree_nonempty" />} multiline fields={[
                                          <Struct name="c_gtree_node" multiline fields={[
                                            ["c_gtree_node_set", <Application fun="c_neset_singleton" args={[
                                              <R n="y_insert_item"/>,
                                              <R n="y_left_subtree2"/>,
                                            ]}/>],
                                            ["c_gtree_node_right", <R n="y_right_subtree2"/>,],
                                            ["c_gtree_node_rank", <R n="y_insert_rank"/>,],
                                          ]} />,
                                        ]} />
                                      </Return>,
                                    ]}/>
                                  </>
                                ],
                              ],
                            },
                          },
                        ]}
                      />,
                    ],
                  },
                },
              ]}
            />
          ]}
        />
      </Pseudocode>
    </Hsection>
  </ArticleTemplate>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);

/*
what, why (link), sync/nb/nb_send, basics: producer-buffered-bulk, consumer-buffered-bulk, piping, wrappers, feature flags, queues, converters
*/