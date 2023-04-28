#turn an input newick into a data.js file containing all necessary information for use with the phy-le game

from ete3 import Tree
import pandas as pd
import EcoNameTranslator as ent
from wordfreq import word_frequency
import argparse

parser = argparse.ArgumentParser(description='Process input newick and target file.')
parser.add_argument('-t','--newick', required=True, help='Input newick file.')
parser.add_argument('-o','--output_file', default='data.js', help='Location to write the javascript data.')
parser.add_argument('-n','--names', help='Optionally save the name table to a file.')
parser.add_argument('-p','--prefix',help='Set a prefix for the variables in the output data file. Default is "new"',default='new')
# parser.add_argument("--freq_cutoff",type=float,default=1e-6,help="Ignore names below this frequency.")
args = parser.parse_args()

et = Tree(args.newick,format=1)
lookup = {}
species = [s.name for s in et.get_leaves()]
for s in species:
    ll = ent.to_common([s])
    lookup.update(ll)

cdf = {k:[] for k in ['Scientific','Common']}
for science, common_names in lookup.items():
    for cn in common_names[1]:
        cdf['Scientific'].append(science)
        cdf['Common'].append(cn)
cdf = pd.DataFrame(cdf)

def get_mwf(words):
    freqs = []
    for w in words.split():
        freqs.append(word_frequency(w,'en'))
    return min(freqs)

def get_csw(words,freq_cutoff=1e-6):
    nwords = []
    keep_onwards = False
    skip = False
    for w in words.split():
        if word_frequency(w,'en') > freq_cutoff:
            keep_onwards = True
        if w[0] == '(':
            skip = True
        if keep_onwards and not skip:
            nwords.append(w)
        if w[-1] == ')' and skip:
            skip = False
    return " ".join(nwords)
    
#find the easiest names and clear the rest out
cdf['Min Word Freq'] = cdf.Common.apply(get_mwf)
cdf['Common Subwords'] = cdf.Common.apply(get_csw)
scdf = cdf.sort_values("Min Word Freq",ascending=False).drop_duplicates('Scientific').drop_duplicates("Common Subwords")

et.prune(scdf.Scientific,preserve_branch_length=True)
name_lookup = scdf[['Scientific','Common Subwords']].set_index("Scientific").to_dict()['Common Subwords']

#update the data.js file
snames = [l.name for l in et.get_leaves()]
cnames = [name_lookup.get(l,l) for l in snames]
with open(args.output_file,'w+') as of:
    print(f"var {args.prefix}_newickTree = '{et.write(format=1)}' ;",file=of)
    print(f"var {args.prefix}_leaf_names = {str(snames)} ;",file=of)
    print(f"var {args.prefix}_display_names = {str(cnames)} ;",file=of)

