interface Trainee {
    traineeId: number;
    name: string;
}

const trainees: Trainee[] = [
    { traineeId: 101, name: "Rahul" },
    { traineeId: 102, name: "Priya" },
    { traineeId: 103, name: "Arun" },
    { traineeId: 104, name: "Divya" }
];

// --- PART 1: DEBUGGING CHALLENGE ---

class RecentlyViewedCourses {
    private stack: string[] = [];
    push(course: string): void {
        this.stack.push(course);
    }
    // Bug 1 
    pop(): string | undefined {
        return this.stack.pop();
    }
}

class DoubtQueue {
    private queue: string[] = [];
    enqueue(question: string): void {
        this.queue.push(question);
    }
    // Bug 2
    dequeue(): string | undefined {
        return this.queue.shift();
    }
}

// Stack Module Output
console.log("--- Stack Module ---");
const viewedCourses = new RecentlyViewedCourses();
viewedCourses.push("HTML");
viewedCourses.push("CSS");
viewedCourses.push("JavaScript");
const currentCourse = viewedCourses.pop();
if (currentCourse) {
    console.log(`Current Course: ${currentCourse.toUpperCase()}`);
}

// Queue Module Output
console.log("\n--- Queue Module ---");
const doubts = new DoubtQueue();
doubts.enqueue("Angular Routing");
doubts.enqueue("RxJS");
const currentDoubt = doubts.dequeue();
if (currentDoubt) {
    console.log(`Current Doubt: ${currentDoubt}`); // Bug fix 
}

// Bug 3 
console.log("\n--- Trainee ID Math ---");
const traineeId = 102; 
console.log(traineeId + 10); 


// --- PART 2: FEATURE ENHANCEMENT ---

// Requirement 1: Binary Search
function searchTraineeById(traineesList: Trainee[], searchId: number): Trainee | null {
    let left = 0;
    let right = traineesList.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (traineesList[mid].traineeId === searchId) {
            return traineesList[mid];
        } else if (traineesList[mid].traineeId < searchId) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return null;
}

console.log("\n--- Binary Search Output ---");
console.log(searchTraineeById(trainees, 103));
console.log(searchTraineeById(trainees, 999));

// Requirement 2: Learning Path Tree
interface LearningPathNode {
    courseName: string;
    children: LearningPathNode[];
}

function createLearningPathTree(): LearningPathNode {
    return {
        courseName: "Programming",
        children: [
            {
                courseName: "Frontend",
                children: [
                    { courseName: "HTML", children: [] },
                    { courseName: "CSS", children: [] },
                    {
                        courseName: "JavaScript",
                        children: [
                            {
                                courseName: "TypeScript",
                                children: [
                                    { courseName: "Angular", children: [] }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                courseName: "Backend",
                children: [
                    { courseName: "Node.js", children: [] },
                    { courseName: "Express.js", children: [] }
                ]
            }
        ]
    };
}

// Requirement 3: Display Learning Path (Preorder Traversal)
function displayLearningPath(root: LearningPathNode): void {
    console.log(root.courseName);
    for (const child of root.children) {
        displayLearningPath(child);
    }
}

const rootPath = createLearningPathTree();
console.log("\n--- Tree Traversal ---");
displayLearningPath(rootPath);


// Requirement 4: Learning Path Report
function generateLearningPathReport(root: LearningPathNode): void {
    for (const section of root.children) {
        console.log(`${section.courseName} Courses`);
        for (const courseNode of section.children) {
            displayLearningPath(courseNode);
        }
    }
}

console.log("\n--- Learning Path Report ---");
generateLearningPathReport(rootPath);