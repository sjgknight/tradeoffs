import { Piece } from '@boardzilla/core';
import { Tradeoffs } from '../index.ts';

export class StrategyCard extends Piece<Tradeoffs> {
    // Strategies represent actions/policies that can be deployed to address challenges
    // Each strategy has a cost and contributes different amounts to each principle
    name: string;
    type: string;
    cost: number;
    contribution: {
        principles: { principle?: string | number; value?: number }[];
    };
}

export const strategyCards: Partial<StrategyCard>[] = [
    {
        name: "Develop guidelines",
        type: "regulate",
        cost: 1,
        contribution: {
          "principles": [
                    {
                              "principle": 1,
                              "value": 1
                    },
                    {
                              "principle": 2,
                              "value": 1
                    },
                    {
                              "principle": 3,
                              "value": 1
                    },
                    {
                              "principle": 4,
                              "value": 1
                    },
                    {
                              "principle": 5,
                              "value": 1
                    }
          ]
},
    },
    {
        name: "Ban some uses of or types of AI",
        type: "regulate",
        cost: 1,
        contribution: {
          "principles": [
                    {
                              "principle": 1,
                              "value": 1
                    },
                    {
                              "principle": 2,
                              "value": 1
                    },
                    {
                              "principle": 3,
                              "value": 1
                    },
                    {
                              "principle": 4,
                              "value": 1
                    },
                    {
                              "principle": 5,
                              "value": 1
                    }
          ]
},
    },
    {
        name: "Provide learning opportunities for teachers / students / school leaders",
        type: "regulate",
        cost: 2,
        contribution: {
          "principles": [
                    {
                              "principle": 1,
                              "value": 0
                    },
                    {
                              "principle": 2,
                              "value": 3
                    },
                    {
                              "principle": 3,
                              "value": 1
                    },
                    {
                              "principle": 4,
                              "value": 0
                    },
                    {
                              "principle": 5,
                              "value": 1
                    }
          ]
},
    },
    {
        name: "Provide non-AI alternatives to the technology to do the same tasks.",
        type: "regulate",
        cost: 2,
        contribution: {
          "principles": [
                    {
                              "principle": 1,
                              "value": 0
                    },
                    {
                              "principle": 2,
                              "value": 3
                    },
                    {
                              "principle": 3,
                              "value": 0
                    },
                    {
                              "principle": 4,
                              "value": 0
                    },
                    {
                              "principle": 5,
                              "value": 0
                    }
          ]
},
    }
];
