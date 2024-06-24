use std::cmp::Ordering;
use std::collections::BTreeMap;

use rand::prelude::random;
use rand_distr::{Distribution, Geometric, Standard};

enum Node<T> {
    Empty,
    NonEmpty {
        item: T,
        left: Box<Self>,
        right: Box<Self>,
    },
}

fn compute_height<T>(t: &Node<T>) -> usize {
    match t {
        Node::Empty => return 0,
        Node::NonEmpty {
            item: _,
            left,
            right,
        } => {
            return 1 + std::cmp::max(compute_height(left), compute_height(right));
        }
    }
}

// insert into a tree without balancing
fn insert_no_balance<T: Ord>(t: &mut Node<T>, new_item: T) {
    match t {
        Node::Empty => {
            *t = Node::NonEmpty {
                item: new_item,
                left: Box::new(Node::Empty),
                right: Box::new(Node::Empty),
            }
        }
        Node::NonEmpty { item, left, right } => {
            if *item > new_item {
                return insert_no_balance(left, new_item);
            } else if item == &new_item {
                // nothing to do
            } else {
                return insert_no_balance(right, new_item);
            }
        }
    }
}

fn random_ziptree_of_size<T: Clone + Ord>(n: usize) -> Node<T>
where
    Standard: Distribution<T>,
{
    let mut items = vec![];
    let geo = Geometric::new(0.5).unwrap();

    // Generate n items of geometrically distributed ranks.
    for _ in 0..n {
        let key: T = random();
        let rank = geo.sample(&mut rand::thread_rng()) as u8;

        items.push((key, rank));
    }

    // Sort descending by rank, placing items with lesser item earlier if ranks are equal.
    items.sort_by(|(item1, rank1), (item2, rank2)| {
        match rank2.cmp(rank1) {
            Ordering::Equal => return item1.cmp(item2),
            _ => return rank2.cmp(rank1), // The unintuitive ordering results in *descending* sorting.
        }
    });

    // To convince the observer that ranks are distributed correctly, aggregate and print rank statistics.
    let mut ranks: BTreeMap<u8, usize> = BTreeMap::new(); // map ranks to their multiplicity
    for (_item, rank) in items.iter() {
        match ranks.get(rank) {
            None => ranks.insert(*rank, 1),
            Some(prev) => ranks.insert(*rank, prev + 1),
        };
    }
    // Uncomment the line below to print distributino statistics. Spoiler: they are fine.
    // println!("Rank distribution:\n{:#?}", ranks);

    // Insert items in the sorted order without rebalancing; this yields the zip tree.
    let mut tree = Node::Empty;
    for (item, _rank) in items {
        insert_no_balance(&mut tree, item);
    }

    return tree;
}

pub fn main() {
    for n in [10, 100, 1000, 10_000, 100_000, 1_000_000] {
        println!("Item count: {:#?}\n===================", n);
        let tree: Node<u64> = random_ziptree_of_size(n);
        let height = compute_height(&tree);
        let claimed = 1.5 * (n as f64).ln();
        println!("Height: {:#?}", height);
        println!("(3/2) ln (n): {:#?}", claimed);
        println!(
            "Height / ((3/2) ln (n)): {:#?}\n\n\n",
            (height as f64) / claimed
        );
    }
}
