import json
import random
from string import ascii_letters
from fastDamerauLevenshtein import damerauLevenshtein as lev

MAX_LEV_DISTANCE = 1
DESTINATION_DATA = json.load(open('destinations.json', encoding='utf-8'))
DESTINATION_NAMES = []
for destination in DESTINATION_DATA:
    if 'term' in destination:
        DESTINATION_NAMES.append(destination['term'].lower())


def get_random_destination():
    return DESTINATION_NAMES[random.randrange(0, len(DESTINATION_NAMES))]


def get_random_substring(word):
    min_end_idx = min(3, len(word))
    end_idx = random.randrange(min_end_idx, len(word))
    return word[0: end_idx]


def mutate_string(substring):
    mutations = random.randint(1, 3)
    newstring = substring
    for m in range(mutations):
        mutation_idx = random.randrange(0, len(newstring))
        if newstring[mutation_idx] != ' ':
            newstring = newstring[0:mutation_idx] + random.choice(ascii_letters) + newstring[mutation_idx + 1:len(substring)]
    return newstring


def generate_test_input():
    random_dest = get_random_destination()
    substring = get_random_substring(random_dest)
    mutated = mutate_string(substring)
    return mutated


def validate_test_input(test_input):
    test_input = test_input.lower().replace(',', '')
    terms = test_input.split(' ')
    for term in terms:
        for destination_name in DESTINATION_NAMES:
            if validate_lev_distance(term, destination_name):
                print(destination_name)
                return True
    return False


def validate_lev_distance(input_string, output_string):
    if input_string == output_string:
        return True
    # if input string is substring of output
    for i in range(0, len(output_string) - len(input_string) + 1):
        if lev(input_string, output_string[i:i + len(input_string)], False) <= MAX_LEV_DISTANCE:
            return True
    return False


def validate_test_result(input_string, output_strings):
    input_string = input_string.lower().replace(',', '')
    terms = input_string.split(' ')
    for output in output_strings:
        for term in terms:
            if validate_lev_distance(term, output.lower()):
                return True
    return False

#
# assert not validate_test_input("meysaie")
# assert not validate_test_input('caxboBeraw')
# assert not validate_test_input('shJkiQ')