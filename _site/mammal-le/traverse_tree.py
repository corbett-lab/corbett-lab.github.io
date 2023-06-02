import sys
import string
from io import StringIO
from Bio import Phylo

from ete3 import Tree
import re

#How to play: enter scientific name of mammal, in snake_case

#File of each leaf name in time tree, seperated by spaces
taxa_names = open("tree_data/4705_mammal.taxa").read()

#gets first leaf name in time tree that contains the given string
def get_true_taxa_name(s):
		first_instance = taxa_names.find(s)
		start = taxa_names.rindex(" ", 0, first_instance)
		end = taxa_names.find(" ", first_instance)
		return taxa_names[start+1: end]


# This is the answer, dont look
true_taxa0 = get_true_taxa_name("vulpes_vulpes")




#time tree
newick_string = open("tree_data/4705_mammal.newick").read()

tree = Tree(newick_string, format=1) #make into ete3 tree
leaf1 = tree.search_nodes(name=true_taxa0)[0] # answer node


distance = 100000

while distance > 0:
	name = input() #get a guess

	guess_taxa = get_true_taxa_name(name) #get actual node label

	leaf2 = tree.search_nodes(name=guess_taxa)[0] # grab guess node

	dist = leaf1.get_distance(leaf2) # hundreds of million years between both tips
	
	print(dist/2 * 100) # millions of years since their LCA lived


	if dist/2 * 100 < distance:
		distance = dist/2 * 100
	