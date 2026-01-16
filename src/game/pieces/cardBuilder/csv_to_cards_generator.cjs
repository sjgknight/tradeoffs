// run by 'node file.js'
const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

// Read principles CSV
function readPrinciples(principlesPath) {
    const content = fs.readFileSync(principlesPath, 'utf-8');
    const records = csv.parse(content, {
        columns: ['id', 'name', 'description'],
        skip_empty_lines: true,
        from_line: 2 // Skip header
    });

    const principles = new Map();
    records.forEach((record) => {
        principles.set(parseInt(record.id), {
            id: parseInt(record.id),
            name: record.name,
            description: record.description
        });
    });
    return principles;
}

// Write principles.json
function writePrinciplesJson(principles, outputDir) {
    const obj = Object.fromEntries(
        Array.from(principles.entries()).map(([id, p]) => [
            id,
            {
                id: p.id,
                name: p.name,
                description: p.description
            }
        ])
    );

    const outPath = path.join(outputDir, 'principles.json');
    fs.writeFileSync(outPath, JSON.stringify(obj, null, 2), 'utf-8');
    console.log('✓ principles.json');

    return obj;
}


// Read cards CSV
function readCards(cardsPath) {
    const content = fs.readFileSync(cardsPath, 'utf-8');
    const records = csv.parse(content, {
        columns: true,
        skip_empty_lines: true
    });

    return records;
}

// Build a map of card IDs to card names for linked-cards lookup
function buildCardIdMap(cards) {
    const idMap = new Map();
    cards.forEach(card => {
        if (card.id) {
            idMap.set(card.id.toString(), card.name);
        }
    });
    return idMap;
}

// Resolve linked card IDs to names
function resolveLinkedCardIds(linkedCardIds, cardIdMap) {
    if (!linkedCardIds || linkedCardIds === 'NA' || linkedCardIds === '') return [];
    return linkedCardIds
        .split(',')
        .map(id => id.trim())
        .filter(id => id)
        .map(id => cardIdMap.get(id) || id);
}

// Parse principle columns from row
function parsePrinciples(row, principles, cardType) {
    const result = [];

    principles.forEach((principle, id) => {
        const columnName = `principle${id}`;
        const value = (row[columnName] || '').trim();

        if (value && value !== 'NA' && value !== '') {
            const numValue = parseInt(value);
            if (!isNaN(numValue)) {
                const entry = { principle: id, value: numValue };
                if (cardType === 'challenge') {
                    entry.name = principle.name;
                }
                result.push(entry);
            }
        }
    });

    return result;
}

// Generate class definition for each card type
function generateClassDefinition(className) {
    const definitions = {
        'StrategyCard': `    // Strategies represent actions/policies that can be deployed to address challenges
    // Each strategy has a cost and contributes different amounts to each principle
    name: string;
    type: string;
    cost: number;
    contribution: {
        principles: { principle?: string | number; value?: number }[];
    };`,
        'ChallengeCard': `    // Challenges represent problems or scenarios that need to be addressed in schools
    // They have points for completion and requirements that must be met across principles
    problem: string;
    points: number;
    impacting_events: string[];
    problem_detail: string;
    is_complete: boolean;
    requirements: {
        blocks: number;
        principles: { principle?: string | number; value?: number; name: string }[];
    };`,
        'EventCard': `    // Events represent scenarios, questions, or realizations that impact principle scores
    // They can be triggered by game decisions and affect the overall ethical landscape
    name: string;
    type: string;
    description: string;
    impact: {
        principle?: string | number; 
        value?: number;
    }[];`
    };
    
    return definitions[className] || '    // Class definition here';
}

// Generate strategy cards
function generateStrategyCards(rows, principles) {
    const cards = rows
        .filter(row => row.type.toLowerCase() === 'strategy')
        .map(row => ({
            name: row.name,
            type: 'regulate',
            cost: parseInt(row.value || '0') || 0,
            contribution: {
                principles: parsePrinciples(row, principles, 'strategy')
            }
        }));

    return generateTypeScriptFile('strategyCards', cards, 'StrategyCard');
}

// Generate challenge cards
function generateChallengeCards(rows, principles, cardIdMap) {
    const cards = rows
        .filter(row => row.type.toLowerCase() === 'challenge')
        .map(row => ({
            problem: row.name,
            points: parseInt(row.value || '0') || 0,
            impacting_events: resolveLinkedCardIds(row['linked-cards'] || '', cardIdMap),
            problem_detail: row.detail || '',
            is_complete: false,
            requirements: {
                blocks: 1,
                principles: parsePrinciples(row, principles, 'challenge')
            }
        }));

    return generateTypeScriptFile('challengeCards', cards, 'ChallengeCard');
}

// Generate event cards
function generateEventCards(rows, principles) {
    const cards = rows
        .filter(row => row.type.toLowerCase() === 'event')
        .map(row => ({
            name: row.name,
            type: 'event',
            description: row.detail || '',
            impact: parsePrinciples(row, principles, 'event')
        }));

    return generateTypeScriptFile('eventCards', cards, 'EventCard');
}

// Generate TypeScript file content
function generateTypeScriptFile(exportName, cards, className) {
    const classDefinition = generateClassDefinition(className);
    
    const cardStrings = cards.map(card => {
        const lines = ['    {'];
        
        Object.entries(card).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            
            if (typeof value === 'string') {
                lines.push(`        ${key}: ${JSON.stringify(value)},`);
            } else if (typeof value === 'number') {
                lines.push(`        ${key}: ${value},`);
            } else if (typeof value === 'boolean') {
                lines.push(`        ${key}: ${value},`);
            } else if (Array.isArray(value)) {
                if (value.length === 0) {
                    lines.push(`        ${key}: [],`);
                } else {
                    lines.push(`        ${key}: [`);
                    value.forEach((item, idx) => {
                        const isLast = idx === value.length - 1;
                        if (typeof item === 'object') {
                            lines.push(`            ${JSON.stringify(item)}${isLast ? '' : ','}`);
                        }
                    });
                    lines.push(`        ],`);
                }
            } else if (typeof value === 'object') {
                lines.push(`        ${key}: ${JSON.stringify(value, null, 12)},`);
            }
        });

        lines.push('    }');
        return lines.join('\n');
    });

    return `import { Piece } from '@boardzilla/core';
import { Tradeoffs } from '../index.ts';

export class ${className} extends Piece<Tradeoffs> {
${classDefinition}
}

export const ${exportName}: Partial<${className}>[] = [
${cardStrings.join(',\n')}
];
`;
}

// Main function
function main() {
    const principlesPath = process.argv[2] || './principles.csv';
    const cardsPath = process.argv[3] || './cards.csv';
    const outputDir = process.argv[4] || './output';

    // Validate input files exist
    if (!fs.existsSync(principlesPath)) {
        console.error(`Principles file not found: ${principlesPath}`);
        process.exit(1);
    }
    if (!fs.existsSync(cardsPath)) {
        console.error(`Cards file not found: ${cardsPath}`);
        process.exit(1);
    }

    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Read and parse input
    console.log('Reading principles...');
    const principles = readPrinciples(principlesPath);
    console.log(`Found ${principles.size} principles`);

    writePrinciplesJson(principles, outputDir);

    console.log('Reading cards...');
    const cards = readCards(cardsPath);
    console.log(`Found ${cards.length} cards`);
    
    // Build card ID map for resolving linked cards
    const cardIdMap = buildCardIdMap(cards);

    // Generate output files
    console.log('Generating TypeScript files...');
    
    const strategyOutput = generateStrategyCards(cards, principles);
    fs.writeFileSync(path.join(outputDir, 'strategyCards.ts'), strategyOutput);
    console.log('✓ strategyCards.ts');

    const challengeOutput = generateChallengeCards(cards, principles, cardIdMap);
    fs.writeFileSync(path.join(outputDir, 'challengeCards.ts'), challengeOutput);
    console.log('✓ challengeCards.ts');

    const eventOutput = generateEventCards(cards, principles);
    fs.writeFileSync(path.join(outputDir, 'eventCards.ts'), eventOutput);
    console.log('✓ eventCards.ts');

    console.log(`\nSuccess! Files written to ${outputDir}/`);
}

main();