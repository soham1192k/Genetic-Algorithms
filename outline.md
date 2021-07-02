# Genetic Algorithm
## Setup
Step 1: Initialise: Create a population of N elements, rach with randomly generated DNA.
## Draw
Step 2: Selection: Evaluate the fitness of each element of the population and build a mating pool.

Step 3: Reproduction: Repeat N times:
    a. Pick two parents with probability according to their relative fitness.
    b. Crossover-create a child by combining the DNA of these two parents.
    c. Mutation-mutate the child's DNA based on a given probability.
    d. Add the child to the new population.

Step 4: Replace the old population with the new population and return to step 2 