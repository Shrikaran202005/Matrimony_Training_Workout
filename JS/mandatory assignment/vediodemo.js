let applications = [];
let idCounter = 1000;
function generateAppID() { 
    return "APP" + idCounter++;
} 
function submitApplication(name, email) { 
 try { 
    if (!/^[a-zA-Z\s]+$/.test(name)) { 
        throw new Error("Invalid name: only letters and spaces allowed.");
 } 
    if (!/^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) { 
        throw new Error("Invalid email format.");
 } 
    const application = { 
    id: generateAppID(), 
    name, 
    email, 
    status: "Pending", 
    };
    applications.push(application);
    console.log(`Application submitted for ${name}. ID:  ${application.id}`);
 } catch (err) { 
    console.log("Error:", err.message);
 } 
} 
function checkStatus(application) { 
    return new Promise((resolve) => { 
    setTimeout(() => { 
        const statuses = ["Reviewed", "Selected", "Rejected"];
        let result = statuses[Math.floor(Math.random() * statuses.length)];
        application.status = result;
        resolve(application);
    }, 1000);
    });
} 
async function showAllStatuses() { 
    console.log("\nChecking all applications...");
    for await (const [index, app] of applications.entries()) { 
        await checkStatus(app);
        console.log(`${index + 1}. ${app.name} (${app.id}) - ${app.status}`);
 } 
} 
const nameIterator = { 
    [Symbol.iterator]: function () { 
        let index = 0;
        return { 
            next: () => { 
                if (index < applications.length) { 
                        return { value: applications[index++].name, done: false };
                    } else { 
                        return { done: true };
                } 
            }, 
        };
    }, 
};
submitApplication("Alice Johnson", "alice@mail.com");
submitApplication("Bob123", "bob@mail.com");
submitApplication("Charlie", "charlie.gmail.com");
submitApplication("David Lee", "david@company.com");
setTimeout(async () => { 
    await showAllStatuses();
    console.log("\n镲镳 Applicants:");
    for (let name of nameIterator) { 
        console.log("- " + name);
    } 
}, 2000);