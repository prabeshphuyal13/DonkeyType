const TYPING_TEST = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
    'it', 'for', 'not', 'on', 'with', 'he', 'As', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'My', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
    'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
    'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
    'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
    'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',

    'is', 'was', 'are', 'been', 'being', 'having', 'did', 'doing', 'had',
    'has', 'does', 'done', 'going', 'came', 'come', 'comes',
    'made', 'makes', 'making', 'said', 'says', 'saying', 'told', 'tells', 'telling',
    'asked', 'asks', 'asking', 'answered', 'answers', 'answering', 'felt', 'feels',
    'feeling', 'gave', 'gives', 'giving', 'found', 'finds', 'finding', 'went',

    'walk', 'walked', 'walking', 'run', 'ran', 'running', 'stand', 'stood',
    'standing', 'sit', 'sat', 'sitting', 'lie', 'lay', 'lying', 'rise', 'rose',
    'rising', 'fall', 'fell', 'falling', 'turn', 'turned', 'turning', 'stop',
    'stopped', 'stopping', 'start', 'started', 'starting', 'begin', 'began',
    'beginning', 'end', 'ended', 'ending', 'continue', 'continued', 'continuing',
    'help', 'helped', 'helping', 'need', 'needed', 'needing', 'wanted',
    'love', 'loved', 'loving', 'hate', 'hated', 'hating', 'enjoy', 'enjoyed', 'enjoying',
    'learn', 'learned', 'learning', 'teach', 'taught', 'teaching', 'knew',

    'may', 'might', 'must', 'Should', 'could', 'let', 'put', 'right', 'call',
    'hand', 'part', 'tell', 'boy', 'follow', 'want', 'show', 'around',
    'form', 'three', 'small', 'set', 'end', 'another', 'large',
    'big', 'such', 'here', 'why', 'ask', 'men', 'read',
    'land', 'different', 'home', 'move', 'try', 'kind',

    'abandon', 'ability', 'able', 'above', 'absent', 'absolute', 'absorb', 'abstract', 'absurd', 'abuse',
    'access', 'accident', 'account', 'accuse', 'achieve', 'acid', 'acoustic', 'acquire', 'across', 'act',
    'action', 'actor', 'actual', 'acute', 'adapt', 'add', 'addict', 'addition', 'address', 'adjust',
    'admire', 'admit', 'adopt', 'adore', 'adorn', 'adult', 'advance', 'advice', 'aerobic', 'affair',
    'afford', 'afraid', 'again', 'age', 'agency', 'agenda', 'agent', 'agile', 'agony', 'agree',
    'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album', 'alcohol', 'alert', 'alien',
    'align', 'alike', 'alive', 'alley', 'alliance', 'allied', 'allocate', 'allot', 'allow', 'alloy',
    'allure', 'ally', 'almanac', 'almighty', 'almost', 'alone', 'along', 'aloof', 'aloud', 'alpha',
    'already', 'altar', 'alter', 'always', 'amateur', 'amaze', 'ambiguous', 'ambition', 'ambush', 'amen',
    'amend', 'america', 'amicable', 'amid', 'amidst', 'amiss', 'ammo', 'ammonia', 'among', 'amount',
    'amuse', 'analyst', 'anchor', 'ancient', 'android', 'anew', 'angel', 'anger', 'angle', 'angry',
    'animal', 'ankle', 'annex', 'announce', 'annoy', 'annual', 'another', 'answer', 'antenna', 'antique',
    'anxiety', 'anxious', 'apart', 'apathy', 'apex', 'apology', 'appeal', 'appear', 'appease', 'append',
    'apple', 'appliance', 'apply', 'appoint', 'appraise', 'appreciate', 'apprehend', 'apprentice', 'approach', 'appropriate',
    'approve', 'april', 'apron', 'apt', 'aqua', 'aquarium', 'aquarius', 'arabic', 'arbiter', 'arbitrary',
    'arbor', 'arcade', 'arch', 'archer', 'archery', 'architect', 'arctic', 'ardent', 'ardor', 'arduous',

    'While', 'since', 'although', 'unless', 'until', 'whether', 'so', 'That',
    'before', 'after', 'during', 'Above', 'below', 'under', 'over', 'between', 'among',
    'through', 'Toward', 'into', 'onto', 'upon', 'within', 'Without', 'beside', 'behind',
    'around', 'across', 'against', 'instead', 'Except', 'minus', 'plus', 'like', 'Unlike',
    'ever', 'never', 'always', 'usually', 'often', 'Sometimes', 'rarely', 'seldom', 'generally',
    'quickly', 'Slowly', 'carefully', 'easily', 'loudly', 'softly', 'Happily', 'sadly', 'angrily',
    'there', 'Here', 'everywhere', 'nowhere', 'somewhere', 'anywhere', 'Home', 'away', 'back',
    'Whose', 'whom', 'which', 'what', 'where', 'when', 'why', 'how', 'However',
    'myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'Yourselves', 'themselves',
    'each', 'every', 'either', 'Neither', 'both', 'few', 'many', 'much', 'more', 'Most',

    'sing', 'sang', 'sung', 'Write', 'wrote', 'written', 'drive', 'drove', 'driven',
    'eat', 'ate', 'eaten', 'sleep', 'slept', 'Sleeping', 'drink', 'drank', 'drunk',
    'teach', 'Taught', 'teaching', 'buy', 'bought', 'Buying', 'catch', 'caught', 'Catching',

    'Zealous', 'zip', 'zebra', 'zoom', 'Zone', 'zest',
    'Yawn', 'Yacht', 'youth', 'yearly', 'Yield', 'yesterday',
    'Xenon', 'xylophone', 'x-ray', 'Xmas', 'xerox',
    'Vivid', 'vacant', 'Valid', 'value', 'vanish', 'Vanish', 'vast', 'vault', 'Vegetable', 'vehicle',
    'unite', 'Union', 'unique', 'unit', 'Universal', 'unknown', 'Ugly', 'ultimate', 'Umbrella', 'undergo',
    'Tremble', 'trade', 'traffic', 'Tragedy', 'trail', 'train', 'transfer', 'Transform', 'transit', 'translate',
    'Success', 'sudden', 'Suffer', 'sugar', 'Suggest', 'suit', 'Summer', 'summit', 'Sun', 'superior',
    'Round', 'route', 'Routine', 'royal', 'rub', 'Rubber', 'rude', 'ruin', 'Rule', 'rumor',
    'Query', 'qualify', 'Quality', 'quantify', 'Quarter', 'queen', 'Quench', 'question', 'quick', 'Quietly',
    'Poem', 'Poet', 'poetry', 'point', 'Polar', 'policy', 'Polite', 'political', 'Poll', 'pool',
    'Occupation', 'ocean', 'Octopus', 'odd', 'Odor', 'offense', 'Offer', 'office', 'Oil', 'old',
    'Narrate', 'narrow', 'Nation', 'native', 'Natural', 'nausea', 'Navy', 'near', 'Nearly', 'neat',
    'Moment', 'money', 'Monitor', 'month', 'moon', 'Moral', 'moreover', 'Morning', 'mosquito', 'mother',
    'Jacket', 'Jar', 'jargon', 'Jazz', 'Jealous', 'jeans', 'Jewel', 'job', 'Join', 'joint',
    'Idea', 'ideal', 'identify', 'Identity', 'idiom', 'idle', 'Ignite', 'ignore', 'Illusion', 'image',
    'Habit', 'hair', 'Half', 'hall', 'Hammer', 'hamster', 'Handful', 'handle', 'Happen', 'happy',
    'Gentle', 'Genuine', 'geography', 'Getaway', 'ghost', 'Giant', 'gift', 'giggle', 'Girl', 'glance',
    'Faint', 'fair', 'Faith', 'fallacy', 'False', 'fame', 'Familiar', 'family', 'Famous', 'fan',
    'Eager', 'eagle', 'Ear', 'early', 'Earn', 'Earth', 'ease', 'Easily', 'east', 'Easy',
    'Defense', 'define', 'Defy', 'degree', 'Delay', 'delicate', 'Deliver', 'demand', 'Demonstrate', 'denial',
    'Calm', 'camera', 'Camp', 'canary', 'Cancel', 'candid', 'Candy', 'canyon', 'Capable', 'capacity',

    'absolute', 'Accomplish', 'accurate', 'Ache', 'acknowledge', 'acorn', 'Adamant', 'adequate', 'Admirable', 'adhere',
    'Adjacent', 'adjourn', 'admonish', 'Adopt', 'adroit', 'adulation', 'Advantage', 'advent', 'adversary', 'Aerial',
    'affect', 'Afflict', 'aggravate', 'Aggressive', 'agitate', 'ailment', 'Alacrity', 'allegiance', 'alleviate', 'Amazing',
    'Ample', 'analyze', 'Anarchy', 'anomaly', 'Antique', 'appall', 'Aptitude', 'arbitrate', 'Ardent', 'Arrange',
    'Ascend', 'Assert', 'assist', 'Astound', 'atmosphere', 'Attain', 'attic', 'Audacity', 'augment', 'Auspicious',
    'Authentic', 'authority', 'Avert', 'awkward', 'Backdrop', 'balcony', 'Baleful', 'bandit', 'Banquet', 'bargain',
    'Barren', 'basement', 'Bashful', 'behold', 'Benevolent', 'bewilder', 'Bias', 'Bliss', 'Boast', 'Brave',
    'Breach', 'Brittle', 'Brochure', 'Budget', 'Bulletin', 'Burden', 'Bustle', 'Calculate', 'Camouflage', 'Candidate',
    'Canyon', 'Capitol', 'Caprice', 'Capture', 'Carefree', 'Carnival', 'Catastrophe', 'Caution', 'Cease', 'Celestial',
    'Ceremony', 'Challenge', 'Chaotic', 'Character', 'Charm', 'Cherish', 'Chronic', 'Circulate', 'Claim', 'Clarity',

    'Daring', 'Dauntless', 'Decisive', 'Declined', 'Dedicate', 'Defeat', 'Deficient', 'Delight', 'Denounce', 'Depart',
    'Deposit', 'Desolate', 'Despair', 'Destiny', 'Determine', 'Devastate', 'Diligent', 'Disguise', 'Dismay', 'Disperse',
    'Distress', 'Diverse', 'Divulge', 'Domain', 'Doubtful', 'Dreary', 'Duration', 'Dwelling', 'Dynamic', 'Ecology',
    'Elaborate', 'Emerge', 'Empathy', 'Emphasize', 'Endeavor', 'Endure', 'Engage', 'Enigma', 'Enormous', 'Entice',
    'Episode', 'Equip', 'Eradicate', 'Erosion', 'Essential', 'Estuary', 'Eternal', 'Evacuate', 'Evident', 'Exaggerate',
    'Examine', 'Exceed', 'Exhaust', 'Exile', 'Exotic', 'Expedition', 'Explore', 'Exterior', 'Extinct', 'Extravagant',
    'Fable', 'Fabricate', 'Fabulous', 'Facility', 'Factor', 'Faculty', 'Fade', 'Failure', 'Fairness', 'Fascinate',
    'Fatal', 'Fatigue', 'Feasible', 'Feature', 'Fervent', 'Fiction', 'Fiery', 'Finance', 'Flourish', 'Forbid',

    'Gorgeous', 'Gradual', 'Gravity', 'Grim', 'Guilty', 'Harmony', 'Hasty', 'Hazard', 'Heated', 'Humble',
    'Imagine', 'Immerse', 'Impartial', 'Imply', 'Incline', 'Indulge', 'Inevitable', 'Influence', 'Inquire', 'Intense',
    'Journey', 'Jubilant', 'Justice', 'Keen', 'Labor', 'Languid', 'Legacy', 'Luminous', 'Magnify', 'Malice',
    'Manifest', 'Marvel', 'Mellow', 'Meticulous', 'Mystify', 'Negotiate', 'Nominate', 'Nourish', 'Obscure', 'Observe',
    'Offend', 'Oppress', 'Ornate', 'Outrage', 'Pacify', 'Partial', 'Patient', 'Penetrate', 'Perish', 'Pioneer',
    'Placid', 'Ponder', 'Precise', 'Predict', 'Prestige', 'Prevail', 'Prohibit', 'Propel', 'Prosper', 'Punctual',
    'Radiant', 'Recede', 'Reflect', 'Regret', 'Relish', 'Renounce', 'Reside', 'Resolve', 'Restore', 'Reveal',
    'Sacred', 'Sanctuary', 'Savor', 'Scrutinize', 'Serene', 'Shallow', 'Shatter', 'Shelter', 'Shimmer', 'Solitary',
    'Sovereign', 'Specify', 'Splendid', 'Subtle', 'Sustain', 'Tact', 'Terminate', 'Thriller', 'Tranquil', 'Triumph',
    'Vacillate', 'Vast', 'Venture', 'Vigilant', 'Wander', 'Warrant', 'Whirlwind', 'Wisdom', 'Yearn', 'Zany'
];

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const PUNCTUATION = [',', '.', '!', '?', ';', ':', '\'', '"', '-', '(', ')'];

const KEYBOARD_ROWS = {
    top: 'qwertyuiop',
    middle: 'asdfghjkl',
    bottom: 'zxcvbnm'
};

const PRACTICE_TEXTS = {
    middle: [
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['ad', 'as', 'ah', 'al', 'sad', 'had', 'lad', 'dad', 'fad'],
        ['ads', 'lads', 'dads', 'gal', 'fads', 'had', 'ash', 'ask', 'elf'],
        ['glad', 'flag', 'half', 'dash', 'gash', 'flash', 'hall', 'fall', 'lass'],
        ['ash;', 'half.', 'glad!', 'flash;', 'shall', 'flesh', 'gash.', 'flahs']
    ],
    upper: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['we', 'try', 'two', 'pot', 'top', 'wet', 'pet', 'toy', 'row'],
        ['wet', 'pet', 'row', 'try', 'top', 'tip', 'type', 'rope', 'wire'],
        ['type', 'rope', 'wire', 'pier', 'quit', 'trip', 'pour', 'yore', 'euro'],
        ['quip!', 'power.', 'type;', 'euro!', 'typed', 'query', 'trout;', 'poetry']
    ],
    lower: [
        ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        ['by', 'my', 'mix', 'box', 'numb', 'zero', 'buzz', 'next'],
        ['box', 'mix', 'max', 'zen', 'buzz', 'club', 'verb', 'zero', 'menu'],
        ['zone', 'buzz', 'club', 'verb', 'maze', 'next', 'buzz', 'custom', 'bronze'],
        ['buzz,', 'zone.', 'custom;', 'bronze!', 'nexus', 'enzyme', 'buzzer;', 'cubic,']
    ],
    num: [
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['01', '12', '23', '34', '45', '56', '67', '78', '89', '90'],
        ['123', '234', '345', '456', '567', '678', '789', '890', '901'],
        ['1234', '2345', '3456', '4567', '5678', '6789', '7890', '8901', '9012'],
        ['2023', '1987', '90-10', '50/50', '100-200', '2024', '1st-2nd', '5x5']
    ],
    special: [
        ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
        ['!@', '#$', '%^', '&*', '()', '!@#', '!@#$'],
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        ['Cat', 'Dog', 'Run', 'Jump', 'Happy', 'Quick', 'Speed', 'Type'],
        ['Speed!', 'Type@', 'Happy#', 'Run!', 'Quick&', 'Happy!', 'Yes!', 'No!']
    ],
    mixed: [
        ['a', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'],
        ['A', 'QUICK', 'BROWN', 'FOX', 'JUMPS', 'OVER', 'THE', 'LAZY', 'DOG'],
        ['Quick', 'brown', 'fox', 'jumps!', 'Over', 'the', 'lazy', 'dog.'],
        ['Type2024', 'Speed99', 'Fox!', 'Jump@', 'Test#1', 'Code&', 'Run$', 'Go%'],
        ['The quick brown fox jumps over the lazy dog!', 'Pack my box with five dozen liquor jugs.', 'Speed: 90 WPM!', 'Type @ home (2024)']
    ]
};
