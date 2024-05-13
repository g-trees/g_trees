import { BibItemDeclaration } from "../deps.ts";

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
  },
];
