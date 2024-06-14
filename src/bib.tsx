import { A, BibItemDeclaration, Em, I, M, P, Sup } from "../deps.ts";
import { BigOmega, Mathcal, MFrac } from "./macros.tsx";
import { BigO, BigTheta, Curly } from "./macros.tsx";

export const bib: BibItemDeclaration[] = [
  {
    item: `@inproceedings{naor2001anti,
      title={Anti-persistence: History independent data structures},
      author={Naor, Moni and Teague, Vanessa},
      booktitle={Proceedings of the thirty-third annual ACM symposium on Theory of computing},
      pages={492--501},
      year={2001}
    }
`,
    asset: ["references", "naor2001anti.pdf"],
    blurb: (
      <>
        <P>
          Many data structures give away much more information than they were
          intended to. Whenever privacy is important, we need to be concerned
          that it might be possible to infer information from the memory
          representation of a data structure that is not available through its
          “legitimate” interface. Word processors that quietly maintain old
          versions of a document are merely the most egregious example of a
          general problem.
        </P>
        <P>
          We deal with data structures whose current memory representation does
          not reveal their history. We focus on dictionaries, where this means
          revealing nothing about the order of insertions or deletions. Our
          first algorithm is a hash table based on open addressing, allowing
          {" "}
          <BigO>1</BigO>{" "}
          insertion and search. We also present a history independent dynamic
          perfect hash table that uses space linear in the number of elements
          inserted and has expected amortized insertion and deletion time{" "}
          <BigO>1</BigO>. To solve the dynamic perfect hashing problem we devise
          a general scheme for history independent memory allocation. For
          fixed-size records this is quite efficient, with insertion and
          deletion both linear in the size of the record. Our variable-size
          record scheme is efficient enough for dynamic perfect hashing but not
          for general use. The main open problem we leave is whether it is
          possible to implement a variable-size record scheme with low overhead.
        </P>
      </>
    ),
  },
  {
    item: `@inproceedings{pugh1989incremental,
      title={Incremental computation via function caching},
      author={Pugh, William and Teitelbaum, Tim},
      booktitle={Proceedings of the 16th ACM SIGPLAN-SIGACT symposium on Principles of programming languages},
      pages={315--328},
      year={1989}
    }
`,
    asset: ["references", "pugh1989incremental.pdf"],
  },
  {
    item: `@inproceedings{merkle1989certified,
      title={A certified digital signature},
      author={Merkle, Ralph C},
      booktitle={Conference on the Theory and Application of Cryptology},
      pages={218--238},
      year={1989},
      organization={Springer}
    }   
`,
    asset: ["references", "merkle1989certified.pdf"],
    blurb: (
      <>
        <P>
          A practical digital signature system based on a conventional
          encryption function which is as secure as the conventional encryption
          function is described. Since certified conventional systems are
          available it can be implemented quickly, without the several years
          delay required for certification of an untested system.
        </P>
      </>
    ),
  },
  {
    item: `@article{seidel1996randomized,
      title={Randomized search trees},
      author={Seidel, Raimund and Aragon, Cecilia R},
      journal={Algorithmica},
      volume={16},
      number={4},
      pages={464--497},
      year={1996},
      publisher={Springer}
    }      
`,
    asset: ["references", "seidel1996randomized.pdf"],
    blurb: (
      <>
        <P>
          We present a randomized strategy for maintaining balance in
          dynamically changing search trees that has optimal <Em>expected</Em>
          {" "}
          behavior. In particular, in the expected case a search or an update
          takes logarithmic time, with the update requiring fewer than two
          rotations. Moreover, the update time remains logarithmic, even if the
          cost of a rotation is taken to be proportional to the size of the
          rotated subtree. Finger searches and splits and joins can be performed
          in optimal expected time also. We show that these results continue to
          hold even if very little true randomness is available, i.e., if only a
          logarithmic number of truely random bits are available. Our approach
          generalizes naturally to weighted trees, where the expected time
          bounds for accesses and updates again match the worst-case time bounds
          of the best deterministic methods.
        </P>
        <P>
          We also discuss ways of implementing our randomized strategy so that
          no explicit balance information is maintained. Our balancing strategy
          and our algorithms are exceedingly simple and should be fast in
          practice.
        </P>
      </>
    ),
  },
  {
    item: `@article{pugh1990skip,
      title={Skip lists: a probabilistic alternative to balanced trees},
      author={Pugh, William},
      journal={Communications of the ACM},
      volume={33},
      number={6},
      pages={668--676},
      year={1990},
      publisher={ACM New York, NY, USA}
    }     
`,
    asset: ["references", "pugh1990skip.pdf"],
    blurb: (
      <P>
        Skip lists are data structures that use probabilistic balancing rather
        than strictly enforced balancing. As a result, the algorithms for
        insertion and deletion in skip lists are much simpler and significantly
        faster than equivalent algorithms for balanced trees.
      </P>
    ),
  },
  {
    item: `@article{tarjan2021zip,
      title={Zip trees},
      author={Tarjan, Robert E and Levy, Caleb and Timmel, Stephen},
      journal={ACM Transactions on Algorithms (TALG)},
      volume={17},
      number={4},
      pages={1--12},
      year={2021},
      publisher={ACM New York, NY}
    }       
`,
    asset: ["references", "tarjan2021zip.pdf"],
    blurb: (
      <>
        <P>
          We introduce the{" "}
          <Em>zip tree</Em>, a form of randomized binary search tree that
          integrates previous ideas into one practical, performant, and
          pleasant-to-implement package. A zip tree is a binary search tree in
          which each node has a numeric rank and the tree is (max)-heap-ordered
          with respect to ranks, with rank ties broken in favor of smaller keys.
          Zip trees are essentially{" "}
          <A href="https://link.springer.com/article/10.1007/bf01940876">
            treaps
          </A>, except that ranks are drawn from a geometric distribution
          instead of a uniform distribution, and we allow rank ties. These
          changes enable us to use fewer random bits per node.
        </P>
        <P>
          We perform insertions and deletions by unmerging and merging paths
          (<Em>unzipping</Em> and{" "}
          <Em>zipping</Em>) rather than by doing rotations, which avoids some
          pointer changes and improves efficiency. The methods of zipping and
          unzipping take inspiration from previous top-down approaches to
          insertion and deletion by{" "}
          <A href="https://link.springer.com/article/10.1007/BF00995807">
            Stephenson
          </A>,{" "}
          <A href="https://dl.acm.org/doi/abs/10.1145/274787.274812">
            Martínez and Roura
          </A>, and{" "}
          <A href="https://link.springer.com/article/10.1007/BF02576649">
            Sprugnoli
          </A>.
        </P>
        <P>
          From a <Em>theoretical</Em>{" "}
          standpoint, this work provides two main results. First, zip trees
          require only <BigO>\log \log n</BigO>{" "}
          bits (with high probability) to represent the largest rank in an{" "}
          <M>n</M>-node binary search tree; previous data structures require
          {" "}
          <BigO>\log n</BigO>{" "}
          bits for the largest rank. Second, zip trees are naturally isomorphic
          to{" "}
          <A href="https://dl.acm.org/doi/abs/10.1145/78973.78977">
            skip lists
          </A>, and simplify{" "}
          <A href="https://dl.acm.org/doi/abs/10.1145/1233341.1233413">
            Dean and Jones’ mapping
          </A>{" "}
          between skip lists and binary search trees.
        </P>
      </>
    ),
  },
  {
    item: `@inproceedings{gila2023zip,
      title={Zip-Zip Trees: Making Zip Trees More Balanced, Biased, Compact, or Persistent},
      author={Gila, Ofek and Goodrich, Michael T and Tarjan, Robert E},
      booktitle={Algorithms and Data Structures Symposium},
      pages={474--492},
      year={2023},
      organization={Springer}
    }          
`,
    asset: ["references", "gila2023zip.pdf"],
    blurb: (
      <>
        <P>
          We define simple variants of zip trees, called{" "}
          <Em>zip-zip trees</Em>, which provide several advantages over zip
          trees, including overcoming a bias that favors smaller keys over
          larger ones. We analyze zip-zip trees theoretically and empirically,
          showing, e.g., that the expected depth of a node in an{" "}
          <M>n</M>-node zip-zip tree is at most{" "}
          <M>1.3863 \log n - 1 + o(1)</M>, which matches the expected depth of
          treaps and binary search trees built by uniformly random insertions.
          Unlike these other data structures, however, zip-zip trees achieve
          their bounds using only <BigO>\log \log n</BigO>{" "}
          bits of metadata per node, w.h.p., as compared to the{" "}
          <BigTheta>Θ(log n)</BigTheta>{" "}
          bits per node required by treaps. In addition, we describe a
          “just-in-time” zip- zip tree variant, which needs just an expected
          {" "}
          <BigO>1</BigO>{" "}
          number of bits of metadata per node. Moreover, we can define zip-zip
          trees to be strongly history independent, whereas treaps are generally
          only weakly history independent. We also introduce{" "}
          <Em>biased zip-zip trees</Em>, which have an explicit bias based on
          key weights, so the expected depth of a key, <M>k</M>, with weight,
          {" "}
          <M>w_k</M> , is <BigO>\log(W/w_k)</BigO>, where <M>W</M>{" "}
          is the weight of all keys in the weighted zip-zip tree. Finally, we
          show that one can easily make zip-zip trees partially persistent with
          only <BigO>n</BigO> space overhead w.h.p.
        </P>
      </>
    ),
  },
  {
    item: `@article{messeguer1997skip,
      title={Skip trees, an alternative data structure to skip lists in a concurrent approach},
      author={Messeguer, Xavier},
      journal={RAIRO-Theoretical Informatics and Applications},
      volume={31},
      number={3},
      pages={251--269},
      year={1997},
      publisher={EDP Sciences}
    }         
`,
    asset: ["references", "messeguer1997skip.pdf"],
    blurb: (
      <>
        <P>
          We present a new type ofsearch trees, called Skip trees, which are a
          generalization of Skip lists. To be précise, there is a one-to-one
          mapping between the two data types which commutes with the sequential
          update algorithms.
        </P>
        <P>
          A Skip list is a data structure used to manage data bases which stores
          values in a sorted way and in which it is insured that the form of the
          Skip list is independent of the order of updates by using
          randomization techniques. Skip trees inherit all the proeprties of
          Skip lists, including the time bounds of sequential algorithms.
        </P>
        <P>
          The algorithmic improvement of the Skip tree type is that a concurrent
          algorithm on the fly approach can be designed. Among other advantages,
          this algorithm is more compressive than the one designed by Pughfor
          Skip lists and accepts a higher degree of concurrence because it is
          based on a set of local updates.
        </P>
        <P>
          From a practical point of view, although the Skip list should be in
          the main memory, Skip trees can be registered into a secondary or
          external storage. Therefore we analyse the ability of Skip trees to
          manage data bases in comparison with B-trees.
        </P>
      </>
    ),
  },
  {
    item: `@inproceedings{auvolat2019merkle,
      title={Merkle search trees: Efficient state-based CRDTs in open networks},
      author={Auvolat, Alex and Taïani, François},
      booktitle={2019 38th Symposium on Reliable Distributed Systems (SRDS)},
      pages={221--22109},
      year={2019},
      organization={IEEE}
    }    
`,
    asset: ["references", "auvolat2019merkle.pdf"],
    blurb: (
      <P>
        Most recent CRDT techniques rely on a causal broadcast primitive to
        provide guarantees on the delivery of operation deltas. Such a primitive
        is unfortunately hard to implement efficiently in large open networks,
        whose membership is often difficult to track. As an alternative, we
        argue in this paper that pure state-based CRDTs can be efficiently
        implemented by encoding states as specialized Merkle trees, and that
        this approach is well suited to open networks where many nodes may join
        and leave. At the core of our contribution lies a new kind of Merkle
        tree, called Merkle Search Tree (MST), that implements a balanced search
        tree while maintaining key ordering. This latter property makes it
        particularly efficient in the case of updates on sets of sequential
        keys, a common occurrence in many applications. We use this new data
        structure to implement a distributed event store, and show its
        efficiency in very large systems with low rates of updates. In
        particular, we show that in some scenarios our approach is able to
        achieve both a 66% reduction of bandwidth cost over a vector-clock
        approach, as well as a 34% improvement in consistency level. We finally
        suggest other uses of our construction for distributed databases in open
        networks.
      </P>
    ),
  },
  {
    item: `@inproceedings{shao1994unrolling,
      title={Unrolling lists},
      author={Shao, Zhong and Reppy, John H and Appel, Andrew W},
      booktitle={Proceedings of the 1994 ACM conference on LISP and functional programming},
      pages={185--195},
      year={1994}
    }   
`,
    asset: ["references", "shao1994unrolling.pdf"],
    blurb: (
      <>
        <P>
          Lists are ubiquitous in functional programs, thus supporting lists
          efficiently is a major concern to compiler writers for functional
          languages. Lists are normally represented as linked <I>cons</I>{" "}
          cells, with each <I>cons</I> cell containing a <I>car</I>{" "}
          (the data) and a <I>cdr</I>{" "}
          (the link); this is inefficient in the use of space, because 50% of
          the storage is used for links. Loops and recursions on lists are slow
          on modern machines because of the long chains of control dependence
          (in checking for <I>nil</I>) and data dependence (in fetching{" "}
          <I>cdr</I> fields).
        </P>
        <P>
          We present a data structure for “unrolled lists,” where each cell has
          several data items (<I>car</I>{" "}
          fields) and one link (<I>cdr</I>). This reduces the memory used for
          links, and it significantly shortens the length of control-dependence
          and data-dependence chains in operations on lists.
        </P>
        <P>
          We further present an efficient compile-time analysis that transforms
          programs written for “ordinary” lists into programs on unrolled lists.
          The use of our new representation requires no change to existing
          programs.
        </P>
        <P>
          We sketch the proof of soundness of our analysis—which is based on
          {" "}
          <I>refinement</I>{" "}
          types—and present some preliminary measurements of our technique.
        </P>
      </>
    ),
  },
  {
    item: `@inproceedings{snyder1977uniquely,
      title={On uniquely represented data strauctures},
      author={Snyder, Lawrence},
      booktitle={18th Annual Symposium on Foundations of Computer Science (sfcs 1977)},
      pages={142--146},
      year={1977},
      organization={IEEE}
    }
`,
    href: "https://ieeexplore.ieee.org/document/4567936",
    blurb: (
      <>
        <P>
          A model for searching algorithms is developed which includes most
          tree-like searching structures such as lists, binary trees, AVL trees
          and 2,3-trees. It is shown that no searching algorithm employing a
          data structure that is uniquely represented (up to isomorphism) can
          provide search, insert and delete functions all operating faster than
          {" "}
          <M>
            c\sqrt<Curly>n</Curly>
          </M>{" "}
          time for every <M>n</M> key tree. The{" "}
          <M>
            c\sqrt<Curly>n</Curly>
          </M>{" "}
          bound is shown to be achievable for uniquely represented data
          structures.
        </P>
      </>
    ),
  },
  {
    item: `@article{driscoll1994fully,
      title={Fully persistent lists with catenation},
      author={Driscoll, James R and Sleator, Daniel DK and Tarjan, Robert E},
      journal={Journal of the ACM (JACM)},
      volume={41},
      number={5},
      pages={943--959},
      year={1994},
      publisher={ACM New York, NY, USA}
    }      
`,
    asset: ["references", "driscoll1994fully.pdf"],
    blurb: (
      <P>
        This paper considers the problem of representing stacks with catenation
        so that any stack, old or new, is available for access or update
        operations. This problem arises in the implementation of list-based and
        functional programming languages. A solution is proposed requiring
        constant time and space for each stack operation except catenation,
        which requires <BigO>\log \log k</BigO> time and space. Here <M>k</M>
        {" "}
        is the number of stack operations done before the catenation. All the
        resource bounds are amortized over the sequence of operations.
      </P>
    ),
  },
  {
    item: `@article{aggarwal1988input,
      title={The input/output complexity of sorting and related problems},
      author={Aggarwal, Alok and Vitter, Jeffrey, S},
      journal={Communications of the ACM},
      volume={31},
      number={9},
      pages={1116--1127},
      year={1988},
      publisher={ACM New York, NY, USA}
    } 
`,
    asset: ["references", "aggarwal1988input.pdf"],
    blurb: (
      <>
        <P>
          We provide tight upper and lower bounds, up to a constant factor, for
          the number of inputs and outputs (I/OS) between internal memory and
          secondary storage required for five sorting-related problems: sorting,
          the fast Fourier transform (FFT), permutation networks, permuting, and
          matrix transposition. The bounds hold both in the worst case and in
          the average case, and in several situations the constant factors
          match. Secondary storage is modeled as a magnetic disk capable of
          transferring <M>P</M> blocks each containing <M>B</M>{" "}
          records in a single time unit; the records in each block must be input
          from or output to <M>B</M>{" "}
          contiguous locations on the disk. We give two optimal algorithms for
          the problems, which are variants of merge sorting and distribution
          sorting. In particular we show for <M>P = 1</M>{" "}
          that the standard merge sorting algorithm is an optimal external
          sorting method, up to a constant factor in the number of I/Os. Our
          sorting algorithms use the same number of I/Os as does the permutation
          phase of key sorting, except when the internal memory size is
          extremely small, thus affirming the popular adage that key sorting is
          not faster. We also give a simpler and more direct derivation of Hong
          and Kung's lower bound for the FFT for the special case{" "}
          <M>
            B = P = <Mathcal>O</Mathcal>(1)
          </M>.
        </P>
      </>
    ),
  },
  {
    item: `@inproceedings{frigo1999cache,
      title={Cache-oblivious algorithms},
      author={Frigo, Matteo and Leiserson, Charles E and Prokop, Harald and Ramachandran, Sridhar},
      booktitle={40th Annual Symposium on Foundations of Computer Science (Cat. No. 99CB37039)},
      pages={285--297},
      year={1999},
      organization={IEEE}
    }  
`,
    asset: ["references", "frigo1999cache.pdf"],
    blurb: (
      <>
        <P>
          This paper presents asymptotically optimal algorithms for rectangular
          matrix transpose, fast Fourier transform (FFT), and sorting on
          computers with multiple levels of caching. Unlike previous optimal
          algorithms, these algorithms are{" "}
          <Em>cache oblivious</Em>: no variables dependent on hardware
          parameters, such as cache size and cache-line length, need to be tuned
          to achieve optimality. Nevertheless, these algorithms use an optimal
          amount of work and move data optimally among multiple levels of cache.
          For a cache with size{" "}
          <M>
            <Mathcal>M</Mathcal>
          </M>{" "}
          and cache-line length{" "}
          <M>
            <Mathcal>B</Mathcal>
          </M>{" "}
          where{" "}
          <M>
            <Mathcal>M</Mathcal> ={" "}
            <BigOmega>
              <Mathcal>B</Mathcal>^2
            </BigOmega>
          </M>{" "}
          the number of cache misses for an <M>m \times n</M>{" "}
          matrix transpose is{" "}
          <BigTheta>
            1 + m n / <Mathcal>B</Mathcal>
          </BigTheta>. The number of cache misses for either an{" "}
          <M>n</M>-point FFT or the sorting of <M>n</M> numbers is{" "}
          <BigTheta>
            1 + (n/<Mathcal>B</Mathcal>)(1 + \log_<Curly>
              <Mathcal>M</Mathcal>
            </Curly>n)
          </BigTheta>. We also give a{" "}
          <BigTheta>mnp</BigTheta>-work algorithm to multiply an{" "}
          <M>m \times n</M> matrix by an <M>n \times p</M> matrix that incurs
          {" "}
          <BigTheta>
            1 + (mn + np + mp)/<Mathcal>B</Mathcal>{" "}
            + mnp/<Mathcal>B</Mathcal>\sqrt<Curly>
              <Mathcal>M</Mathcal>
            </Curly>
          </BigTheta>{" "}
          cache faults.
        </P>
        <P>
          We introduce an “ideal-cache” model to analyze our algorithms. We
          prove that an optimal cache-oblivious algorithm designed for two
          levels of memory is also optimal for multiple levels and that the
          assumption of optimal replacement in the ideal-cache model can be
          simulated efficiently by LRU replacement. We offer empirical evidence
          that cache-oblivious algorithms perform well in practice.
        </P>
      </>
    ),
  },
  {
    item: `@inproceedings{golovin2009b,
      title={B-treaps: A uniquely represented alternative to B-trees},
      author={Golovin, Daniel},
      booktitle={International Colloquium on Automata, Languages, and Programming},
      pages={487--499},
      year={2009},
      organization={Springer}
    } 
`,
    asset: ["references", "golovin2009b.pdf"],
    blurb: (
      <P>
        We present the first uniquely represented data structure for an external
        memory model of computation, a B-tree analogue called a{" "}
        <I>B-treap</I>. Uniquely represented data structures represent each
        logical state with a unique machine state. Such data structures are{" "}
        <I>strongly history-independent</I>; they reveal no information about
        the historical sequence of operations that led to the current logical
        state. For example, a uniquely represented file-system would support the
        deletion of a file in a way that, in a strong information-theoretic
        sense, provably removes all evidence that the file ever existed. Like
        the B-tree, the B-treap has depth{" "}
        <BigO>
          \log_<Curly>B</Curly>n
        </BigO>, uses linear space with high probability, where <M>B</M>{" "}
        is the block transfer size of the external memory, and supports
        efficient one-dimensional range queries.
      </P>
    ),
  },
  {
    item: `@article{golovin2010b,
      title={The B-skip-list: A simpler uniquely represented alternative to B-trees},
      author={Golovin, Daniel},
      journal={arXiv preprint arXiv:1005.0662},
      year={2010}
    }
`,
    asset: ["references", "golovin2010b.pdf"],
    blurb: (
      <>
        <P>
          In previous work, the author introduced the{" "}
          <I>B-treap</I>, a uniquely represented B-tree analogue, and proved
          strong performance guarantees for it. However, the B-treap maintains
          complex invariants and is very complex to implement. In this paper we
          introduce the{" "}
          <I>B-skip-list</I>, which has most of the guarantees of the B-treap,
          but is vastly simpler and easier to implement. Like the B-treap, the
          B-skip-list may be used to construct{" "}
          <I>strongly history-independent</I>{" "}
          index structures and filesystems; such constructions reveal no
          information about the historical sequence of operations that led to
          the current logical state. For example, a uniquely represented
          filesystem would support the deletion of a file in a way that, in a
          strong information-theoretic sense, provably removes all evidence that
          the file ever existed.
        </P>
        <P>
          Like the B-tree, the B-skip-list has depth{" "}
          <BigO>
            \log_<Curly>B</Curly>n
          </BigO>{" "}
          where <M>B</M>{" "}
          is the block transfer size of the external memory, uses linear space
          with high probability, and supports efficient one-dimensional range
          queries.
        </P>
      </>
    ),
  },
  {
    item: `@article{safavi2023b,
      title={B-Treaps Revised: Write Efficient Randomized Block Search Trees with High Load},
      author={Safavi, Roodabeh and Seybold, Martin P},
      journal={arXiv preprint arXiv:2303.04722},
      year={2023}
    }
`,
    asset: ["references", "safavi2023b.pdf"],
    blurb: (
      <>
        <P>
          Uniquely represented data structures represent each logical state with
          a unique storage state. We study the problem of maintaining a dynamic
          set of <M>n</M> keys from a totally ordered universe in this context.
        </P>
        <P>
          We introduce a two-layer data structure called{" "}
          <M>(\alpha, \epsilon)</M>-Randomized Block Search Tree (RBST) that is
          uniquely represented and suitable for external memory. Though RBSTs
          naturally generalize the well-known binary Treaps, several new ideas
          are needed to analyze the <I>expected</I>{" "}
          search, update, and storage, efficiency in terms of block-reads,
          block-writes, and blocks stored. We prove that searches have{" "}
          <BigO>
            \epsilon^<Curly>-1</Curly> + \log_<Curly>\alpha</Curly>n
          </BigO>{" "}
          block-reads, that{" "}
          <M>(\alpha, \epsilon)</M>-RBSTs have an asymptotic load-factor of at
          least
          <M>(1 - \epsilon)</M> for every <M post=",">\epsilon \in (0, 1/2]</M>
          {" "}
          and that dynamic updates perform{" "}
          <BigO>
            \epsilon^<Curly>-1</Curly> + \log_<Curly>\alpha</Curly>(n)/\alpha
          </BigO>{" "}
          block-writes, i.e. <BigO>1/\epsilon</BigO> writes if{" "}
          <M post=".">
            \alpha ={" "}
            <BigOmega>
              <MFrac de="\log n" num="\log \log n" />
            </BigOmega>
          </M>{" "}
          Thus{" "}
          <M>(\alpha, \epsilon)</M>-RBSTs provide improved search, storage-, and
          write-efficiency bounds in regard to the known, uniquely represented
          {" "}
          <A href="https://link.springer.com/chapter/10.1007/978-3-642-02927-1_41">
            B-Treap
          </A>.
        </P>
      </>
    ),
  },
  {
    item: `@inproceedings{bender2016anti,
      title={Anti-persistence on persistent storage: History-independent sparse tables and dictionaries},
      author={Bender, Michael A and Berry, Jonathan W and Johnson, Rob and Kroeger, Thomas M and McCauley, Samuel and Phillips, Cynthia A and Simon, Bertrand and Singh, Shikha and Zage, David},
      booktitle={Proceedings of the 35th ACM SIGMOD-SIGACT-SIGAI Symposium on Principles of Database Systems},
      pages={289--302},
      year={2016}
    }
`,
    asset: ["references", "bender2016anti.pdf"],
    blurb: (
      <>
        <P>
          We present history-independent alternatives to a B-tree, the primary
          indexing data structure used in databases. A data structure is history
          independent (HI) if it is impossible to deduce any information by
          examining the bit representation of the data structure that is not
          already available through the API.
        </P>
        <P>
          We show how to build a history-independent cache-oblivious B-tree and
          a history-independent external-memory skip list. One of the main
          contributions is a data structure we build on the way—a
          history-independent packed-memory array (PMA). The PMA sup- ports
          efficient range queries, one of the most important operations for
          answering database queries.
        </P>
        <P>
          ...
        </P>
      </>
    ),
  },
  {
    item: `@book{forbes2011statistical,
      title={Statistical distributions},
      author={Forbes, Catherine and Evans, Merran and Hastings, Nicholas and Peacock, Brian},
      year={2011},
      publisher={John Wiley \& Sons}
    }
`,
    href: "https://link.springer.com/book/10.1007/1-84628-168-7",
  },
  {
    item: `@inproceedings{blelloch2016just,
      title={Just join for parallel ordered sets},
      author={Blelloch, Guy E and Ferizovic, Daniel and Sun, Yihan},
      booktitle={Proceedings of the 28th ACM Symposium on Parallelism in Algorithms and Architectures},
      pages={253--264},
      year={2016}
    }
`,
    asset: ["references", "blelloch2016just.pdf"],
    blurb: (
      <>
        <P>
          Ordered sets (and maps when data is associated with each key)
          are one of the most important and useful data types. The set-set
          functions union, intersection and difference are particularly useful
          in certain applications. Brown and Tarjan first described an algorithm
          for these functions, based on 2-3 trees, that meet the optimal <BigTheta>m \log(<MFrac num="n" de="m"/> + 1)</BigTheta>
          time bounds in the comparison model (<M>n</M> and
          <M>m ≤ n</M> are the input sizes). Later Adams showed very elegant
          algorithms for the functions, and others, based on weight-balanced
          trees. They only require a single function that is specific to the
          balancing scheme—a function that joins two balanced trees—and
          hence can be applied to other balancing schemes. Furthermore the
          algorithms are naturally parallel. However, in the twenty-four years
          since, no one has shown that the algorithms, sequential or parallel
          are asymptotically work optimal.
        </P>
        <P>
          In this paper we show that Adams’ algorithms are both work
          efficient and highly parallel (polylog span) across four different
          balancing schemes—AVL trees, red-black trees, weight balanced
          trees and treaps. To do this we use careful, but simple, algorithms
          for JOIN that maintain certain invariants, and our proof is (mostly)
          generic across the schemes.
        </P>
        <P>
          To understand how the algorithms perform in practice we have
          also implemented them (all code except JOIN is generic across the
          balancing schemes). Interestingly the implementations on all four
          balancing schemes and three set functions perform similarly in time
          and speedup (more than 45x on 64 cores). We also compare the
          performance of our implementation to other existing libraries and
          algorithms.
        </P>
      </>
    ),
  },
  {
    item: `@article{eisenberg2008expectation,
      title={On the expectation of the maximum of IID geometric random variables},
      author={Eisenberg, Bennett},
      journal={Statistics \& Probability Letters},
      volume={78},
      number={2},
      pages={135--143},
      year={2008},
      publisher={Elsevier}
    }
`,
    asset: ["references", "eisenberg2008expectation.pdf"],
    blurb: (
      <>
        <P>
        A study of the expected value of the maximum of independent,
        identically distributed (IID) geometric random variables is
        presented based on the Fourier analysis of the distribution
        of the fractional part of the maximum of corresponding IID
        exponential random variables.
        </P>
      </>
    ),
  },
  {
    item: `@article{archibald2006number,
      title         = {The number of distinct values in a geometrically distributed sample},
      journal       = {European Journal of Combinatorics},
      volume        = {27},
      number        = {7},
      pages         = {1059--1081},
      year          = {2006},
      note          = {Eurocomb '03 - Graphs and Combinatorial Structures},
      issn          = {0195-6698},
      doi           = {\\url{https://doi.org/10.1016/j.ejc.2006.06.007}},
      url           = {\\url{https://www.sciencedirect.com/science/article/pii/S019566980600103X}},
      author        = {Margaret Archibald and Arnold Knopfmacher and Helmut Prodinger},
    }
`,
    asset: ["references", "archibald2006number.pdf"],
    blurb: (
      <P>
        For words of length n, generated by independent geometric
        random variables, we consider the average and variance of
        the number of distinct values (=letters) that occur in the
        word. We then generalise this to the number of values which
        occur at least  times in the word.
      </P>
    ),
  },
  {
    item: `@article{szpankowski1990yet,
      title={Yet another application of a binomial recurrence. Order statistics},
      author={Szpankowski, Wojciech and Rego, Vernon},
      journal={Computing},
      volume={43},
      number={4},
      pages={401--410},
      year={1990},
      publisher={Springer}
    }
`,
    asset: ["references", "szpankowski1990yet.pdf"],
    href: "https://link.springer.com/article/10.1007/BF02241658",
    blurb: (
      <P>
        We investigate the moments of the maximum of a set of i.i.d geometric
        random variables. Computationally, the exact formula for the moments
        (which does not seem to be available in the literature) is inhibited
        by the presence of an alternating sum. A recursive expression for the
        moments is shown to be superior. However, the recursion can be both
        computationally intensive as well as subject to large round-off error
        when the set of random variables is large, due to the presence of
        factorial terms. To get around this difficulty we develop accurate
        asymptotic expressions for the moments and verify our results
        numerically.
      </P>
    )
  },
  {
    item: `@article{comer1979ubiquitous,
      title={The Ubiquitous B-tree},
      author={Comer, Douglas},
      journal={ACM Computing Surveys (CSUR)},
      volume={11},
      number={2},
      pages={121--137},
      year={1979},
      publisher={ACM New York, NY, USA}
    }
`,
    asset: ["references", "comer1979ubiquitous.pdf"],
    blurb: (
      <>
        <P>
          B-trees have become, de facto, a standard for file organization. File indexes of users,
          dedicated database systems, and general-purpose access methods have all been proposed
          and implemented using B-trees. This paper reviews B-trees and shows why they have
          been so successful. It discusses the major variations of the B-tree, especially the B<Sup>+</Sup>-tree,
          contrasting the relative merits and costs of each implementation. It illustrates a general
          purpose access method which uses a B-tree.
        </P>
      </>
    ),
  },
  {
    item: `@inbook{dubhashiChernoff2009,
      place={Cambridge},
      title={Chernoff–Hoeffding Bounds},
      booktitle={Concentration of Measure for the Analysis of Randomized Algorithms},
      publisher={Cambridge University Press},
      author={Dubhashi, Devdatt P. and Panconesi, Alessandro},
      year={2009},
      pages={1–15}
    }
`,
    // A free, older version is available here http://wwwusers.di.uniroma1.it/~ale/Papers/master.pdf
    href: "https://doi.org/10.1017/CBO9780511581274",
    blurb: (
      <P>
        Randomized algorithms have become a central part of the algorithms curriculum, based on 
        their increasingly widespread use in modern applications. This book presents a coherent 
        and unified treatment of probabilistic techniques for obtaining high probability estimates 
        on the performance of randomized algorithms. It covers the basic toolkit from the
        Chernoff–Hoeffding bounds to more sophisticated techniques like martingales and
        isoperimetric inequalities, as well as some recent developments like Talagrand's
        inequality, transportation cost inequalities and log-Sobolev inequalities. Along the way,
        variations on the basic theme are examined, such as Chernoff–Hoeffding bounds in dependent
        settings. The authors emphasise comparative study of the different methods, highlighting
        respective strengths and weaknesses in concrete example applications. The exposition is
        tailored to discrete settings sufficient for the analysis of algorithms, avoiding
        unnecessary measure-theoretic details, thus making the book accessible to computer
        scientists as well as probabilists and discrete mathematicians.
      </P>
    )
  }
];
