import { Piece } from '@boardzilla/core';
import { Tradeoffs } from '../index.ts';

export class ChallengeCard extends Piece<Tradeoffs> {
    // Challenges represent problems or scenarios that need to be addressed in schools
    // They have points for completion and requirements that must be met across principles
    problem: string;
    points: number;
    impacting_events: string[];
    problem_detail: string;
    is_complete: boolean;
    requirements: {
        blocks: number;
        principles: { principle?: string | number; value?: number; name: string }[];
    };
}

export const challengeCards: Partial<ChallengeCard>[] = [
    {
        problem: "Teacher quality",
        points: 3,
        impacting_events: [
        ],
        problem_detail: "System to identify learners needing support",
        is_complete: false,
        requirements: {
          "blocks": 1,
          "principles": [
                    {
                              "principle": 1,
                              "value": 1,
                              "name": "long-range"
                    },
                    {
                              "principle": 2,
                              "value": 1,
                              "name": "respect for persons"
                    },
                    {
                              "principle": 3,
                              "value": 0,
                              "name": "beneficience"
                    },
                    {
                              "principle": 4,
                              "value": 0,
                              "name": "justice"
                    },
                    {
                              "principle": 5,
                              "value": 1,
                              "name": "merit and integrity"
                    }
          ]
},
    },
    {
        problem: "Workload",
        points: 1,
        impacting_events: [],
        problem_detail: "Reducing teacher burden equitably",
        is_complete: false,
        requirements: {
          "blocks": 1,
          "principles": [
                    {
                              "principle": 1,
                              "value": 0,
                              "name": "long-range"
                    },
                    {
                              "principle": 2,
                              "value": 1,
                              "name": "respect for persons"
                    },
                    {
                              "principle": 3,
                              "value": 0,
                              "name": "beneficience"
                    },
                    {
                              "principle": 4,
                              "value": 2,
                              "name": "justice"
                    },
                    {
                              "principle": 5,
                              "value": 0,
                              "name": "merit and integrity"
                    }
          ]
},
    },
    {
        problem: "Formative feedback at scale",
        points: 3,
        impacting_events: [],
        problem_detail: "Providing meaningful feedback to all students",
        is_complete: false,
        requirements: {
          "blocks": 1,
          "principles": [
                    {
                              "principle": 1,
                              "value": 0,
                              "name": "long-range"
                    },
                    {
                              "principle": 2,
                              "value": 1,
                              "name": "respect for persons"
                    },
                    {
                              "principle": 3,
                              "value": 1,
                              "name": "beneficience"
                    },
                    {
                              "principle": 4,
                              "value": 0,
                              "name": "justice"
                    },
                    {
                              "principle": 5,
                              "value": 1,
                              "name": "merit and integrity"
                    }
          ]
},
    },
    {
        problem: "Differentiation",
        points: 2,
        impacting_events: [],
        problem_detail: "AI for enrichment and class streaming",
        is_complete: false,
        requirements: {
          "blocks": 1,
          "principles": [
                    {
                              "principle": 1,
                              "value": 0,
                              "name": "long-range"
                    },
                    {
                              "principle": 2,
                              "value": 0,
                              "name": "respect for persons"
                    },
                    {
                              "principle": 3,
                              "value": 0,
                              "name": "beneficience"
                    },
                    {
                              "principle": 4,
                              "value": 1,
                              "name": "justice"
                    },
                    {
                              "principle": 5,
                              "value": 2,
                              "name": "merit and integrity"
                    }
          ]
},
    },
    {
        problem: "Digital skills",
        points: 1,
        impacting_events: [],
        problem_detail: "Building digital literacy for all",
        is_complete: false,
        requirements: {
          "blocks": 1,
          "principles": [
                    {
                              "principle": 1,
                              "value": 0,
                              "name": "long-range"
                    },
                    {
                              "principle": 2,
                              "value": 1,
                              "name": "respect for persons"
                    },
                    {
                              "principle": 3,
                              "value": 0,
                              "name": "beneficience"
                    },
                    {
                              "principle": 4,
                              "value": 2,
                              "name": "justice"
                    },
                    {
                              "principle": 5,
                              "value": 0,
                              "name": "merit and integrity"
                    }
          ]
},
    },
    {
        problem: "Engagement",
        points: 1,
        impacting_events: [],
        problem_detail: "Tracking learning engagement authentically",
        is_complete: false,
        requirements: {
          "blocks": 1,
          "principles": [
                    {
                              "principle": 1,
                              "value": 0,
                              "name": "long-range"
                    },
                    {
                              "principle": 2,
                              "value": 1,
                              "name": "respect for persons"
                    },
                    {
                              "principle": 3,
                              "value": 0,
                              "name": "beneficience"
                    },
                    {
                              "principle": 4,
                              "value": 0,
                              "name": "justice"
                    },
                    {
                              "principle": 5,
                              "value": 2,
                              "name": "merit and integrity"
                    }
          ]
},
    }
];
