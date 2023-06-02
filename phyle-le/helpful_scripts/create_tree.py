import sys
import string
from io import StringIO
from Bio import Phylo
from ete3 import Tree


# This script takes a list of animals

animal_list = open(sys.argv[1]).readlines()

full_tree_string = open("4705_mammal.newick").read()
taxa_names = open("4705_mammal.taxa").read()


# gets the name as it appears in the large tree
def get_true_taxa_name(s):
    first_instance = taxa_names.find(s)
    if first_instance == -1:
        return None

    start = taxa_names.rindex(" ", 0, first_instance)
    end = taxa_names.find(" ", first_instance)
    return taxa_names[start+1: end]


file_name = sys.argv[1].split('_')[0]

common_names = []
latin_names = []
full_names = []       #names as they appear in the tree


rejects = open("rejected_list", "w")

for i in range(len(animal_list)):
    com_name = animal_list[i].split(',')[0]
    lat_name = animal_list[i].split(',')[1].rstrip()
    full_name = get_true_taxa_name(lat_name)


    if full_name != None:
        common_names.append(com_name)
        latin_names.append(lat_name)
        full_names.append(full_name)
    else:
        rejects.writelines([animal_list[i]])


# First, I create a subtree 
Subtree = Tree(full_tree_string, format=1)
Subtree.prune(full_names, preserve_branch_length=True)



print("var "+file_name+"_display_names = [", end='')
for i in range(len(common_names)):
    display_name = common_names[i] + ", "
    scientific_name = latin_names[i].split('_')
    scientific_name[0] = scientific_name[0].capitalize()
    for e in scientific_name:
        display_name += e + " "
    display_name = display_name[:-1]

    print("'"+display_name+"',", end='')
print('];')
print("var "+file_name+"_leaf_names = [", end='')
for i in full_names:
    print("'"+i+"',", end='')
print('];')
print("var "+file_name+"_newickTree = '"+ Subtree.write(format=5) + "';")



