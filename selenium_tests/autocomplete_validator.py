from fastDamerauLevenshtein import damerauLevenshtein as lev

MAX_LEV_DISTANCE = 2


def validate_autocomplete(input_string, output_strings):
    for output in output_strings:
        if not validate_lev_distance(input_string, output):
            return False
    return True


def validate_lev_distance(input_string, output_string):
    if input_string == output_string:
        return True
    # if input string is substring of output
    for i in range(0, len(output_string) - len(input_string)):
        if lev(input_string, output_string[i:i + len(input_string)], False) <= MAX_LEV_DISTANCE:
            return True
    # if output string is substring of input
    for i in range(0, len(input_string) - len(output_string)):
        if lev(output_string, input_string[i:i + len(output_string)], False) <= MAX_LEV_DISTANCE:
            return True
    return False


# print(lev('Singa', 'Signa'))
# print(validate_lev_distance('lif', 'Alif'))
# print(validate_lev_distance('Alif', 'lif'))
# print(validate_lev_distance('Alif', 'Aleefd'))
# print(validate_autocomplete('Alif', ['Alifd', 'lif']))
# print(lev('Singapore', 'Singapore, Singapore', False))
