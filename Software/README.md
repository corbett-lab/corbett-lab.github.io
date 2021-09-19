---
sort: 3
---
# Software  

## SELAM  
Simulation of Epistasis and Local adaptation during Admixture with Mate choice  
SELAM is a forward time population genetic simulation framework that can simulate admixture between any number of ancestral populations (or equivalently ancestral haplotypes). SELAM supports a variety of selective scenarios, complex demography and fully separate sexes. The paper describing this software is available here, and the manual and source code are available from GitHub.

## Ancestry_HMM  
This program is designed to circumvent a few issues with existing local ancestry inference methods. Specifically, this program can (1) explicitly model allele counts derived from NGS data (2) work on samples of any ploidy (3) simultaneously estimate local ancestry and the time of admixture. The paper has just been published in PLoS Genetics, and the code can be acquired here. 
This program can now estimate the timing of multiple admixture pulses. To find out more about modelling and fitting multiple pulses, read our paper in Genetics and visit our github.

## Ancestry_HMM-S  
This program is primarily the work of Corbett-Detig lab postdoc [Jesper Svedberg](https://corbett-lab.github.io/People/Current/jesper/). It builds on our local ancestry inference framework, Ancestry_HMM, and enables users to detect and quantify the strength of natural selection acting during admixture. You can read about the theoretical model we developed with our collaborators describing the expected ancestry tract length distribution during adaptive introgression here. Our preprint describing the inference method, Ancestry_HMM-S, is on bioRxiv. Software to perform these analyses and detailed installation instructions are available via github.

## [The UShER Software Suite](https://github.com/yatisht/usher)
The UShER suite is a family of programs for rapid phylogenetic analyses, particularly suitable for SARS-CoV-2 genomes and pandemic analysis and designed to work with the specialized MAT data format. We also maintain a repository of MAT files constructed from all publically available SARS-CoV-2 sequences, which can be found [here](http://hgdownload.soe.ucsc.edu/goldenPath/wuhCor1/UShER_SARS-CoV-2/). Much of this software was developed by [Yatish Turakhia](https://corbett-lab.github.io/People/Alumni/yatish/) when he was a postdoc with Russ. 

**UShER** itself is a program that rapidly places new samples onto an existing phylogeny using maximum parsimony. It is particularly helpful in understanding the relationships of newly sequenced SARS-CoV-2 genomes with each other and with previously sequenced genomes in a global phylogeny. This has emerged as an important challenge during the COVID-19 pandemic for enabling genomic contact tracing since the viral phylogeny is already very large (>3.5M sequences) and is expected to grow by many fold in the coming months. UShER is much faster than existing tools with similar functionality and has now also been integrated in the UCSC SARS-CoV-2 Genome Browser.

**matUtils** is a toolkit for querying, interpreting and manipulating the mutation-annotated trees (MATs). Using matUtils, common operations in SARS-CoV-2 genomic surveillance and contact tracing efforts, including annotating a MAT with new clades, extracting subtrees of the most closely-related samples, or converting the MAT to standard Newick or VCF format can be performed in a matter of seconds to minutes even on a laptop.

**matOptimize** is a program to rapidly and effectively optimize a mutation-annotated tree (MAT) for parsimony using subtree pruning and regrafting (SPR) moves within a user-defined radius.

**RIPPLES** is a program that uses a phylogenomic technique to rapidly and sensitively detect recombinant nodes and their ancestors in a mutation-annotated tree (MAT).

[**ShUShER**](https://github.com/amkram/shusher)is a browser tool for the use of UShER on private data. ShUShER was developed by [Alex Kramer](https://corbett-lab.github.io/People/Current/alex/). 

[Lab GitHub](https://github.com/corbett-lab)
